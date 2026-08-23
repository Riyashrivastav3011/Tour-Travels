import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import enquiresRoutes from './routes/enquiresRoutes.js'
import packageRoutes from './routes/package.js'
import bookingRoutes from './routes/booking.js'
import placeRoutes from './routes/destinations.js'
import Packagemodel from './models/package.js'
import cookieParser from 'cookie-parser'
import razorpayRoute from './routes/razorpayRoutes.js'
import { fileURLToPath } from "url";
import path from 'path'

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://tour-travels-frontend-bqeo.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(cookieParser());
app.use(express.json());

 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use('/api', authRoutes);
app.use('/admin', adminRoutes);
app.use('/admin' , enquiresRoutes);
app.use('/admin' , packageRoutes);
app.use('/destinations' , placeRoutes);
app.use("/admin", bookingRoutes);
app.use("/pay", razorpayRoute);

const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => {
console.log('Mongo connected');
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
})
.catch(err => console.error(err));

