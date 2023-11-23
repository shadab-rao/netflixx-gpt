import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openAi";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";
import {HashLoader} from "react-spinners";


const GptSearchBar = () => {
  const [loading, setLoading] = useState(false);
  const langKey = useSelector((store)=>store.config.lang);
  const searchtext = useRef(null);
  const dispatch = useDispatch();

  const handleSearchClicks = async()=>{
    setLoading(true)
    const gptQuery = "Act like a Movie Recommendations system and suggest some movies for the query: " + searchtext.current.value + ". only give me names of 8 movies, comma seperated like the example given ahead. Example Result: Gadar, Sholay, Jawan, Pathan ,Tiger";

    try {
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",")

    const promiseArray = gptMovies?.map((movie)=>searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    

    dispatch(addGptMovieResult({movieNames:gptMovies, movieResults:tmdbResults}));
  }
    catch (error) {
      console.error('Error in search:', error);
    } finally {
      setLoading(false); // Set loading to false when search is complete
    }
   
  }
  

  // search movie in TMDB
  const searchMovieTMDB = async(movie)=>{
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&page=1',API_OPTIONS);
    const res = await data?.json();
    return res?.results;
  }
  

 
  
  return (
    <div className=" pt-[40%] md:pt-[12%] flex justify-center ">
      <form className="w-[96%] md:w-1/2 bg-black flex rounded-md bg-opacity-75" onSubmit={(e)=>e.preventDefault()}>
        <input
        ref={searchtext}
          type="text"
          className="p-[9px] text-[14px] md:text-md w-[80%] md:p-4 m-4 rounded-md"
          placeholder={lang[langKey]?.gptSearchPlaceholder}
        />
        <button className=" py-1 m-4 px-7 md:py-2  md:px-10 bg-red-600 text-white rounded-md" onClick={handleSearchClicks}>
          {lang[langKey]?.search}
        </button>
      </form>
      {loading && (
        <div className="flex items-center flex-col justify-center absolute top-0 left-0 w-full h-full bg-black bg-opacity-75">
          <p className="text-sm mx-4 md:mx-0 md:text-2xl font-semibold text-white mt-10 md:-mt-4 mb-2 md:mb-6">Please wait  it takes time while fetching a movie data</p>
          <HashLoader color='#ff0000' size={58} />
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;
