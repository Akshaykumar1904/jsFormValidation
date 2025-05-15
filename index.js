const express = require("express");
const connectDB = require('./config/DB.js');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.get('/', (req, res) => {
  res.send('✅ Server and DB connected successfully!');
});
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});