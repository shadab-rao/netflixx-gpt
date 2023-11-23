import React from 'react'

const VideoTitle = ({title, overview}) => {

 
  return (
    <div className=' pt-[24%] md:pt-[18%] px-2 md:px-20 absolute text-white bg-gradient-to-r from-black w-screen aspect-video'>
      <h1 className='text-[28px] ml-2 md:ml-0 md:text-6xl font-bold py-2 px-4 shadow-x'>{title}</h1>
      <p className='text-lg hidden md:inline-block w-[35%] p-6 shadow-xl'>{overview}</p>
      <div className='px-6 py-2'>
        <button className='bg-white text-sm md:text-md font-bold  md:mr-2  text-black py-2 md:py-3 px-8 md:px-10 hover:bg-opacity-80  rounded-md'>Play</button>
        <button className='bg-gray-500 text-md hidden md:inline-block font-semibold bg-opacity-50 text-white hover:bg-opacity-40  py-3 px-10 rounded-md'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle