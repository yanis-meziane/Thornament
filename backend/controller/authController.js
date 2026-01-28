import { crypt, compare } from "../services/hash.js";
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

process.loadEnvFile("./.env");

const register = async (req, res, next) => {
  try {
    let { userName, email, password, role } = req.body;
    let error = [];

    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user = decoded;
      role = "user";
    } else {
      role = "user";
    }
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Mail et Mot de passe nécessaire' });
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
    
    // Single insert, no session needed
    const newUser = await User.create({ userName, email, cryptedPassword, role });
    return res.status(201).json(newUser);
  } catch (err) {
    // Handle duplicate email
    if (err.code === '23505') { // PostgreSQL unique violation
      return res.status(409).json({ message: 'Email already in use' });
    }
    
    return res.status(500).json({ error: err?.message || err });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isValidPassword = await compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = {
      id: user.id,
      username: user.user_name,
      role: user.role
    };
    
    // Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ 
      message: 'Login successful', 
      token, 
      id: user.id, 
      role: user.role 
    });
  } catch (err) {
    return res.status(500).send({
      error: err.message,
      message: 'Error during login'
    });
  }
};

const logout = async (req, res, next) => {
  try {
    // Token invalidation could be handled here if needed
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