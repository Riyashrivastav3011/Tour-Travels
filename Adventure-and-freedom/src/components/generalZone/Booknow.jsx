import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Booknow() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [totalprice , settotalprice] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "",
    date: "",
    packageId: "",
    packageName: "",
    packagePrice: "",
    duration: "",
  });

  // Fetch package details
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/package/${id}`)
      .then((res) => {
        setPkg(res.data);

        // Auto-fill package info
        setForm((prev) => ({
          ...prev,
          packageName: res.data.description,
          packagePrice: res.data.price,
          duration: res.data.duration,
          packageId: res.data._id,
        }));
      })
      .catch((err) => console.log(err));
  }, [id]);


  useEffect(() =>{
    const cleanPrice = form.packagePrice.replace("$", "");
    const total = Number(cleanPrice) * Number(form.travelers);
    settotalprice(total);

  } , [form.packagePrice , form.travelers]);
  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit booking
 const handleSubmit = (e) => {
  e.preventDefault();
  try{
    axios.post(`${import.meta.env.VITE_API_URL}/pay/order` , {amount : totalprice})
    .then((res) => {
      console.log("2. Order create response:", res.data);   
      const options = {
        key : res.data.key,
        amount : res.data.amount,
        currency : res.data.currency,
        order_id : res.data.orderId,
        name:"Adventure and freedom",
        prefill :{
          name:form.name,
          email:form.email,
          contact:form.phone
        },
        handler : function(response){
           console.log("4. Payment successful, response:", response);  
          axios.post(`${import.meta.env.VITE_API_URL}/admin/bookings`, form)
          .then(() =>{
             console.log("5. Booking saved successfully"); 
            Swal.fire({
          title: "Success!",
          text: "Booking Confirmed Successfully!",
          icon: "success",
          confirmButtonText: "OK",
         })
          setForm(prev => ({
        ...prev,
        name: "",
        email: "",
        phone: "",
        travelers: "",
        date: "",
      }));
          })
        }
      }

       console.log("3. Options ready, opening Razorpay:", options); 
    const razorpayObject = new window.Razorpay(options);
    razorpayObject.open();
    })
     .catch((err) => {
        console.log("ORDER CREATE FAILED:", err);   // <-- yahan
      });

  }catch(err){
     Swal.fire({
          title: "Error!",
          text: err.response?.data?.message || "Something went wrong!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
        console.log(err);
  }
 }

  if (!pkg) {
    return (
      <>
        <Header />
        <p className="text-center mt-10 text-xl">Loading package...</p>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-linear-to-br my-5 items-center from-white to-[#f7c7d4] md:flex h-screen w-[90%] mx-auto">
        
        {/* LEFT SIDE: PACKAGE DETAILS */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${pkg.image}`}
            className="rounded-xl w-[350px] md:w-[420px] mx-auto shadow-2xl"
            alt={pkg.description}
          />

          <div className="px-auto mt-4 mx-35">
            <p className="font-bold text-xl py-2">Package Details</p>

            <div className="space-y-3">
              <input
                type="text"
                value={form.packageName}
                name="packageName"
                className="w-full border p-3 rounded-lg bg-white"
                readOnly
              />

              <input
                type="text"
                value={form.duration}
                name="duration"
                className="w-full border p-3 rounded-lg bg-white"
                readOnly
              />

              <input
                type="text"
                value={form.packagePrice}
                name="packagePrice"
                className="w-full border p-3 rounded-lg bg-white"
                readOnly
              />
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: BOOKING FORM */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-md p-8 rounded-3xl shadow-2xl bg-gray-50 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Booking Details
            </h2>

            <div className="space-y-5">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 border rounded-xl"
                required
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border rounded-xl"
                required
              />

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full p-3 border rounded-xl"
                required
              />

              <input
                type="number"
                name="travelers"
                onChange={handleChange}
                value={form.travelers}
                placeholder="Number of Travellers"
                className="w-full p-3 border rounded-xl"
                required
              />

               <input
                type="text"
                name="totalprice"
                value={totalprice}
                placeholder="total price"
                className="w-full p-3 border rounded-xl"
                readOnly
              />

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
                required
              />

              {/* Hidden package ID for backend */}
              <input type="hidden" name="packageId" value={form.packageId} />
            </div>

            <button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 bg-yellow-400 text-black font-semibold py-3 rounded-xl"
              type="submit"
            >
              Confirm Booking
            </button>
          </motion.form>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

export default Booknow;
