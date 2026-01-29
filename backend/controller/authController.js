import { crypt, compare } from "../services/hash.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

process.loadEnvFile(".env");

const register = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const error = [];

    if (!mail || !password) {
      return res.status(400).json({ message: "Mail et Mot de passe nécessaire" });
    }

    const explodedPassword = password.split("");

    if (explodedPassword.length < 8) {
      error.push("Nécessité d'avoir un MDP d'au moins 8 caractères");
    }

    let isMaj = false;
    let isMin = false;
    let isNum = false;
    let isSpe = false;

    for (let i = 0; i < explodedPassword.length; i++) {
      explodedPassword[i].match(/[A-Z]/) ? (isMaj = true) : isMaj;
      explodedPassword[i].match(/[a-z]/) ? (isMin = true) : isMin;
      explodedPassword[i].match(/[0-9]/) ? (isNum = true) : isNum;
      !explodedPassword[i].match(/[a-zA-Z0-9{}'"\\\/\[\]]/) ? (isSpe = true) : isSpe;
    }

    if (!isMaj) error.push("Password must contain at least a majuscule");
    if (!isMin) error.push("Password must contain at least a minuscule");
    if (!isNum) error.push("Password must contain at least a number");
    if (!isSpe) error.push("Password must contain at least a special character");

    if (error.length > 0) {
      return res.status(400).json({ message: error });
    }

    const hashedPassword = await crypt(password);

    // Table users: mail, password
    const newUser = await User.create({ email: mail, hashedPassword });

    // on renvoie un user "safe" (sans password)
    return res.status(201).json({ id: newUser.id, mail: newUser.mail });
  } catch (err) {
    // PostgreSQL unique violation (mail unique)
    if (err.code === "23505") {
      return res.status(409).json({ message: "Email already in use" });
    }
    return res.status(500).json({ error: err?.message || err });
  }
};

const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    if (!mail || !password) {
      return res.status(400).json({ message: "Mail et mot de passe requis" });
    }

    const user = await User.findOne({ email: mail });

    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    const payload = { id: user.id, mail: user.mail };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

    return res.json({
      message: "Login successful",
      token,
      id: user.id,
      mail: user.mail
    });
  } catch (err) {
    return res.status(500).json({
      error: err?.message || err,
      message: "Error during login",
    });
  }
};

const logout = async (req, res) => {
  try {
    return res.json({ message: "Logout successful" });
  } catch (err) {
    return res.status(500).json({
      error: err?.message || err,
      message: "Error during logout",
    });
  }
};

export default { register, login, logout };
