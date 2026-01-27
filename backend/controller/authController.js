import crypt from "../services/hash.js";
import jwt from 'jsonwebtoken';

process.loadEnvFile("./.env");

const register = async (req, res, next) => {
  try {
    let { userName, email, password, role } = req.body;
    let error = [];

    const authHeader = req.headers.authorization;
    if (authHeader) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user = decoded;
      role = "user";
    } else {
      role = "user";
    }
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    let explodedPassword = password.split("");

    if (explodedPassword.length<12){
      error.push( "Password length must be more than 12");
    }

    // test syntaxe (double it with a front test to prevent long computing time)
    let isMaj = false;
    let isMin = false;
    let isNum = false;
    let isSpe = false;
    for (let i=0; i<explodedPassword.length; i++){
      explodedPassword[i].match(/[A-Z]/) ? isMaj=true : isMaj=isMaj;
      explodedPassword[i].match(/[a-z]/) ? isMin=true : isMin=isMin;
      explodedPassword[i].match(/[0-9]/) ? isNum=true : isNum=isNum;
      // tests for !@#$%^&*()_+-=;:|,.<>?]
      !explodedPassword[i].match(/[a-zA-Z0-9{}'"\\\/\[\]]/) ? isSpe=true : isSpe=isSpe;
    }
    
    if (!isMaj){
      error.push("Password must contain at least a majuscule");
    }
    if (!isMin){
      error.push("Password must contain at least a minuscule");
    }
    if (!isNum){
      error.push("Password must contain at least a number");
    }
    if (!isSpe){
      error.push("Password must contain at least a special character");
    }
    if (error.length>0){
      let err = new Error(error);
      throw err;
    }
    
    const cryptedPassword = crypt(password);
    
    // Single insert, no session needed
    const newUser = await User.create({ userName, email, cryptedPassword, role });
    return res.status(201).json(newUser);
  } catch (err) {
    // Handle duplicate email
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    
    return res.status(500).json({ error: err?.message || err });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // if someone tries to connect with a less than 1 hour expired token :
    if (req.headers.authorization) {
      // let connection = await LastConnections
      //   .findOne({token: crypt(req.headers.authorization)})
      //   .sort({ created_at: -1 });

      //   // 1 heure s'est écoulé || token expired et moins qu'une heure
      // if (
      //   (Date.now() - connection.created_at.getTime()) > 3600000 || 
      //   ( connection.expired && Date.now() - connection.created_at.getTime() < 3600000 ) 
      // ) {
      //   throw new Error('Invalid token');
      // }
    }

    // Find user
    // const cryptedPassword = crypt(password);
    // const user = await User.findOne({email: email, password: cryptedPassword});
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      id: user._id,
      username: user.userName,
      role: user.role
    };
    
    // Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token, id: user._id, role: user.role });
  } catch (err) {
    if (err.message === 'Invalid credentials') return res.status(401).json({
      error: err,
      message: 'Invalid credentials'
    });

    return res.status(500).send({
      error: err.message,
      message: 'Error during login'
    });
  }
};

const logout = async (req, res, next) => {
  try {
    let cryptedToken = crypt(req.body.token);
    // const connection = await LastConnections
    // .findOneAndUpdate(
    //   {token: cryptedToken},
    //   {expired: true},
    //   {sort: {created_at : -1}}
    // );
        
    res.json({ message: 'Logout successful' }); 
  } catch (err) {
    if (err.message === 'Invalid credentials') return res.status(401).json({
      error: err,
      message: 'Invalid credentials'
    });

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