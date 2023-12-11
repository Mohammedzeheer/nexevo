const userCollection= require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');


const userSignup = async (req, res) => {
    try {
      let {username, email,password, phonenumber} = req.body;
      if (username ==='' || email === '' || phonenumber === '' || password === '') {
        return res.status(400).json({ message: 'Empty field' });
      }
      const checkuser = await userCollection.find({ email: email });
      if (checkuser.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneNumberRegex = /^\+\d{1,3}-\d{3,14}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Enter a valid email' });
      }
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Enter a valid password' });
      }
      else {
        password = password ? await bcrypt.hash(password, 10) : null;
        const newUser = userCollection({ username,email, password, phonenumber });
        await newUser.save();
        res.status(201).json();
      }
    } catch (error) {
      return res.status(500).json({ error, message: "Internal server error" });
    }
  };
  
  
  const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(email == '' || password=='') {
          return res.status(400).json({message:'Empty Field'});
        }
        else if (email === undefined) {
            return res.status(400).json({message:'Email required'});
        } else if (password === undefined) {
            return res.status(400).json({ message:'Password required'});
        }       
        const user = await userCollection.findOne({ email: email });      
        if (!user) {
            return res.status(401).json({message:'Incorrect email'});
        }  
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.status(401).json({ message:'Incorrect password'});
        }      
        const token = jwt.sign({ id:user._id,username:user.username}, process.env.USER_TOKEN_SECRET, { expiresIn: '3d' });
        res.json({ login: true, token, user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


   const profile = async (req, res) => {
    try {
      const userId = req.UserId;
      const user = await userCollection.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ user});
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  


const resetPassword = async(req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await userCollection.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
  
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
  
  };

  module.exports={userSignup,userLogin,profile ,resetPassword}
