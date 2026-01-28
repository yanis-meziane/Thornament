import { crypt, compare } from "../services/hash.js";
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {registerRepository, loginRepository} from '../repositories/authRepositories.js'

process.loadEnvFile("./.env");

const register = async (req, res, next) => {
  try {
    let {mail, password} = req.body;
    let error = [];
    
    if (!mail || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    let explodedPassword = password.split("");

    if (explodedPassword.length < 8) {
      error.push("Nécessité d'avoir un MDP d'au moins 8 caractères");
    }

    // test syntaxe (double it with a front test to prevent long computing time)
    let isMaj = false;
    let isMin = false;
    let isNum = false;
    let isSpe = false;
    for (let i = 0; i < explodedPassword.length; i++) {
      explodedPassword[i].match(/[A-Z]/) ? isMaj = true : isMaj = isMaj;
      explodedPassword[i].match(/[a-z]/) ? isMin = true : isMin = isMin;
      explodedPassword[i].match(/[0-9]/) ? isNum = true : isNum = isNum;
      // tests for !@#$%^&*()_+-=;:|,.<>?]
      !explodedPassword[i].match(/[a-zA-Z0-9{}'"\\\/\[\]]/) ? isSpe = true : isSpe = isSpe;
    }
    
    if (!isMaj) {
      error.push("Password must contain at least a majuscule");
    }
    if (!isMin) {
      error.push("Password must contain at least a minuscule");
    }
    if (!isNum) {
      error.push("Password must contain at least a number");
    }
    if (!isSpe) {
      error.push("Password must contain at least a special character");
    }
    if (error.length > 0) {
      let err = new Error(error);
      throw err;
    }
    
    const cryptedPassword = await crypt(password);
    
    let newUser = await registerRepository(mail, cryptedPassword);

    return res.status(201).json(newUser);
  } catch (err) {
    // Handle duplicate mail
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    
    return res.status(500).json({ error: err?.message || err });
  }
};

const login = async (req, res, next) => {
  try {
    const { mail, password } = req.body;
    
    // if someone tries to connect with a less than 1 hour expired token :
    if (req.headers.authorization) {
      throw new Error("already authenticated");
    }

    // Find user
    const user = await loginRepository(mail)

    if (!user) {
      throw new Error ("Invalid credentials");
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
      throw new Error ("Invalid credentials");
    }

    const payload = {
      id: user.id,
      mail: user.mail
    };
    
    // Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token, id: user._id});
  } catch (err) {
    return res.status(500).send({
      error: err.message,
      message: 'Error during login'
    });
  }
};

const logout = async (req, res, next) => {
  try {
    res.json({ message: 'Logout successful' }); 
  } catch (err) {
    return res.status(500).send({
      error: err.message,
      message: 'Error during logout'
    });
  }
};

export default {
  register,
  login,
  logout
}