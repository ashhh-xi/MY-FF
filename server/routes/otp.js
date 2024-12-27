/**
 * Express OTP API with Twilio and Zod Validation
 */

const express = require('express');
const twilio = require('twilio');
const { z } = require('zod');
const router = express.Router();

require('dotenv').config(); // Load environment variables

// In-memory OTP storage (use a proper database in production)
const otpStore = new Map();

// Twilio credentials
const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// OTP generation function
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// Zod schema for request validation
const sendOtpSchema = z.object({
    to: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format. Must be in E.164 format.'),
});

const verifyOtpSchema = z.object({
    to: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format. Must be in E.164 format.'),
    otp: z.string().length(6, 'OTP must be exactly 6 digits.'),
});

// POST endpoint to send OTP
router.post('/send-otp', async (req, res) => {
    try {
        // Validate request body
        const { to } = sendOtpSchema.parse(req.body);

        const otp = generateOtp(); // Generate OTP

        // Store OTP temporarily (with expiration)
        otpStore.set(to, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // 5 minutes expiration

        // Send OTP via Twilio
        const message = await client.messages.create({
            body: `Your OTP is: ${otp}\nwith ❤️ FeedForward`,
            from: '+12184844776', // Replace with your Twilio number
            to,
        });

        console.log(`OTP sent: ${otp} (SID: ${message.sid})`);

        res.status(200).json({ message: 'OTP sent successfully.', sid: message.sid });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation error:', error.issues);
            return res.status(400).json({ message: 'Validation failed.', errors: error.issues });
        }

        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Failed to send OTP.', error: error.message });
    }
});

// POST endpoint to verify OTP
router.post('/verify-otp', async (req, res) => {
    try {
        // Validate request body
        const { to, otp } = verifyOtpSchema.parse(req.body);

        const storedOtpData = otpStore.get(to);

        if (!storedOtpData) {
            return res.status(400).json({ message: 'OTP not found or expired.' });
        }

        if (storedOtpData.expiresAt < Date.now()) {
            otpStore.delete(to); // Remove expired OTP
            return res.status(400).json({ message: 'OTP has expired.' });
        }

        if (storedOtpData.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        otpStore.delete(to); // Delete OTP after successful verification

        // Send success message to the user's phone number
        await client.messages.create({
            body: 'Your OTP has been verified successfully. Thank you for using FeedForward!',
            from: '+12184844776', // Replace with your Twilio number
            to,
        });

        res.status(200).json({ message: 'OTP verified successfully. A confirmation message has been sent to your phone.' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation error:', error.issues);
            return res.status(400).json({ message: 'Validation failed.', errors: error.issues });
        }

        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Failed to verify OTP.', error: error.message });
    }
});

module.exports = { otpRouter: router };