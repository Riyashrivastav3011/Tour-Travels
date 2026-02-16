import React from 'react'
import { PiAirplaneTiltFill } from "react-icons/pi";

function Message() {
  return (
    <>
  <div>
    <div className="toast toast-top mt-50">
  <div className="alert flex bg-[#BEDDF1] border border-gray-600 animate-bounce">
    <span className='font-bold'>Plan Your trip with Us</span><span><PiAirplaneTiltFill className='text-xl text-gray-700' /></span>
  </div>
  <div className="alert bg-[#ffc8a5] border border-gray-600 animate-pulse">
    <span className='font-medium italic'>“Life is short and the world is wide.” <br/> Find Yourself</span>
  </div>
</div>
  </div>
    </>
  )
}

export default Message