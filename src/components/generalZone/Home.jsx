import React from 'react'
import { Link } from 'react-router-dom'
import { useState , useEffect } from 'react';
import Bg1 from "../../images/bg1.jpg";
import Friend from '../../images/friends.jpeg'
import Places from './Places'
import { MdOutlineTravelExplore } from "react-icons/md";
import { FcCustomerSupport } from "react-icons/fc";
import { SlCalender } from "react-icons/sl";
import { FaThumbsUp } from "react-icons/fa6";
import { IoGiftSharp } from "react-icons/io5";
import Msg from './Message'
import Cards from './Cards'
import '../../App.css';
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'



function Home() {
     const [packages , setPackages] = useState([]); 
        
       useEffect(() =>{
        showPackages();
       } , [])
    
        const showPackages = async () =>{
         try{
          const res = await axios.get('http://localhost:5000/admin/package')
          setPackages(res.data);
         }catch(err){
          console.log(err);
         }
         }
      const firstFour = packages.slice(0 , 4);

    

    const pics = [
        Bg1,
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1600&q=80",
      ];
    
      const [index, setIndex] = useState(0);
      // Auto image carousel
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((index + 1) % pics.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <>
     <Header/>
    <div className="relative w-full h-[250px] sm:h-[350px] animate-fadeIn">
        <img
          src={pics[index]}
          alt="slide"
          className="w-full h-full object-cover overflow-hidden"
        />
    </div>
     <div className="w-full bg-gray-200 flex flex-col md:flex-row justify-center animate-fadeIn items-center py-10 px-5 md:px-10">
        <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0 animate-fadeIn">
          <img
            src={Friend}
            alt="friends"
            className="w-[90%] md:w-[80%] h-auto rounded-2xl"
          />
        </div>

        <div
          className="w-full md:w-1/2 text-center animate-fadeOn"
          style={{ fontFamily: "VisitQatar-zh" }}
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-4">
            Something for Everyone
          </p>
          <p className="text-gray-800 text-sm sm:text-base md:text-lg px-4 md:px-8 mb-4">
            To make it easy to find an offer or package that gets you excited,
            we’ve put together the best offers for flights, resorts, restaurants
            and more. See them all in one place by choosing one of the following
            options:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to='/bestplaces'
             className="h-10 w-36 border-1 pt-1 border-gray-400 btn hover:bg-[#6888f2] hover:rounded-2xl hover:text-white transition">
              Hotels
            </Link>
            <Link to='/packages' 
             className="h-10 w-36 border-1 pt-1 border-gray-400 btn hover:bg-[#6888f2] hover:rounded-2xl hover:text-white transition">
              Experiences
            </Link>
          </div>
        </div>
      </div>
    <Places/>
  
    <div className="w-full my-20 px-4">
        <p
          className="font-bold text-2xl sm:text-3xl text-center"
          style={{ fontFamily: "VisitQatar-zh" }}
        >
          Why Choose Us ?
        </p>

        <div className="w-[90%] mx-auto flex flex-wrap justify-center gap-5 mt-10">
          {/* Card 1 */}
          <div className="bg-gray-300 w-full cursor-pointer sm:w-[45%] md:w-[22%] rounded-xl p-5 hover:scale-105 transition-transform duration-300">
            <SlCalender className="text-5xl mb-4 text-black" />
            <p className="font-bold tracking-wider">
              Book now, pay at the property
            </p>
            <p className="tracking-wider text-sm">
              Free cancellation on most rooms
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-300 w-full cursor-pointer sm:w-[45%] md:w-[22%] rounded-xl p-5 hover:scale-105 transition-transform duration-300">
            <FaThumbsUp className="text-5xl mb-4 text-green-800" />
            <p className="font-bold tracking-wider">
              300M+ reviews from fellow travellers
            </p>
            <p className="tracking-wider text-sm">
              Get trusted information from guests like you
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-300 w-full cursor-pointer sm:w-[45%] md:w-[22%] rounded-xl p-5 hover:scale-105 transition-transform duration-300">
            <MdOutlineTravelExplore className="text-5xl mb-4 text-blue-800" />
            <p className="font-bold tracking-wider">
              2+ million properties worldwide
            </p>
            <p className="tracking-wider text-sm">
              Hotels, guest houses, apartments, and more…
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-300 w-full cursor-pointer sm:w-[45%] md:w-[22%] rounded-xl p-5 hover:scale-105 transition-transform duration-300">
            <FcCustomerSupport className="text-6xl mb-4" />
            <p className="font-bold tracking-wider">
              Trusted customer service you can rely on, 24/7
            </p>
            <p className="tracking-wider text-sm">We're always here to help</p>
          </div>
        </div>
        
      </div>
<Cards/>
      <div className="w-full my-10 px-5">
        <p className="font-extrabold md:ms-20 text-2xl sm:text-3xl mb-5">
          Travel more, Spend less
        </p>

        <div className="w-[90%] mx-auto border border-gray-500 rounded-xl flex flex-col sm:flex-row justify-between items-center p-5 gap-5">
          <section className="w-full sm:w-2/3">
            <p className="font-bold text-lg mb-2">Sign in, Save money</p>
            <p className="text-sm sm:text-base mb-4">
              Save 10% or more at participating properties — just look for the
              blue Genius label
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to='/login' className="text-white font-bold bg-blue-700 h-10 w-24 flex justify-center items-center rounded hover:bg-blue-900">
                Sign in
              </Link>
              <Link to='/member' className="text-blue-800 font-bold h-10 w-24 flex justify-center items-center rounded border border-blue-800 hover:bg-blue-900 hover:text-white transition">
                Join
              </Link>
            </div>
          </section>

          <section className="text-7xl sm:text-8xl text-orange-700">
            <IoGiftSharp />
          </section>
        </div>
      </div>
 <div className="bg-gray-50 w-full py-10">
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
  {firstFour.map((pkg, index) => (
    <div
      key={index}
      className="bg-white border border-gray-300 p-2 pb-5 w-[90%] sm:w-[45%] md:w-[22%]"
    >
      <img
        src={`http://localhost:5000/uploads/${pkg.image}`}
        alt="Europe"
        className="h-3/4 w-full object-cover"
      />
      <div className="flex justify-between items-center mt-2">
        <span>
          <p className="font-medium font-poppins text-[clamp(11px,2.5vw,14px)]">
            {pkg.description}
          </p>
          <p className="text-blue-800 font-semibold text-[clamp(14px,3vw,20px)]">
            {pkg.price}
          </p>
        </span>

        <Link
          to="/packages"
          className="text-[clamp(9px,2vw,12px)] hover:text-[#6888f2]"
        >
          More packages
        </Link>
      </div>
    </div>
  ))}
</div>

    </div>
<Msg/>
<Footer/>
   </>
  )
}

export default Home

