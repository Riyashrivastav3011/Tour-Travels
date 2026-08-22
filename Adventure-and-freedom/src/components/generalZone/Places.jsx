import React from 'react'
import '../../App.css'
import { useState , useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Places() {
   const [places , setPlaces] = useState([]);
   const navigate = useNavigate();

    useEffect(() =>{
      showPlaces();
    } , []);
  
     const showPlaces = async () =>{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/destinations/place`);
        setPlaces(res.data);
     }

      const remains = places.slice(12);
     
    
  return (
    <>
      <div className="mt-16 flex flex-col md:flex-row justify-around items-center aminate-fadeOnScroll ">
        <div className="w-full md:w-1/2 text-center px-5 md:px-10 mb-10 md:mb-0">
          <p
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "VisitQatar-zh" }}
          >
            Choose Your Destination From Best Places
          </p>
          <p className="mt-4 text-sm sm:text-base text-gray-700">
            Discover handpicked destinations perfect for your next getaway. From scenic mountains to 
            peaceful beaches, explore places that match your mood and make unforgettable memories.
          </p>
          <p className="text-sm sm:text-base text-gray-700 mt-2">
            Explore the world’s most loved destinations and plan your perfect trip — where every 
            place tells a story worth visiting.
          </p>
          <p className="text-sm sm:text-base text-gray-700 mt-2">
            We’ve gathered some of the most beautiful and popular destinations across the world.
             Whether you love nature, adventure, or relaxation, find your perfect place to visit 
             right here.
          </p>
        </div>

        {/* 🏞️ Carousel Section */}
        <div className="w-full md:w-1/2"> 
          <div className="carousel carousel-center rounded-box bg-neutral max-w-full h-[300px] sm:h-[350px] md:h-[400px] space-x-4 p-4 overflow-x-scroll">
          {remains.map((img , index) => {
  return (
    <div key={index} className='carousel-item h-full'>
      <img 
        src={`${import.meta.env.VITE_API_URL}/uploads/${img.image}`} 
        className='rounded-box w-full md:w-96 object-cover'
        alt={img.name || `Slide ${index + 1}`}
        onClick={() => navigate('/bestplaces')}
        />
    </div>   
  )
})}
          </div>
        </div>

      </div>
    </>
  )
}

export default Places
