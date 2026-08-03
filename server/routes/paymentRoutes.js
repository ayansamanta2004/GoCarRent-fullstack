import express from "express";
import { protect } from "../middleware/auth.js";
import { createPaymentOrder, processPayment } from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", protect, createPaymentOrder);
paymentRouter.post("/pay", protect, processPayment);

export default paymentRouter;