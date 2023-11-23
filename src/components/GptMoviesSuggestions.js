import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';
import { HashLoader } from "react-spinners";

const GptMoviesSuggestions = () => {
  const gpt = useSelector((store)=>store.gpt);
  const { movieResults,movieNames} = gpt;

  if(!movieNames) return null
  return ( 
    <div className=' mt-4  md:p-4 md:m-4 bg-black bg-opacity-90 text-white'>
      {movieNames.map((movieName,index)=><MovieList key={movieName} title={movieName} movies={movieResults[index]}/>)}
    </div>
  )
}

export default GptMoviesSuggestions