import crypto from "crypto";

// Create Payment Order
export const createPaymentOrder = async (req, res) => {
    try {

        const { amount } = req.body;

        const order = {
            orderId: crypto.randomUUID(),
            amount,
            currency: "INR",
            status: "created"
        };

        res.json({
            success: true,
            order
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });

    }
};


// Mock Payment
export const processPayment = async (req, res) => {
    try {

        const { orderId, paymentMethod } = req.body;

        // Generate fake transaction ID
        const transactionId =
            "TXN-" +
            Date.now() +
            "-" +
            Math.random().toString(36).substring(2, 8).toUpperCase();

        res.json({
            success: true,
            message: "Payment Successful",
            payment: {
                orderId,
                transactionId,
                paymentMethod,
                paymentStatus: "paid",
                paidAt: new Date()
            }
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });

    }
};