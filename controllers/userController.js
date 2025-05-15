const User = require('../models/userModel.js');

const registerUser = async(req,res) => {
  try {
    const{name,email,password} = req.body;

    const user = new User({name,email,password});
    await user.save();

    res.status(201).json({message: "User registered succesfully"});

  } catch (error) {
    res.status(500).json({message:"User is not registered"})
  }
}


module.exports = { registerUser };