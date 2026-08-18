import React, {useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import axios from 'axios'
import Header from './Header'
import Footer from './Footer'


function Placedetail() {
    const [places , setPlaces] = useState([]);
   const navigate = useNavigate();
   const {id} = useParams();

     useEffect(() =>{
       axios.get(`${import.meta.env.VITE_API_URL}/destinations/place/${id}`)
       .then((res) =>{ 
        setPlaces(res.data)
       console.log(res.data);
       });
     } , [])
  return (
    <>
    <Header/>
            <p className='text-gray-700 text-center font-bold text-3xl py-2'>Detailed information about {places.name}</p>
     <div className="bg-gradient-to-br my-2 items-center from-white to-sky-100 md:flex h-screen w-[90%] mx-auto">
        {/* LEFT SIDE: PACKAGE DETAILS */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/${places.image}`}
            className="rounded-xl h-100 w-[350px] md:w-[420px] mx-auto shadow-2xl"
            alt={places.description}
          />
        </motion.div>
   
        {/* RIGHT SIDE: BOOKING FORM */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.form
            className="max-w-md p-8 rounded-3xl shadow-2xl bg-gray-50 border border-gray-200"
          >
           <div className='space-y-1 text-center'>
            <h1 className='text-2xl text-gray-700 font-bold'>{places.name}</h1>
            <p className='text-gray-700'>{places.description}</p>
            <p className='text-gray-700'>There are <strong>{places.hotel} hotels</strong> &  <strong>{places.resort} resorts</strong> in dubai</p>
            <p className='text-gray-700'><strong>Nearest Places : </strong>{places.nearPlaces}</p>
           </div>
          </motion.form>
        </motion.div>
      </div>
      <Footer/>
    </>
  )
}

export default Placedetail