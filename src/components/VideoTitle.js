import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlay } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
const VideoTitle = ({title, overview}) => {
  const navigate = useNavigate();

 
  return (
    <div className='pt-[44%] md:pt-[15%] px-3 md:px-20 absolute text-white bg-gradient-to-r from-black w-screen aspect-video'>
      <h1 className='text-[28px] ml-2 md:ml-0 md:text-6xl font-bold py-2 px-4 shadow-x' >{title}</h1>
      <p className='text-lg hidden md:inline-block w-[35%] p-6 shadow-xl'>{overview}</p>
      <div className='px-6 py-2 flex'>
      <button onClick={()=>navigate("/watch")} className='bg-white text-sm md:text-md font-bold mr-3 md:mr-2  text-black py-2 md:py-3 px-8 md:px-10 hover:bg-opacity-80 flex items-center rounded-md'>  <FaPlay/>Play</button>
        <button 
        className='bg-gray-500 md:text-md text-sm font-semibold bg-opacity-50 
         text-white gap-1 hover:bg-opacity-40 py-2 md:py-3 px-4 md:px-10 rounded-md flex items-center'>
          <FaInfoCircle size={20}/>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle