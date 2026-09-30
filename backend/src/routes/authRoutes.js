const express = require('express');
const router = express.Router();
const { signup, login, verifyOTP, getMe } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.get('/me', getMe);

module.exports = router;