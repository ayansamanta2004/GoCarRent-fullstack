import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import sendEmail from "../utils/sendEmail.js";
import User from "../models/User.js";



// Function to check Availability of car for a given Date
const checkAvailability = async (car, pickupDate, returnDate) => {
    const booking = await Booking.find({
        car,
        pickupDate: { $lte: returnDate },
        returnDate: { $gte: pickupDate },
    })
    return booking.length === 0;
}

// API to check Availability of Cars for the given Date and location
export const checkAvailabilityOfCar = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body

        // fetch all available cars for the given location
        const cars = await Car.find({ location, isAvaliable: true })

        //check car availability for the given date range using promise
        const availableCarsPromises = cars.map(async (car) => {
            const isAvaliable = await checkAvailability(car._id, pickupDate, returnDate)
            return { ...car._doc, isAvaliable: isAvaliable }
        })

        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter(car => car.isAvaliable === true)

        res.json({ success: true, availableCars })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// API to Create Booking
export const createBooking = async (req, res) => {
    try {
        const { _id } = req.user;
        const {
            car,
            pickupDate,
            returnDate,
            paymentMethod,
            transactionId,
            paymentStatus
        } = req.body;

        console.log("Received transactionId:", transactionId);

        const isAvailable = await checkAvailability(car, pickupDate, returnDate)
        if (!isAvailable) {
            return res.json({ success: false, message: "Car is not available" })
        }

        const carData = await Car.findById(car).populate("owner");

        // Calculate price based on pickupDate and returnDate
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
        const price = carData.pricePerDay * noOfDays;

        const customer = await User.findById(_id).select("name email");

        await Booking.create({
            car,
            owner: carData.owner._id,
            user: _id,
            pickupDate,
            returnDate,
            price,

            paymentMethod,
            transactionId,
            paymentStatus,

            paidAt: new Date()
        });

        await sendEmail(
            carData.owner.email,
            "🚗 New Booking Received - GoCarRent",
            `
    <div style="font-family: Arial, sans-serif; line-height:1.6">

        <h2>Hello ${carData.owner.name},</h2>

        <p>
            Great news! 🎉 Your car has just been booked on
            <strong>GoCarRent</strong>.
        </p>

        <h3>Customer Details</h3>

        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
            <tr>
                <td><strong>Name</strong></td>
                <td>${customer.name}</td>
            </tr>
            <tr>
                <td><strong>Email</strong></td>
                <td>${customer.email}</td>
            </tr>
        </table>

        <br>

        <h3>Booking Details</h3>

        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
            <tr>
                <td><strong>Car</strong></td>
                <td>${carData.brand} ${carData.model}</td>
            </tr>

            <tr>
                <td><strong>Pickup Date</strong></td>
                <td>${pickupDate}</td>
            </tr>

            <tr>
                <td><strong>Return Date</strong></td>
                <td>${returnDate}</td>
            </tr>

            <tr>
                <td><strong>Total Price</strong></td>
                <td>₹${price}</td>
            </tr>

            <tr>
                <td><strong>Status</strong></td>
                <td>Pending Confirmation</td>
            </tr>
        </table>

        <br>

        <p>
            Please log in to your GoCarRent Owner Dashboard to
            confirm or cancel this booking.
        </p>

        <hr>

        <p>
            Thank you,<br>
            <strong>GoCarRent Team</strong>
        </p>

    </div>
    `
        );

        res.json({ success: true, message: "Booking Created" })


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


// API to List User Bookings
export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;
        const bookings = await Booking.find({ user: _id }).populate("car").sort({ createdAt: -1 })
        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// API to get Owner Bookings
export const getOwnerBookings = async (req, res) => {
    try {
        if (req.user.role !== 'owner') {
            return res.json({ success: false, message: "Unauthorized" })
        }
        const bookings = await Booking.find({ owner: req.user._id }).populate('car user').select("-user.password").sort({ createdAt: -1 })
        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


// API to change booking status
export const changeBookingStatus = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bookingId, status } = req.body
        if (!["pending", "confirmed", "cancelled"].includes(status)) {
            return res.json({
                success: false,
                message: "Invalid booking status"
            });
        }

        const booking = await Booking.findById(bookingId)
            .populate("user")
            .populate("car");

        if (!booking) {
            return res.json({
                success: false,
                message: "Booking not found"
            });
        }

        if (booking.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" })
        }

        booking.status = status;

        // If booking is cancelled, initiate refund
        if (status === "cancelled") {

            booking.paymentStatus = "refunded";

            booking.refundAmount = booking.price;

            booking.refundStatus = "initiated";

            booking.refundDate = new Date();

        }

        await booking.save();

        // Simulate bank processing refund
        if (status === "cancelled") {

            setTimeout(async () => {

                try {

                    const refundBooking = await Booking.findById(booking._id);

                    if (!refundBooking) return;

                    refundBooking.refundStatus = "completed";

                    await refundBooking.save();

                    console.log(
                        `Refund completed for Booking ${refundBooking._id}`
                    );

                } catch (err) {

                    console.log(err.message);

                }

            }, 50000); // 10 seconds

        }

        let subject = "";

        if (status === "confirmed") {
            subject = "🎉 Your GoCarRent Booking has been Confirmed!";
        } else if (status === "cancelled") {
            subject = "❌ Your GoCarRent Booking has been Cancelled";
        }

        const html = `
<div style="font-family: Arial, sans-serif; line-height:1.6">

    <h2>Hello ${booking.user.name},</h2>

    <p>Your booking status has been updated.</p>

    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
        <tr>
            <td><strong>Car</strong></td>
            <td>${booking.car.brand} ${booking.car.model}</td>
        </tr>

        <tr>
            <td><strong>Pickup Date</strong></td>
            <td>${booking.pickupDate.toISOString().split("T")[0]}</td>
        </tr>

        <tr>
            <td><strong>Return Date</strong></td>
            <td>${booking.returnDate.toISOString().split("T")[0]}</td>
        </tr>

        <tr>
            <td><strong>Location</strong></td>
            <td>${booking.car.location}</td>
        </tr>

        <tr>
            <td><strong>Total Price</strong></td>
            <td>₹${booking.price}</td>
        </tr>

        <tr>
            <td><strong>Status</strong></td>
            <td style="color:${status === "confirmed" ? "green" : "red"};">
                <b>${status.toUpperCase()}</b>
            </td>
        </tr>
    </table>

    <br>

    ${status === "confirmed"
                ? `
        <p>
            Your booking has been
            <b>confirmed</b>.
            We look forward to serving you!
        </p>
      `
                : `
        <p>
            Unfortunately, your booking has been
            <b>cancelled</b>.
        </p>

        <h3>Refund Details</h3>

        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">

            <tr>
                <td><strong>Refund Amount</strong></td>
                <td>₹${booking.refundAmount}</td>
            </tr>

            <tr>
                <td><strong>Refund Status</strong></td>
                <td>${booking.refundStatus.toUpperCase()}</td>
            </tr>

            <tr>
                <td><strong>Expected Refund Time</strong></td>
                <td>3–5 Business Days</td>
            </tr>

            <tr>
                <td><strong>Transaction ID</strong></td>
                <td>${booking.transactionId}</td>
            </tr>

        </table>

        <br>

        <p>
            Your refund has been initiated and will be credited to your original payment method.
        </p>
      `
            }

    <hr>

    <p>Thank you for choosing <strong>GoCarRent</strong>.</p>

</div>
`;

        // console.log("Booking Transaction ID:", booking.transactionId);
        // console.log(booking);

        await sendEmail(
            booking.user.email,
            subject,
            html
        );

        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}