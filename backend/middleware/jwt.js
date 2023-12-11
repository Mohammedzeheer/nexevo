const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtPartner = (req, res, next) => {
  const jwttoken = req.headers.authorization;
  console.log(`token------------`,jwttoken);
  let token = jwttoken.replace(/"/g, ''); 
  if (token) {
    try {
      const User = jwt.verify(token, process.env.USER_TOKEN_SECRET);
      console.log(`user---------`,User)
      req.UserId=User.id
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Token missing' });
  }
};

module.exports=jwtPartner;
