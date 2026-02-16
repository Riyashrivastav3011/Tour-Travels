import React from 'react'
import Choose from '../../images/choose.jpg'
import Msg from './Message'
import Register from './Register'
import '../../App.css'
import Header from './Header'
import Footer from './Footer'



function Member() {
  return (
    <>
    <Header/>
    <div className='md:flex md:p-5 py-10 justify-around  bg-cover' style={{ backgroundImage: `url(${Choose})`, backgroundAttachment:"fixed" }} >
      {/* Left section  */}
      <div className='w-full md:w-1/2 '>
        <div className="backdrop-blur-md mx-auto items-center animate-fadeIn md:w-100 bg-white/10 border my-25  border-white/20 rounded-xl p-8 w-full shadow-lg">
         <p className="text-black text-xl font-bold">"Not a member yet? Sign up today and turn your travel dreams into reality!"</p>
         <p className="text-black text-xl font-bold">"Travel isn’t just about places, it’s about experiences. Start yours today!"</p>
         <ul className='font-medium'>
          <li>Personalized Travel Plans: Get itineraries tailored just for you.</li>
          <li>Exclusive Offers: Access discounts on hotels, flights, and tours.</li>
          <li>Save & Share Favorites: Keep your dream destinations in one place.</li>
          <li>Connect with Travelers: Share tips, stories, and inspiration with our community.</li>
          <li>Early Access: Be the first to discover new destinations and event.</li>
         </ul>
        </div>
        </div>
      <div className="w-[90%] mx-auto  px-5 md:mx-20 md:px-10  py-5 my-18 animate-fadeIn bg-gray-300 rounded-2xl max-h-fit  md:w-1/2"
     style={{
       boxShadow: "0 4px 30px rgba(255, 255, 255, 0.5)"
     }}
>
  <Register />
</div>
<Msg/>
    </div>
    <Footer/>
    </>
  )
}

export default Member
