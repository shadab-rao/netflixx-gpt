import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bgImg } from "../utils/constant";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";



const WatchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const overView = useSelector(
    (store) => store.movies?.nowPlayingMovies?.[0]?.overview
  );
  const title = useSelector(
    (store) => store.movies?.nowPlayingMovies?.[0]?.original_title
  );
  const rating = useSelector(
    (store) => store.movies?.nowPlayingMovies?.[0]?.vote_average
  );
  const releaseDate = useSelector(
    (store) => store.movies?.nowPlayingMovies?.[0]?.release_date
  );
 
  window.scrollTo(0,0);

  const user = useSelector((store) => store.user);

  const handleClick = () => {
    navigate("/");
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/watch");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);



  return (
    <div>
      <div className="fixed -z-10">
        <img className="h-screen w-screen object-cover" alt="bg" src={bgImg} />
      </div>
      <div className=" px-2 md:px-8 flex justify-between bg-black bg-opacity-90 ">
        <img
          className="w-28 md:w-48 mx-0 cursor-pointer"
          alt="logo"
          src="./images/Netflix_Logo_PMS.png"
          onClick={()=>navigate("/")}
        />
        <AiOutlineHome
          className="z-10 text-white mt-[10px] md:mt-5 mr-4 text-[26px]  md:text-4xl cursor-pointer hover:text-red-600"
          onClick={handleClick}
        />
      </div>

      {user && (
        <div className="w-screen bg-black bg-opacity-90 h-screen">
          <iframe
            className=" w-full md:w-[70%] py-4 md:py-2 px-2 md:pl-12 h-[42%] md:h-[80%]"
            src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?"}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>

          <div className=" z-10 ml-4 md:ml-12 text-white mt-4 md:mt-6">
            <h1 className="text-2xl md:text-3xl">{title}</h1>
            <div className="py-2 flex">
              <div className="w-24 py-1 text-sm">
                <span className="text-md md:text-lg bg-green-500 px-1 rounded-sm ">☆</span>{" "}
                <span className="text-md md:text-lg"> {rating}</span>
              </div>
              <span className="bg-red-600 flex justify-center ml-10 items-center  px-2 text-sm md:text-[16px] md:px-3 rounded-md">
                Release
              </span>
              <span className="ml-2 mt-1 text-sm md:text-lg">{releaseDate}</span>
            </div>
            <div className="mt-8 -ml-[48px] pl-12 pt-0 md:pt-4  md:bg-black md:bg-opacity-90 w-screen md:h-60">
              <h1 className="text-xl md:text-2xl mb-2">Overview</h1>
              <p className="w-[98%] md:w-[49%] text-sm md:text-lg">{overView}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchPage;
