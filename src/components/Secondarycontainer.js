import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const Secondarycontainer = () => {
  const movies = useSelector((store)=>store.movies)
  return (
    movies.nowPlayingMovies && (
    <div className='bg-black'>
     <div className=' mt-0 md:-mt-52 ml-2 md:pl-12 relative z-20'>
     <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Top Rated"} movies={movies.topRated}/>
      <MovieList title={"Popular"} movies={movies.popularMovies}/>
      <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}/>
      <MovieList title={"Web Series"} movies={movies.webSeries}/>
     </div>
    </div>
    )
  )
}

export default Secondarycontainer