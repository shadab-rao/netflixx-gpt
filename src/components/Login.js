import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { bgImg, userImg } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputName, setInputName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: userImg,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const togglesignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="fixed">
        <img
          className="h-screen w-screen object-cover "
          alt="bg"
          src={bgImg}
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-8 md:p-12 w-[85%] md:w-[28%] bg-black bg-opacity-75 h-[510px] md:h-[570px] my-24 md:my-40 mx-auto right-0 left-0"
      >
        <h1 className="text-2xl md:text-3xl py-4 font-semibold text-white">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            value={inputName}
            placeholder="Full Name"
            className="p-3 my-2 w-full rounded-sm"
            onChange={(e) => setInputName(e.target.value)}
          />
        )}
        <input
          ref={email}
          type="text"
          value={inputEmail}
          placeholder="Email or phone number"
          className="p-3 my-2 w-full rounded-sm"
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <input
          ref={password}
          type="password"
          value={inputPassword}
          placeholder="Password"
          className="p-3 my-2 w-full rounded-sm"
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <p className="text-red-500 font-semibold py-2 text-sm">
          {errorMessage}
        </p>
        <button
          className="p-3  mt-6 bg-red-600 w-full mb-2 rounded-sm"
          onClick={() => handleButtonClick()}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <div className="flex justify-between py-1 mb-8">
          <div>
            <label className="text-sm px-1  text-gray-400">
              <input type="checkbox" className="border-none w-auto" />
              Remember Me
            </label>
          </div>
          <p className="text-gray-400 text-sm">Need help?</p>
        </div>

        <p
          className="py-2 md:py-6 font-semibold cursor-pointer text-white"
          onClick={() => togglesignInForm()}
        >
          {isSignInForm
            ? "New to Netflix? Sign up now"
            : "Already a User? Sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
