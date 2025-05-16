const cors = require('cors');
const express = require("express");
const connectDB = require('./config/DB.config.js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
connectDB();


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = require('./routes/userRoutes');
app.use('/api/auth',userRoutes);


app.get('/', (req, res) => {
  res.send('✅ Server and DB connected successfully!');
});


app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});