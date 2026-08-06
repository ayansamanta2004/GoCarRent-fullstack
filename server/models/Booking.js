import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types

const bookingSchema = new mongoose.Schema({
    car: { type: ObjectId, ref: "Car", required: true },
    user: { type: ObjectId, ref: "User", required: true },
    owner: { type: ObjectId, ref: "User", required: true },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    price: { type: Number, required: true },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending"
    },

    paymentMethod: {
        type: String,
        enum: ["card", "upi", "netbanking", "wallet"],
        default: "card"
    },

    transactionId: {
        type: String,
        default: ""
    },

    paidAt: {
        type: Date
    },

    refundAmount: {
        type: Number,
        default: 0
    },

    refundStatus: {
        type: String,
        enum: ["none", "initiated", "completed"],
        default: "none"
    },

    refundDate: {
        type: Date
    }
}, { timestamps: true })

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking