import express from "express";
import sendEmail from "../utils/sendEmail.js";
const router = express.Router();

router.get("/email", async (req, res) => {

    const success = await sendEmail({
        to: "ayansamanta802@gmail.com",
        subject: "GoCarRent Email Test",
        html: `
            <h2>Hello 👋</h2>
            <p>This is a test email from GoCarRent.</p>
        `,
    });

    if (success) {
        res.json({ success: true, message: "Email Sent" });
    } else {
        res.json({ success: false, message: "Failed" });
    }
});

export default router;