import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { BsChevronLeft,BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const MovieList = ({ title, movies }) => {
    const sliderRef = useRef(null);
  
    const scrollSlider = (direction) => {
      if (sliderRef.current) {
        if (direction === 'left') {
          sliderRef.current.scrollLeft -= 500;
        } else if (direction === 'right') {
          sliderRef.current.scrollLeft += 500;
        }
      }
    };
  
  return (
    <div className="p-4">
      <h1 className=" text-white text-2xl md:text-3xl py-6">{title}</h1>
       
       {movies && movies.length > 8 && (
         <BsChevronLeft
         className="text-white  bg-black bg-opacity-75 rounded-full mt-24 font-extrabold hidden md:inline-block py-1 pr-1 md:text-3xl z-20  cursor-pointer opacity-75 hover:opacity-100 absolute"
         
          onClick={() => scrollSlider('left')}/>
       )}

      <div className="flex overflow-x-scroll scroll whitespace-nowrap scroll-smooth  scrollbar-hide" ref={sliderRef}>
        <div className="flex">
          {movies?.map((movie) => (
           <Link key={movie.id} to={"/watch"} > <MovieCard   title={movie.title} posterPath={movie.poster_path} /></Link>
          ))}
        </div>
     {movies && movies.length>8 && (
       <BsChevronRight 
       className="text-white bg-black bg-opacity-75 rounded-full mt-24 md:mt-28 hidden md:inline-block md:text-3xl py-1 pr-1 opacity-75 hover:opacity-100 ml-[82%] md:ml-[92%] font-extrabold cursor-pointer z-20 absolute"
       
        onClick={() => scrollSlider('right')}/>
     )}
      </div>
    </div>
  );
};

export default MovieList;
