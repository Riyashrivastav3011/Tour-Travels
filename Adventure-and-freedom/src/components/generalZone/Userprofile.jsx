import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import swal from 'sweetalert2';

import {
  User,
  Mail,
  Briefcase,
  Globe,
  UserCircle2,
  MapPin,
  ChevronDown,
  Calendar,
  CreditCard,
  Bell,
  LogOut,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Userprofile() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState("bookings");

  // Empty values shown when user is not logged in
  const defaultUser = {
    username: "",
    email: "",
    fullName: "",
    title: "",
    language: "",
    address: "",
    mobile: "",
  };

  const [user, setUser] = useState(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/profile`,
          {
            withCredentials: true,
          }
        );


        setUser({
          username: res.data.username || "",
          email: res.data.email || "",
          fullName: res.data.username || "",
          title: "",
          language: res.data.language || "English",
          address: res.data.address || "",
          mobile: res.data.mobile || "",
        });

        setIsLoggedIn(true);
      } catch (error) {
        console.log(
          "PROFILE ERROR:",
          error.response?.data || error.message
        );

        setIsLoggedIn(false);
        setUser(defaultUser);
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  // ==========================================
  // GET USER BOOKINGS
  // ==========================================
  useEffect(() => {
    const getBookings = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/getbookings`,
          {
            withCredentials: true,
          }
        );
        setBookings(res.data.bookings || []);
      } catch (error) {
        console.log(
          "BOOKING ERROR:",
          error.response?.data || error.message
        );

        setBookings([]);
      }
    };

    getBookings();
  }, []);

  // ==========================================
  // STATUS COLORS
  // ==========================================
  const statusColors = {
    Confirmed: "bg-blue-100 text-blue-700",
    Pending: "bg-amber-100 text-amber-700",
    Completed: "bg-emerald-100 text-emerald-700",
    Cancelled: "bg-red-100 text-red-600",
  };

  function displayValue(value) {
    if (!value) {
      return (
        <span className="text-slate-400 italic">
          Not added yet
        </span>
      );
    }

    return value;
  }

  // ==========================================
  // TOGGLE DROPDOWN
  // ==========================================
  function toggleSection(sectionName) {
    if (openSection === sectionName) {
      setOpenSection(null);
    } else {
      setOpenSection(sectionName);
    }
  }

  // ==========================================
  // LOGOUT
  // ==========================================
  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/logout`,
        {},
        {
          withCredentials: true,
        }
      );

    localStorage.removeItem("user");
      setUser(defaultUser);
      setIsLoggedIn(false);
      setBookings([]);
      navigate('/');
    } catch (error) {
      console.log(
        "LOGOUT ERROR:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">

      <div className="max-w-5xl mx-auto">

        {/* ======================================
            LOGIN MESSAGE
        ====================================== */}
        {!isLoggedIn && !loading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-blue-50 border border-blue-100 text-blue-700 text-sm rounded-xl px-4 py-3"
          >
            You're not logged in. Log in to see your profile
            details and bookings.
          </motion.div>
        )}

        {/* ======================================
            LOADING
        ====================================== */}
        {loading && (
          <div className="mb-6 bg-white border border-blue-100 rounded-xl px-4 py-3 text-sm text-slate-500 shadow-sm">
            Loading your profile...
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ======================================
              LEFT SIDE - USER PROFILE
          ====================================== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3 bg-white rounded-2xl border border-blue-100 p-6 shadow-md"
          >

            {/* ==================================
                AVATAR + NAME
            ================================== */}
            <div className="flex items-center gap-5 mb-6">

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 ring-4 ring-blue-50 flex items-center justify-center shadow-md shadow-blue-200"
              >
                <UserCircle2 className="w-11 h-11 text-white" />
              </motion.div>

              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  {displayValue(user.fullName)}
                </h2>

                <p className="text-sm text-blue-600">
                  {displayValue(user.email)}
                </p>
              </div>

            </div>

            {/* ==================================
                ACCOUNT DETAILS
            ================================== */}
            <div className="border-t border-slate-100 pt-5">

              <h3 className="text-sm font-semibold text-slate-700 mb-4">
                Account
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* USERNAME */}
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1.5">
                    Username
                  </p>

                  <div className="flex items-center gap-2 bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2.5">

                    <User className="w-4 h-4 text-slate-400 shrink-0" />

                    <p className="text-sm text-slate-700">
                      {displayValue(user.username)}
                    </p>

                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1.5">
                    Email
                  </p>

                  <div className="flex items-center gap-2 bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2.5">

                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />

                    <p className="text-sm text-slate-700">
                      {displayValue(user.email)}
                    </p>

                  </div>
                </div>

                {/* FULL NAME */}
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1.5">
                    Full name
                  </p>

                  <div className="flex items-center gap-2 bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2.5">

                    <User className="w-4 h-4 text-slate-400 shrink-0" />

                    <p className="text-sm text-slate-700">
                      {displayValue(user.fullName)}
                    </p>

                  </div>
                </div>

                {/* MOBILE */}
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1.5">
                    Mobile
                  </p>

                  <div className="flex items-center gap-2 bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2.5">

                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />

                    <p className="text-sm text-slate-700">
                      {displayValue(user.mobile)}
                    </p>

                  </div>
                </div>

                {/* TITLE */}
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1.5">
                    Title
                  </p>

                  <div className="flex items-center gap-2 bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2.5">

                    <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />

                    <p className="text-sm text-slate-700">
                      {displayValue(user.title)}
                    </p>

                  </div>
                </div>

                {/* LANGUAGE */}
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1.5">
                    Language
                  </p>

                  <div className="flex items-center gap-2 bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2.5">

                    <Globe className="w-4 h-4 text-slate-400 shrink-0" />

                    <p className="text-sm text-slate-700">
                      {displayValue(user.language)}
                    </p>

                  </div>
                </div>

                {/* ADDRESS */}
                <div className="sm:col-span-2">

                  <p className="text-xs font-medium text-slate-500 mb-1.5">
                    Address
                  </p>

                  <div className="flex items-center gap-2 bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2.5">

                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />

                    <p className="text-sm text-slate-700">
                      {displayValue(user.address)}
                    </p>

                  </div>

                </div>

              </div>
            </div>

          </motion.div>

          {/* ======================================
              RIGHT SIDE
          ====================================== */}
          <div className="lg:col-span-2 space-y-3">

            {/* ==================================
                BOOKINGS
            ================================== */}
            <div className="border border-blue-100 rounded-xl overflow-hidden bg-white shadow-sm">

              <button
                onClick={() => toggleSection("bookings")}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-blue-50/50 transition-colors"
              >

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>

                  <span className="text-sm font-medium text-slate-700">
                    Bookings
                  </span>

                  <span className="text-xs text-blue-600 bg-blue-50 rounded-full px-2 py-0.5">
                    {bookings.length}
                  </span>

                </div>

                <motion.div
                  animate={{
                    rotate:
                      openSection === "bookings"
                        ? 180
                        : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </motion.div>

              </button>

              <AnimatePresence initial={false}>

                {openSection === "bookings" && (

                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: "easeInOut",
                    }}
                    className="overflow-hidden"
                  >

                    <div className="px-4 pb-4">

                      <div className="space-y-2 pt-2">

                        {bookings.length === 0 && (
                          <p className="text-sm text-slate-400 text-center py-3">
                            No bookings to show.
                          </p>
                        )}

                        {/* {bookings.map((booking) => (

                          <div
                            key={booking.id}
                            className="flex items-center justify-between bg-blue-50/60 rounded-lg px-3 py-2.5"
                          >

                            <div>

                              <p className="text-sm font-medium text-slate-700">
                                {booking.title}
                              </p>

                              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                                <Calendar className="w-3 h-3" />
                                {booking.date}
                              </p>

                            </div>

                            <span
                              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                statusColors[booking.status] ||
                                "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {booking.status}
                            </span>

                          </div>

                        ))} */}

                        {bookings.map((booking) => (
  <motion.div
    key={booking._id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white border border-blue-100 rounded-xl p-3 sm:p-4 shadow-sm mb-3 w-full overflow-hidden"
  >
    {/* PACKAGE HEADER */}
    <div className="flex flex-col xs:flex-row sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
      <div className="min-w-0">
        <p className="text-xs text-blue-500 font-medium uppercase tracking-wide">
          Package
        </p>

        <h4 className="text-sm sm:text-base font-semibold text-slate-800 mt-1 break-words">
          {booking.packageId?.name ||
            booking.packageId?.title ||
            "Package"}
        </h4>
      </div>

      <span className="self-start shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
        Booking
      </span>
    </div>

    {/* RESPONSIVE DETAILS */}
    <div className="border border-slate-100 rounded-lg overflow-hidden">

      {/* HEADER */}
      <div className="grid grid-cols-2 bg-slate-50 px-2 sm:px-3 py-2">
        <span className="text-[11px] sm:text-xs font-medium text-slate-500">
          Detail
        </span>

        <span className="text-[11px] sm:text-xs font-medium text-slate-500">
          Information
        </span>
      </div>

      {/* PACKAGE */}
      <div className="grid grid-cols-2 gap-2 px-2 sm:px-3 py-2.5 border-t border-slate-100">
        <span className="text-xs sm:text-sm text-slate-500">
          Package
        </span>

        <span className="text-xs sm:text-sm font-medium text-slate-700 break-words">
          {booking.packageId?.name ||
            booking.packageId?.title ||
            "N/A"}
        </span>
      </div>

      {/* DATE */}
      <div className="grid grid-cols-2 gap-2 px-2 sm:px-3 py-2.5 border-t border-slate-100">
        <span className="text-xs sm:text-sm text-slate-500 flex items-center gap-1">
          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          Travel Date
        </span>

        <span className="text-xs sm:text-sm font-medium text-slate-700">
          {booking.date}
        </span>
      </div>

      {/* TRAVELERS */}
      <div className="grid grid-cols-2 gap-2 px-2 sm:px-3 py-2.5 border-t border-slate-100">
        <span className="text-xs sm:text-sm text-slate-500">
          Travelers
        </span>

        <span className="text-xs sm:text-sm font-medium text-slate-700">
          {booking.travelers}
        </span>
      </div>

      {/* PRICE */}
      <div className="grid grid-cols-2 gap-2 px-2 sm:px-3 py-2.5 border-t border-slate-100">
        <span className="text-xs sm:text-sm text-slate-500">
          Price
        </span>

        <span className="text-xs sm:text-sm font-semibold text-blue-600">
          ₹{booking.packageId?.price ||
            booking.packageId?.amount ||
            "N/A"}
        </span>
      </div>

      {/* NAME */}
      <div className="grid grid-cols-2 gap-2 px-2 sm:px-3 py-2.5 border-t border-slate-100">
        <span className="text-xs sm:text-sm text-slate-500">
          Name
        </span>

        <span className="text-xs sm:text-sm text-slate-700 break-words">
          {booking.name}
        </span>
      </div>

      {/* EMAIL */}
      <div className="grid grid-cols-2 gap-2 px-2 sm:px-3 py-2.5 border-t border-slate-100">
        <span className="text-xs sm:text-sm text-slate-500">
          Email
        </span>

        <span className="text-xs sm:text-sm text-slate-700 break-all">
          {booking.email}
        </span>
      </div>

      {/* PHONE */}
      <div className="grid grid-cols-2 gap-2 px-2 sm:px-3 py-2.5 border-t border-slate-100">
        <span className="text-xs sm:text-sm text-slate-500">
          Phone
        </span>

        <span className="text-xs sm:text-sm text-slate-700 break-words">
          {booking.phone}
        </span>
      </div>

    </div>
  </motion.div>
))}

                      </div>

                    </div>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

            {/* ==================================
                PAYMENT METHODS
            ================================== */}
            <div className="border border-blue-100 rounded-xl overflow-hidden bg-white shadow-sm">

              <button
                onClick={() => toggleSection("payments")}
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-blue-50/50 transition-colors"
              >

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>

                  <span className="text-sm font-medium text-slate-700">
                    Payment methods
                  </span>

                </div>

                <motion.div
                  animate={{
                    rotate:
                      openSection === "payments"
                        ? 180
                        : 0,
                  }}
                >
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </motion.div>

              </button>

              <AnimatePresence initial={false}>

                {openSection === "payments" && (

                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    className="overflow-hidden"
                  >

                    <p className="px-4 pb-4 text-sm text-slate-500">
                      No payment methods added yet.
                    </p>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

            {/* ==================================
                NOTIFICATIONS
            ================================== */}
            <div className="border border-blue-100 rounded-xl overflow-hidden bg-white shadow-sm">

              <button
                onClick={() =>
                  toggleSection("notifications")
                }
                className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-blue-50/50 transition-colors"
              >

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-blue-600" />
                  </div>

                  <span className="text-sm font-medium text-slate-700">
                    Notifications
                  </span>

                </div>

                <motion.div
                  animate={{
                    rotate:
                      openSection === "notifications"
                        ? 180
                        : 0,
                  }}
                >
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </motion.div>

              </button>

              <AnimatePresence initial={false}>

                {openSection === "notifications" && (

                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    className="overflow-hidden"
                  >

                    <p className="px-4 pb-4 text-sm text-slate-500">
                      You're subscribed to booking reminders
                      and account alerts.
                    </p>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 border border-red-100 text-red-600 hover:bg-red-50 text-sm font-medium py-3 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </motion.button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Userprofile;