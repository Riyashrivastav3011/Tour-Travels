import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    travelers: { type: Number, required: true },
    date: { type: String, required: true },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Packages", required: true }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
