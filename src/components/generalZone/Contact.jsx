import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Img from "../../images/contact.jpeg";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from 'axios'
import Swal from "sweetalert2";


function Contact() {
   const [query , setQuery] = useState({
    name:'',
    email:'',
    mobile:'',
    message:''
   });
   const handleChange = (e) =>{
    setQuery({...query , [e.target.name]:e.target.value})
   }
   const Submit = async (e) =>{
   e.preventDefault();
    try{
     await axios.post('http://localhost:5000/admin/query' , query);
      Swal.fire({
             title: "Success!",
             text: "Thanks for Contact us",
             icon: "success",
             confirmButtonText: "OK"
           });
    }catch(err){
      Swal.fire({
            title: "Error!",
            text: err.response?.data?.message || "Something went wrong!",
            icon: "error",
            confirmButtonText: "Try Again"
          });
    }
   }

  return (
    <>
      <Header />
      <div className="w-full md:w-full py-10 rounded-2xl md:flex justify-center items-center gap-10">
        <motion.div
          className="w-full md:w-1/2 text-center" 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={Img}
            className="rounded-xl w-[350px] md:w-[420px] mx-auto shadow-2xl hover:scale-105 transition-transform duration-300"
            alt="contact"
          />
        </motion.div>

        {/* Right Form with Animation */}
        <motion.div
  className="w-full md:w-1/2"
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>
  <motion.form
    onSubmit={Submit}
    className="max-w-md p-8 rounded-3xl shadow-2xl bg-gray-50 border border-gray-200"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Contact Us</h2>

    {/* INPUT GROUP */}
    <div className="space-y-5">

      {/* Name */}
      <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-yellow-400 transition">
        <i className="ri-user-line text-gray-500 text-xl"></i>
        <input
        type="text" 
        name="name"
        onChange={handleChange}
          placeholder="Your Name"
          className="w-full outline-none"
        />
      </div>

      {/* Mobile */}
      <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-yellow-400 transition">
        <i className="ri-phone-line text-gray-500 text-xl"></i>
        <input
          type="tel"
          name="mobile"
        onChange={handleChange}
          placeholder="Mobile Number"
          className="w-full outline-none"
        />
      </div>

      {/* Email */}
      <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-yellow-400 transition">
        <i className="ri-mail-line text-gray-500 text-xl"></i>
        <input
          type="email"
          name='email'
        onChange={handleChange}
          placeholder="Email Address"
          className="w-full outline-none"
        />
      </div>

      {/* Message */}
      <div className="bg-white p-3 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-yellow-400 transition">
        <textarea
          rows="4"
          placeholder="Your Message..."
          name="message"
        onChange={handleChange}
          className="w-full outline-none resize-none"
        ></textarea>
      </div>
    </div>

    {/* SUBMIT BUTTON */}
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl shadow-lg transition"
    >
      Send Message
    </motion.button>
  </motion.form>
</motion.div>
      </div>
      <Footer />
    </>
  );
}

export default Contact


