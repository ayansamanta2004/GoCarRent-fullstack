import client from "../configs/openrouter.js";

export const chatWithBot = async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        if (!message) {
            return res.json({
                success: false,
                message: "Message is required",
            });
        }

        const messages = [
            {
                role: "system",
                content: `
You are the official AI assistant of GoCarRent.

About GoCarRent:

Users:
- Register/Login
- Search available cars
- Book cars
- View bookings

Owners:
- Become Owner
- Add new cars
- Manage listed cars
- Confirm or cancel bookings

Notifications:
- Owners receive an email when a booking is created.
- Customers receive an email after confirmation or cancellation.

Rules:
1. Answer only GoCarRent questions.
2. Never make up features.
3. Keep answers short and friendly.
4. If someone asks something unrelated, reply:
"I can only help with GoCarRent related questions."
                `,
            },

            ...history,

            {
                role: "user",
                content: message,
            },
        ];

        const completion = await client.chat.completions.create({
            model: "google/gemma-4-26B-A4B-it:novita",
            messages,
        });

        res.json({
            success: true,
            reply: completion.choices[0].message.content,
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};