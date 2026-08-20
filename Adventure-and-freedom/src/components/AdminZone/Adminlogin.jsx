import React from "react";
import { useState }from 'react'
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../../images/back.avif";
import Swal from "sweetalert2";
 import axios from 'axios';


const Adminlogin = () => {
  const [form , setForm] = useState({
    email:'',
    password:''
  })
  const navigate = useNavigate();
  const handleChange = (e) =>{
     setForm({...form , [e.target.name] : e.target.value})
  }
  const Submit = async (e) =>{
    e.preventDefault();
    try{
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login` , form , {withCredentials:true});
       localStorage.setItem('token', res.data.token);
         localStorage.setItem('user', JSON.stringify(res.data.admin));
          Swal.fire({
              title: "Success!",
              text: "Welcome to Dashboard",
              icon: "success",
              confirmButtonText: "OK"
            });
            navigate('/admin/dashboard');
    }catch(err){
      console.log(err.response?.data);
       Swal.fire({
           title: "Error!",
           text: err.response?.data?.message || "Something went wrong!",
           icon: "error",
           confirmButtonText: "Try Again"
         });
        }
  }
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
          Admin Login
        </h2>

        <p className="text-center text-gray-200 text-sm mb-8">
          Secure access to administration panel
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={Submit}>
          {/* Email */}
          <div>
            <label className="text-white block mb-2">Admin Email</label>
            <input
              type="email"
              name='email'
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
                         placeholder-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="admin@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-white block mb-2">Password</label>
            <input
              type="password"
              name='password'
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white 
                         placeholder-gray-200 focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="Enter password"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 
                       text-gray-900 font-semibold transition shadow-md"
          >
            Login to Admin Panel
          </button>
        </form>

        {/* Forgot Password */}
        <p className="text-center text-sm text-white mt-6">
          Forgot password?{" "}
          <a href="#" className="text-yellow-300 hover:underline">
            Reset
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Adminlogin;
