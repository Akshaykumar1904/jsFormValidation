const User = require('../models/userModel.js'); // ✅ correct import
const { sendVerificationEmail } = require('../utils/mailer.js');
const crypto = require('crypto');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });
    await user.save();

    const verificationToken = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = verificationToken;
    user.emailVerified = false;
    await user.save({ validateBeforeSave: false });

    await sendVerificationEmail(user, verificationToken);
    res.status(201).json({ message: "User registered successfully" });



  } catch (error) {
    console.error("Error saving user:", error.message);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};


// const verifyEmail = async(req,res) => {
//   try {
//     const {token} = req.query;
//     if(!token){
//       return res.status(400).json({ message: "Invalid or missing token" });
//     }
//     const user = await User.findOne({emailVerificationToken:token});

//     if(!user){
//       return res.status(404).json({message:"Invalid or Expired token"});
//     }

//     user.emailVerified = true;
//     user.emailVerificationToken = undefined;
//     await user.save({validBeforeSave:false});
//     res.status(200).json({message:"Email verified successfully"});
//   } catch (error) {
//     console.error("Error email verifying",error);
//     return res.status(500).json({message:"email is not verified ,try again later"})
    
//   }
// }


module.exports = { registerUser };
