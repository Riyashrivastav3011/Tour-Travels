import React from 'react'
import { useState , useEffect , useRef } from 'react'
import axios from 'axios'
import Gif from '../../images/summer.gif' 
import { IoIosFlower } from "react-icons/io";
import Cards from './Cards'
import HD from '../../images/haridwar.jpeg'
import KS from '../../images/kashmir.jpg'
import KD from '../../images/kedarnth.jpeg' 
import LD from '../../images/ladakh.jpeg'
import Fall from '../../images/fall.jpeg'
import GJ from '../../images/gujrat.jpeg'
import NP from '../../images/nepal.jpeg'
import TJ from '../../images/taj.webp'
import BD from '../../images/buddha.jpeg'
import SP from '../../images/spot.jpeg'
import Msg from './Message'
import Header from './Header'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom';



function Packages() {
   const [packages , setPackages] = useState([]); 
    const Navigate = useNavigate();
   useEffect(() =>{
    showPackages();
   } , [])

   const handleBooknow = (id) =>{
    const token = localStorage.getItem('token');
    if(token){
      Navigate(`/booknow/${id}`)
    }else{
     Navigate('/login');
    }

   }

    const showPackages = async () =>{
     try{
      const res = await axios.get('http://localhost:5000/admin/package')
      setPackages(res.data);
     }catch(err){
      console.log(err);
     }
     }
  

    const carouselRef = useRef(null)
    
      const scroll = (direction) => {
        if (!carouselRef.current) return
        const scrollAmount = 300 // adjust for scroll speed
        carouselRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        })
      }
    
      const firstFour = packages.slice(0 , 4);
      const lastFour = packages.slice(4 , 8);

      const images = [HD, KS, LD, KD, Fall, GJ, NP, TJ, BD, SP]
    
  return (
    <>
    <Header/>
    {/* international offers */}
    <div className="bg-gray-200 w-full py-10">
      <p
        className="text-blue-800 text-3xl text-center"
        style={{ fontFamily: 'VisitQatar-zh' }}
      >
        International Holiday Packages
      </p>
      <p
        className="text-lg text-center mt-2"
        style={{ fontFamily: 'VisitQatar-zh' }}
      >
        Whether it’s your first international trip or you have travelled abroad multiple times, planning a holiday to a distant land is always a special…
      </p>

      {/* Card Container */}
      <div className="flex flex-wrap justify-center gap-4 px-4 md:px-10 mt-6">
        {/* Single Card */}
        {firstFour.map((pkg , index) =>(
   <div key={index} className="bg-white border border-gray-300 p-2 pb-5 w-[90%] sm:w-[45%] md:w-[22%]">
          <img src={`http://localhost:5000/uploads/${pkg.image}`}  alt="Europe" className="h-3/4 w-full object-cover" />
          <div className="flex justify-between items-center mt-2">
           <span> <p className="font-medium font-poppins">{pkg.description}</p>
            <p className="text-blue-800 text-2xl">{pkg.price}</p>
       </span>  
       <button 
       onClick={() => handleBooknow(pkg._id)}
        className="btn hover:bg-[#6888f2] hover:rounded-2xl">Book now</button>
        </div>
        </div> 
        ) )}
      
      </div>
    </div>
    {/* Indain offers */}
     <div className="bg-gray-200 w-full py-10">
      <p
        className="text-blue-800 text-3xl text-center"
        style={{ fontFamily: 'VisitQatar-zh' }}
      >
        Indian & Around Holiday Packages
      </p>
      <p
        className="text-lg text-center mt-2"
        style={{ fontFamily: 'VisitQatar-zh' }}
      >
        Whether it’s your first international trip or you have travelled abroad multiple times, planning a holiday to a distant land is always a special…
      </p>

      {/* Card Container */}
      <div className="flex flex-wrap justify-center gap-4 px-4 md:px-10 mt-6">
        {/* Single Card */}
       {lastFour.map((pkg , index) =>(
       <div key={index} className="bg-white border border-gray-300 p-2 pb-5 w-[90%] sm:w-[45%] md:w-[22%]">
          <img src={`http://localhost:5000/uploads/${pkg.image}`}  alt="Europe" className="h-3/4 w-full object-cover" />
          <div className="flex justify-between items-center mt-2">
           <span> <p className="font-medium font-poppins">{pkg.description}</p>
            <p className="text-blue-800 text-2xl">{pkg.price}</p>
       </span>  
       <button
       onClick={() => handleBooknow(pkg._id)}
       className="btn hover:bg-[#6888f2] hover:rounded-2xl" >Book now</button>
        </div>
        </div>
       ))

       }
      </div>
    </div>
    {/* Where to go */}
    <div className='w-full pb-10 bg-cover bg-no-repeat ' style={{backgroundImage:`url(${Gif})`, backgroundPosition:'center'}}>
    <p className='font-bold text-2xl pt-10 text-black text-center'>Not Sure When to Go or Where to Go</p>
 <span className='flex justify-center'> <button className='bg-black py-2 px-4 rounded  text-white flex items-center mx-2 my-4'><IoIosFlower /> Winter</button> 
  <button className='bg-black py-2 px-4 rounded  text-white flex items-center mx-2 my-4'><IoIosFlower />Summer</button> 
  <button className='bg-black py-2 px-4 rounded  text-white flex items-center mx-2 my-4'><IoIosFlower />Monsoon</button> 
</span>
<div className='w-full md:flex justify-between'>
  <div className='bg-white md:ms-10 p-10 mr-10 opacity-80 rounded-xl'>
    <p className='font-medium text-3xl '>Feel the summer vibes with our exclusive holiday packages!</p>
    <p className='mt-5 font-medium'>From sun-kissed beaches to <br /> vibrant city escapes, soak up the <br /> perfect weather and create <br />
      unforgettable memories. Your <br /> dream summer getaway awaits <br /> with SOTC!</p>
  </div>
  
 <div className="relative w-full flex justify-center items-center py-2">
      <div className='w-full md:w-[90%] md:flex md:justify-around py-10 mx-auto bg-white rounded-2xl'>
  {/* Left Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 z-10 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-300"
      >
        ❮
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="carousel carousel-center rounded-box  max-w-full h-[220px] sm:h-[260px] md:h-80 space-x-3 p-3 overflow-x-scroll scroll-smooth no-scrollbar flex"
      >
        {images.map((img, index) => (
          <div key={index} className="carousel-item h-full shrink-0">
            <img
              src={img}
              alt={`Slide ${index}`}
              className="rounded-xl w-[200px] sm:w-60 md:w-[280px] object-cover border border-gray-300"
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 z-10 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-300"
      >
        ❯
      </button>
 </div>
    </div>

</div>
</div>
<Msg/>
<Footer/>
    </>
  )
}

export default Packages


