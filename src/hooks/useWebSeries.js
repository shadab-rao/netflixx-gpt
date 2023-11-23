import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addWebSeries } from "../utils/moviesSlice";
import { useEffect } from "react";

const useWebSeries = () => {
  const dispatch = useDispatch();
  const webSeries = useSelector((store)=>store.movies.webSeries)
  const getWebSeries = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/popular?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addWebSeries(json.results));
  };

  useEffect(() => {
   !webSeries && getWebSeries();
  }, []);
};


export default useWebSeries;
