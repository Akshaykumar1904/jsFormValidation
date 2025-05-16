const express = require('express');
const router = express.Router();

const { registerUser } = require('../controllers/userController.js');

router.post('/registerUser',registerUser);
// router.get('/verify-email',verifyEmail);
module.exports = router;