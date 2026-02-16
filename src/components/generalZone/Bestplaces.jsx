import React, { useEffect, useState } from 'react'
import { TbCrop32 } from 'react-icons/tb'
import Places from './Places'
import Cards from './Cards'
import Msg from './Message'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Bestplaces() {
  const [places , setPlaces] = useState([]);
  const navigate = useNavigate();
  useEffect(() =>{
    showPlaces();
  } , []);

   const showPlaces = async () =>{
      const res = await axios.get('http://localhost:5000/destinations/place');
      setPlaces(res.data);
   }
  
  const four = places.slice(0 , 4);
  const eight = places.slice(4 , 8);
  const twelve = places.slice(8 , 12); 
  const remains = places.slice(12);

 
   
  return (
    <>
    <Header/>
    <div className='w-full bg-gray-200 py-10'>
    <p className='font-bold text-2xl mb-5 md:ms-15'>Trending Destinations</p>
    <div className='w-full md:w-[90%] animate-fadeIn md:flex md:justify-around py-10 my-5 mx-auto bg-white rounded-2xl'>
    <div className='w-full md:w-[90%] mx-auto bg-white rounded-2xl py-10 grid grid-cols-1 md:grid-cols-4 gap-6 animate-fadeIn'>
    {four.map((place) =>{
      return (
      <div  key={place._id}  className='w-full h-80 hover:scale-105 transition-transform duration-300 rounded-xl overflow-hidden bg-gray-100'>
       <div className='w-[90%] mx-auto mt-2 h-40 md:mx-0 hover:scale-105 transition-transform duration-300'>
      <img src={`http://localhost:5000/uploads/${place.image}`}  className='h-full w-full rounded-xl hover:animate-pulse'/>
    </div>
       <div className='p-3'>
                <p className='text-center font-bold text-xl mb-2'>{place.name}</p>
                <p className='text-sm mb-2'>
                  {place.description.length > 100
                    ? place.description.slice(0, 100) + '...'
                    : place.description}
                </p>
                <button
                onClick={() => navigate(`/placedetail/${place._id}`)}
                  className='text-blue-500 hover:underline'
                >
                  Read more
                </button>
              </div>
      </div>
      )

    })
    }
    </div>
     </div>
     <div className='w-full md:w-[90%] md:flex md:justify-around py-10 mx-auto bg-white rounded-2xl animate-fadeIn'>
    <div className='w-full md:w-[90%] mx-auto bg-white rounded-2xl py-10 grid grid-cols-1 md:grid-cols-4 gap-6 animate-fadeIn'>
    {eight.map((place) =>{
      return (
      <div  key={place._id}  className='w-full h-80 hover:scale-105 transition-transform duration-300 rounded-xl overflow-hidden bg-gray-100'>
       <div className='w-[90%] mx-auto mt-2 h-40 md:mx-0 hover:scale-105 transition-transform duration-300'>
      <img src={`http://localhost:5000/uploads/${place.image}`}  className='h-full w-full mx-auto rounded-xl hover:animate-pulse'/>
    </div>
       <div className='p-3'>
                <p className='text-center font-bold text-xl mb-2'>{place.name}</p>
                <p className='text-sm mb-2'>
                  {place.description.length > 100
                    ? place.description.slice(0, 100) + '...'
                    : place.description}
                </p>
                <button
                onClick={() => navigate(`/placedetail/${place._id}`)}
                  className='text-blue-500 hover:underline'
                >
                  Read more
                </button>
              </div>
      </div>
      )

    })
    }
    </div>
    </div>
    {/* top things to do worldwide */}
    <p className='text-xl font-bold mt-10 ms-5 md:ms-15'>Top things to do World wide</p>
    <div className='w-full md:w-[90%] my-10 md:flex md:justify-around py-20 mx-auto bg-gradient-to-r from-white to-yellow-200 rounded-2xl'>
   <div className='w-full md:w-[90%] mx-auto  rounded-2xl py-10 grid grid-cols-1 md:grid-cols-4 gap-6 animate-fadeIn'>
    { twelve .map((place) =>{
      return (
      <div  key={place._id}  className='w-full h-80 hover:scale-105 transition-transform duration-300 rounded-xl overflow-hidden'>
       <div className='w-[90%] mx-auto mt-2 h-40 md:mx-0 hover:scale-105 transition-transform duration-300'>
      <img src={`http://localhost:5000/uploads/${place.image}`}  className='h-full w-full rounded-xl hover:animate-pulse'/>
    </div>
       <div className='p-3'>
                <p className='text-center font-bold text-xl mb-2'>{place.name}</p>
                <p className='text-sm mb-2'>
                  {place.description.length > 100
                    ? place.description.slice(0, 100) + '...'
                    : place.description}
                </p>
                <button
                onClick={() => navigate(`/placedetail/${place._id}`)}
                  className='text-blue-500 hover:underline'
                >
                  Read more
                </button>
              </div>
      </div>
      )

    })
    }
    </div>
    </div>
    <Places />
    <Cards />
    <Msg/>
    </div>
    <Footer/>
   </>
  )
}

export default Bestplaces

