const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // isConfirmed:{
  //   type:Boolean,
  //   default:false
  // },
  // confirmationToken:{
  //   type:String
  // },
  emailVerificationToken:{
    type:String
  },
  emailVerified:{
    type:Boolean,
    default:false
  }
}, { timestamps: true });

//adding a password hashing 

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});


userSchema.methods.isPasswordCorrect = async function(myPassword){
  return bcrypt.compare(myPassword,this.password);
}





const User = mongoose.model('User', userSchema);
module.exports = User;