import React from "react";
import { useSelector } from "react-redux";
import useMovietrailer from "../hooks/useMovieTrailer";


const Videobackground = ({movieId}) => {
    const trailerVideo = useSelector((store)=>store.movies?.trailerVideo);
    // console.log(trailerVideo)

    useMovietrailer(movieId)
   
  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?&autoplay=1&mute=1&loop=1&controls=0"}
        title="YouTube video player"
        // frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default Videobackground;
