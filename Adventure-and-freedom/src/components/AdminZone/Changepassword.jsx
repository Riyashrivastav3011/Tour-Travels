import React from 'react'
import Dashboardlayout from './Dashboardlayout'
import { motion } from "framer-motion";


function Changepassword() {
  return (
    <Dashboardlayout>
      <motion.div
  className="w-full md:w-1/2 mx-auto"
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>
  <motion.form
    className="max-w-md p-8 rounded-3xl shadow-2xl bg-gray-50 border border-gray-200"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Contact Us</h2>

    {/* INPUT GROUP */}
    <div className="space-y-5">

      <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-yellow-400 transition">
        <i className="ri-user-line text-gray-500 text-xl"></i>
        <input
        type="password" 
          placeholder="Enter New Password"
          className="w-full outline-none"
        />
      </div>

      <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-yellow-400 transition">
        <i className="ri-phone-line text-gray-500 text-xl"></i>
        <input
          type="Password"
          placeholder="Enter New Password"
          className="w-full outline-none"
        />
      </div>
      </div>

    {/* SUBMIT BUTTON */}
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl shadow-lg transition"
    >
      Change password 
    </motion.button>
  </motion.form>
</motion.div> 
    </Dashboardlayout>
  )
}

export default Changepassword