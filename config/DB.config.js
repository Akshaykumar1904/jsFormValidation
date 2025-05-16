const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const {DB_NAME} = require('../constants.js');
dotenv.config({path:path.resolve(__dirname,'../.env')})

const connectDB = async ()=>{
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

    console.log('connection successfull!!!')
    
  } catch (error) {
    console.error("connection not connected");    
  }
}
module.exports= connectDB;

