import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineHome, AiFillCaretDown } from "react-icons/ai";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constant";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
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
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChnage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  return (
    <div className=" z-10 absolute px-2  md:px-8 flex  justify-between py-2 bg-gradient-to-b from-black w-[100%] ">
      <img className="w-28 md:w-48 mx-0 cursor-pointer" alt="logo" src="./images/Netflix_Logo_PMS.png" onClick={handleGptSearchClick}/>
      {user && (
        <div className="flex p-4 relative">
          {showGptSearch && (
            <select
              className="p-1 mb-2  md:p-2  m-2 bg-gray-900 opacity-75 border-none text-white rounded-md"
              onChange={handleLanguageChnage}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option value={lang.identifier} key={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="px-0 md:px-3 font-semibold opacity-90  text-white ml-2 rounded-md mr-0 text-2xl md:text-4xl  md:mr-5"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? (
              <AiOutlineHome className="mb-1 hover:text-red-500 md:mb-0"  />
            ) : (
              <AiOutlineSearch className="mb-0 hover:text-red-500 md:mb-0"  />
            )}
          </button>
          <img
            className=" hidden md:inline-block w-7 h-7 mt-2 md:mt-2 md:w-10 md:h-10 rounded-md "
            src={user?.photoURL}
            alt="userImage"
          />
          <button className="text-white mb-2 md:mb-0 ml-4 md:ml-8  " onClick={toggleDropDown}>
            <AiFillCaretDown className="md:mt-0 mt-1 hover:text-red-500" />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-10 md:mt-16">
              <button
                onClick={handleSignOut}
                className=" font-semibold px-3 py-2 md:py-2 md:px-4 text-[12px] md:text-sm  bg-red-600 text-white  rounded-md">
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
