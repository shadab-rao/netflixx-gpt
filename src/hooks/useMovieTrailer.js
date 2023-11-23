import { useDispatch, useSelector } from "react-redux";
import { addtrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";

const useMovietrailer = (movieId)=>{
    const dispath = useDispatch();
    const movieTrailer = useSelector((store)=>store.movies.trailerVideo)

    useEffect(() => {
     !movieTrailer && getMovieVideos();
    }, []);
    
    const getMovieVideos = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/"+ movieId +"/videos?language=en-US",
        API_OPTIONS
      );
      const res = await data?.json();
      
  
      const filterData = res?.results?.filter((video) => video.type === "Trailer");
      const trailer = filterData?.length ? filterData[0] : res?.results[0];
      console.log(filterData)

      dispath(addtrailerVideo(trailer))
    };
}


export default useMovietrailer;