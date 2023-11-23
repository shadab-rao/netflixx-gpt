import React from 'react';
import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import Secondarycontainer from './Secondarycontainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import useWebSeries from '../hooks/useWebSeries';
import GptSearchPage from './GptSearchPage';
import { useSelector } from 'react-redux';

const Browse = () => {
  const showGptSearch = useSelector(store=>store.gpt.showGptSearch);
 
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useWebSeries();

  return (
    <div>
      <Header/>
      {
        showGptSearch ?  <GptSearchPage/> :
         <>
         <MainContainer/>
         <Secondarycontainer/>
         </>
      }
     
      
    </div>
  )
}

export default Browse