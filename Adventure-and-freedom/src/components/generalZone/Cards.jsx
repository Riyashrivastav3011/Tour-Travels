import React, { useRef, useEffect } from 'react'
import { useState  } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Cards() {
  const carouselRef = useRef(null)
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
     

  const scroll = (direction) => {
    if (!carouselRef.current) return
    const scrollAmount = 300
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let scrollSpeed = 0.5 // pixels per frame (adjust for faster/slower)
    let animationFrameId

    const smoothScroll = () => {
      if (!carousel) return

      carousel.scrollLeft += scrollSpeed

      // Loop seamlessly
      if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
        carousel.scrollLeft = 0
      }

      animationFrameId = requestAnimationFrame(smoothScroll)
    }

    animationFrameId = requestAnimationFrame(smoothScroll)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])



  return (
    <>
      <p className="text-3xl font-bold md:ms-20 mt-30">Best Places to Visit</p>
      <div className="relative w-full flex justify-center items-center py-2">
        <div className="w-full md:w-[90%] py-10 mx-auto bg-white rounded-2xl relative overflow-hidden">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-300"
          >
            ❮
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="no-scrollbar flex flex-nowrap space-x-3 p-3"
            style={{
              overflowX: 'scroll',
              scrollBehavior: 'auto', // manual smoothness
            }}
          >
            {/* Duplicate images for infinite loop */}
            {[...(remains || []), ...(remains || [])].map((img, index) => (
              <div key={index} className="shrink-0">
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${img.image}`} 
                  alt={`Slide ${index}`}
                  className="rounded-xl w-[200px] sm:w-60 md:w-[280px] h-[220px] sm:h-[260px] md:h-80 object-cover border border-gray-300"
                  onClick={() => navigate('/bestplaces')}
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-300"
          >
            ❯
          </button>
        </div>
      </div>
    </>
  )
}

export default Cards
