import express from "express";
import {
    createBooking,
    getAllBookings,
    getSingleBooking,
    deleteBooking
} from "../controller/booking.js";

const router = express.Router();

router.post("/bookings", createBooking);
router.get("/bookings", getAllBookings);
router.get("/bookings/:id", getSingleBooking);
router.delete("/bookings/:id", deleteBooking);

export default router;
