const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../knex-config');
const nodemailer = require('nodemailer');
require("dotenv").config();

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    },
});

// Function to send OTP
const sendOtp = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };
    
    return transporter.sendMail(mailOptions);
};

// Register a new student
exports.register = async (req, res) => {
    try {
        const { name, email, password, subject, national_id } = req.body;

        // Check if the user already exists
        const existingStudent = await knex('student').where({ email }).first();
        if (existingStudent) {
            return res.status(400).json({ message: 'Email already registered.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new student
        const newStudent = await knex('student').insert({
            name,
            email,
            password: hashedPassword,
            subject,
            national_id
        }).returning('*'); // Return the inserted student

        // Generate and send OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
        await knex('student').where({ id: newStudent[0].id }).update({ otp }); // Save OTP in the database
        await sendOtp(newStudent[0].email, otp); // Send OTP to student's email

        res.status(201).json({ message: 'Registration successful. OTP sent to your email.', studentId: newStudent[0].id });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

// Login a student (using OTP)
exports.login = async (req, res) => {
    try {
        const { email } = req.body;

        // Find the student in the database
        const student = await knex('student').where({ email }).first();
        if (!student) {
            return res.status(401).json({ message: 'Invalid login information.' });
        }

        // Generate and send OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
        await knex('student').where({ id: student.id }).update({ otp }); // Save OTP in the database
        await sendOtp(student.email, otp); // Send OTP to student's email

        res.json({ message: "OTP sent to your email." });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Verify OTP
        const student = await knex('student').where({ email, otp }).first();
        if (!student) {
            return res.status(401).json({ message: 'Invalid OTP.' });
        }

        // Create a token
        const token = jwt.sign({ userId: student.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Clear OTP after successful verification
        await knex('student').where({ id: student.id }).update({ otp: null });

        // Send the token and student details
        res.status(200).json({
            token,
            student: {
                id: student.id,
                name: student.name,
                email: student.email,
                subject: student.subject,
            }
        });
    } catch (error) {
        console.error("Verification failed:", error);
        res.status(500).json({ message: error.message });
    }
};

// Setup password for the student
exports.setupPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await knex("student").where({ email }).update({ password: hashedPassword });

        if (result === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Password set successfully" });
    } catch (error) {
        console.error("Password setup failed:", error);
        res.status(500).json({ message: "Password setup failed", error: error.message });
    }
};
