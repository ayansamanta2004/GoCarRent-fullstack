import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Payment = () => {

    const { axios } = useAppContext();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const location = useLocation();

    // Prevent opening /payment directly
    if (!location.state) {
        return (
            <div className="px-6 py-16 text-center">
                <h1 className="text-2xl font-bold">
                    No booking information found.
                </h1>

                <p className="text-gray-600 mt-2">
                    Please select a car and start the booking process again.
                </p>
            </div>
        );
    }

    const { car, pickupDate, returnDate } = location.state;

    const [paymentMethod, setPaymentMethod] = useState("card");

    const totalDays = useMemo(() => {
        const start = new Date(pickupDate);
        const end = new Date(returnDate);

        return Math.ceil(
            (end - start) / (1000 * 60 * 60 * 24)
        );
    }, [pickupDate, returnDate]);

    const totalAmount = totalDays * car.pricePerDay;

    // ================= PAYMENT =================

    const handlePayment = async () => {
        try {

            setLoading(true);

            // STEP 1 : Create Order
            const orderResponse = await axios.post(
                "/api/payment/create-order",
                {
                    amount: totalAmount
                }
            );

            if (!orderResponse.data.success) {
                toast.error(orderResponse.data.message);
                return;
            }

            const order = orderResponse.data.order;

            // STEP 2 : Process Payment
            const paymentResponse = await axios.post(
                "/api/payment/pay",
                {
                    orderId: order.orderId,
                    paymentMethod
                }
            );

            if (!paymentResponse.data.success) {
                toast.error(paymentResponse.data.message);
                return;
            }

            const payment = paymentResponse.data.payment;

            // STEP 3 : Create Booking
            const bookingResponse = await axios.post(
                "/api/bookings/create",
                {
                    car: car._id,
                    pickupDate,
                    returnDate,
                    paymentMethod,
                    transactionId: payment.transactionId,
                    paymentStatus: payment.paymentStatus
                }
            );

            if (bookingResponse.data.success) {

                toast.success("🎉 Payment Successful!");

                navigate("/my-bookings");

            } else {

                toast.error(bookingResponse.data.message);

            }

        } catch (error) {

            toast.error(error.response?.data?.message || error.message);

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12">

            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-xl p-8">

                <h1 className="text-3xl font-bold mb-8 text-center">
                    Secure Payment
                </h1>

                {/* Booking Summary */}

                <div className="space-y-3">

                    <h2 className="text-xl font-semibold">
                        Booking Summary
                    </h2>

                    <hr />

                    <p>
                        <strong>Car:</strong> {car.brand} {car.model}
                    </p>

                    <p>
                        <strong>Pickup:</strong> {pickupDate}
                    </p>

                    <p>
                        <strong>Return:</strong> {returnDate}
                    </p>

                    <p>
                        <strong>Total Days:</strong> {totalDays}
                    </p>

                    <p>
                        <strong>Price / Day:</strong> ₹{car.pricePerDay}
                    </p>

                    <hr />

                    <h2 className="text-2xl font-bold text-primary">
                        Total : ₹{totalAmount}
                    </h2>

                </div>

                {/* Payment Method */}

                <div className="mt-8">

                    <h2 className="font-semibold mb-4">
                        Choose Payment Method
                    </h2>

                    <div className="space-y-3">

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="radio"
                                value="card"
                                checked={paymentMethod === "card"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />
                            Credit / Debit Card
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="radio"
                                value="upi"
                                checked={paymentMethod === "upi"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />
                            UPI
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="radio"
                                value="wallet"
                                checked={paymentMethod === "wallet"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />
                            Wallet
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="radio"
                                value="netbanking"
                                checked={paymentMethod === "netbanking"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />
                            Net Banking
                        </label>

                    </div>

                </div>

                {/* Pay Button */}

                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="mt-8 w-full bg-primary hover:bg-primary-dull text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-60"
                >
                    {loading
                        ? "Processing Payment..."
                        : `Pay ₹${totalAmount}`}
                </button>

            </div>

        </div>

    );
};

export default Payment;