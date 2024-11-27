// Assuming you have similar routes for teachers
const express = require('express');
const authController = require('../controllers/authControllerStudent');
const router = express.Router();

// Student Registration route
router.post('/registerS', authController.register);
// Student Login route (send OTP)
router.post('/loginS', authController.login);
// OTP verification route
router.post('/verify-otpS', authController.verifyOtp);
// Password setup route
router.post('/setup-passwordS', authController.setupPassword);

module.exports = router;
