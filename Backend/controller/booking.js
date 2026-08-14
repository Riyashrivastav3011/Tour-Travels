import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const saved = await newBooking.save();

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: saved
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("packageId");
        res.status(200).json(bookings);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};


export const getSingleBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate("packageId");
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const deleteBooking = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getMyBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({email:req.user.email}).populate("packageId").sort({ date: -1 });

    if (bookings.length === 0) {
      return res.status(404).json({
        msg: "No bookings yet"
      });
    }

    res.status(200).json({
      bookings: bookings
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Something went wrong"
    });
  }
};