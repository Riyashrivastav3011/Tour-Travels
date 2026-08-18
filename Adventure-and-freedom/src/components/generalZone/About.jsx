import React from 'react'
import Choose from '../../images/member.jpg'
import '../../App'
import Msg from './Message'
import Header from './Header'
import Footer from './Footer'
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate(); 

  return (
    <>
    <Header/>
    <div className='my-10 px-4 md:px-10'>
      <p className='text-2xl font-bold text-gray-700 font-mono mb-5'>Know More About Us</p>
      <div className='flex flex-col md:flex-row gap-5'>
        
        {/* Sidebar */}
        <div className='w-full md:w-1/4 py-5 border max-h-[550px] border-gray-600 rounded'>
          <p className='mb-3 text-xl font-mono ms-3'>Quick Links</p>
          <ul className='list-none'>
            {['International Holidays', 'Indian Holidays', 'Africa Tour Packages', 'Australia Tour Packages', 'Europe Tour Packages', 'Char Dham package', 'Manali tour', 'Leh Ladakh', 'Uttarakhand', 'HongKong', 'Turkish', 'Flight Booking', 'Hotel Booking', 'Offers'].map((item, index) => (
              <li key={index} className='h-6 mx-2 my-2 cursor-pointer bg-gray-200 text-sm rounded ps-3 hover:bg-gray-700 hover:text-white' 
              onClick={() => navigate('/packages')} >{item}</li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className='w-full md:w-3/4 animate-fadeIn'>
          <img src={Choose} className='w-full md:w-[95%] h-auto mx-auto rounded mb-5'/>
          <p className='font-bold mb-2'>OUR ORGANISATION</p>
                 <p>SOTC Travel Limited (Formerly SOTC Travel Pvt. Ltd.) is a step-down subsidiary of Fairfax 
        Financial Holdings Group; held through its Indian listed subsidiary, Thomas Cook (India) 
        Limited (TCIL). SOTC India is a leading travel and tourism company active across various 
        travel segments including Leisure Travel, Incentive Travel and Business Travel.</p>
    <p>SOTC was established in 1949. Since then, it has escorted lakhs of travelers across the globe          for more than 70 years to various destinations around the world. It is one of the leaders in          segments, namely Escorted Group Tours, Customised Holidays, Holidays of India and Incentive          Travel amongst others. SOTC’s customer focus, innovation and operational excellence has not          only tapped the existing market potential but has also created new markets through innovative          packages. Its vast array of holiday services is taking holidaying to an entirely new level. A          new age innovative holiday maker, SOTC strives to make holidays a priority for every Indian.          Through investments in technology and with a strong online presence the company serves its           customers through an omni-channel play.</p>
         </div>
      </div>
      <Msg />
    </div>
    <Footer/>
    </>
  )
}

export default About