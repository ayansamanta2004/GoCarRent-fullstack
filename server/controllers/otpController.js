import Otp from "../models/Otp.js";
import User from "../models/User.js";
import generateOTP from "../utils/generateOTP.js";
import sendEmail from "../utils/sendEmail.js";

export const sendOTP = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {
            return res.json({
                success: false,
                message: "Email is required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                success: false,
                message: "Email already registered"
            });
        }

        // Delete old OTP if it exists
        await Otp.deleteMany({ email });

        // Generate new OTP
        const otp = generateOTP();

        // Expire after 5 minutes
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

        // Save OTP
        await Otp.create({
            email,
            otp,
            expiresAt
        });

        // Send Email
        await sendEmail(
            email,
            "GoCarRent Email Verification",
            `
                <div style="font-family:Arial">

                    <h2>Email Verification</h2>

                    <p>Your verification code is:</p>

                    <h1 style="letter-spacing:6px;">
                        ${otp}
                    </h1>

                    <p>
                        This OTP will expire in
                        <strong>5 minutes</strong>.
                    </p>

                    <br>

                    <p>
                        If you didn't request this,
                        please ignore this email.
                    </p>

                </div>
            `
        );

        return res.json({
            success: true,
            message: "OTP sent successfully"
        });

    }
    catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });

    }

};


export const verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        // Find OTP
        const otpData = await Otp.findOne({ email });

        if (!otpData) {
            return res.json({
                success: false,
                message: "OTP not found. Please request a new OTP."
            });
        }

        // Check expiration
        if (otpData.expiresAt < new Date()) {

            await Otp.deleteOne({ _id: otpData._id });

            return res.json({
                success: false,
                message: "OTP has expired"
            });
        }

        // Check OTP
        if (otpData.otp !== otp) {
            return res.json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // Delete OTP after successful verification
        await Otp.deleteOne({ _id: otpData._id });

        return res.json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: error.message
        });

    }

};