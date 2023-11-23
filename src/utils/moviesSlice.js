import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        topRated: null,
        upcomingMovies: null,
        webSeries: null,
        trailerVideo: null
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies:(state,action)=>{
            state.popularMovies = action.payload;
        },
        addTopRatedMovies:(state,action)=>{
            state.topRated = action.payload;
        },
        addUpcomingMovies:(state,action)=>{
            state.upcomingMovies = action.payload;
        },
        addWebSeries:(state,action)=>{
            state.webSeries = action.payload;
        },
        addtrailerVideo: (state,action)=>{
            state.trailerVideo = action.payload;
        },
    }
});

export const {addNowPlayingMovies , addtrailerVideo, addPopularMovies,addTopRatedMovies,addUpcomingMovies,addWebSeries} = moviesSlice.actions;
export default moviesSlice.reducer;