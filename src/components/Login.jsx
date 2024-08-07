import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "@/utils/userSlice";
import { BG_URL, PHOTO_AVATAR_URL } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const handleButtonClick = () => {
    const message = checkValidateData(email.current.value, password.current.value);
    setErrorMsg(message);
    if (message) return;

    if (!isSignIn) {
      console.log("signing started");
      // For Signup
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current.value, // updating name
            photoURL: PHOTO_AVATAR_URL,
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
              // Profile updated!
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              setErrorMsg(error);
            });

          console.log(user);
          console.log("signing succesfully");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(`${errorCode} - ${errorMessage}`);
        });
    } else {
      console.log("loggin starting");
      //for SignIn
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          console.log("loginned successfully");
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(`Wrong Id or Password`);
        });
    }
  };

  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full"
          src={BG_URL}
          alt=""
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-10 text-white bg-black bg-opacity-70 w-11/12 sm:w-3/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex flex-col">
          <h1 className="text-3xl mb-4 font-bold ">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignIn && (
            <input
              ref={fullName}
              type="text"
              className="p-4 rounded-sm bg-black border-[1px] my-2 "
              placeholder="Full Name"
            />
          )}
          <input
            ref={email}
            type="text"
            className="p-4 rounded-sm bg-black border-[1px] my-2 "
            placeholder="Email"
          />
          <input
            ref={password}
            type="password"
            className="p-4 rounded-sm bg-black border-[1px] my-2 "
            placeholder="Password"
          />
          <p className="text-red-500 text-sm">{errorMsg}</p>
          <button
            onClick={handleButtonClick}
            className="bg-red-600 rounded-sm p-2 my-2"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <h1>
            {isSignIn ? "New To Netflix?" : "Ready to watch"}

            <span
              onClick={toggleSignIn}
              className="hover:underline cursor-pointer "
            >
              {" "}
              {isSignIn ? "Sign Up Now" : "Sign In Now"}
            </span>
          </h1>
        </div>
      </form>
    </div>
  );
};

export default Login;
