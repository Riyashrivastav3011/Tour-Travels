import express from "express";
import { verifyUser } from '../middlewares/verifyToken.js';

import {
    createBooking,
    getAllBookings,
    getSingleBooking,
    deleteBooking,
    getMyBooking
} from "../controller/booking.js";

const router = express.Router();

router.post("/bookings", createBooking);
router.get("/bookings", getAllBookings);
router.get("/bookings/:id", getSingleBooking);
router.delete("/bookings/:id", deleteBooking);
router.get("/getbookings" , verifyUser ,getMyBooking);

export default router;
