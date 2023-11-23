import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMoviesSuggestions from './GptMoviesSuggestions';
import { bgImg } from '../utils/constant';

const GptSearchPage = () => {
  return (
    <>
      <div className='fixed -z-10'>
      <img className='h-screen w-screen object-cover'
          alt="bg"
          src={bgImg}
        />
      </div>
     <div >
     <GptSearchBar/>
      <GptMoviesSuggestions/>
     </div>
    </>
  )
}

export default GptSearchPage;