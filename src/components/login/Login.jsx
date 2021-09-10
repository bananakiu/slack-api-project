import axios from "axios";
import { API } from '../../App'
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import ErrorDisplay from "../common/ErrorDisplay";
import { StatesContext } from "../../App";
import Fireside from '../Assets/Fireside.png';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [ errors, setErrors ] = useState([]);

  const { 
    setLoginUser,
    setLoginHeaders,
    openPage
  } = useContext(StatesContext);

  const onSubmit = (data) => {
    let errorList = [];

    // create user obj
    let loggedInUser = {
      "email": data.email,
      "password": data.password,
    }

    // handle errors
    errorList = handleErrors(loggedInUser, errorList);

    // POST to server
    axios.post(
      `${API}/api/v1/auth/sign_in`,
      loggedInUser,
    ).then((response) => {
      // save headers
      setLoginUser(response.data.data);
      setLoginHeaders(response.headers);
    }).catch((error) => {
      // console.error(error.response.data.errors); // ! TEMP
      errorList.push(...error?.response?.data?.errors);
      setErrors(errorList);
    }).then(() => {
      if (errorList.length === 0) {
        // login (change visible components)
        openPage("dashboard");
      }
    })
  }

  const handleErrors = (loggedInUser, errorList) => {
    // if (createdUser.password.length < 6) {
    //   errorList.push("Password must be at least 6 characters long.");
    // }

    // if (createdUser.password_confirmation !== createdUser.password) {
    //   errorList.push("Password and confirm password do not match.")
    // }

    return errorList;
  }


return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-gradient-to-b from-purple-300 to-purple-500 min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
          <div className="-mt-12 self-start hidden lg:flex flex-col  text-black">
            <h1 className="mb-3 font-bold text-6xl">Hi, there! 👋</h1>
            <h1 className="ml-1 mt-2 mb-2 font-bold text-2xl">Welcome back to Fireside.</h1>
            <p className="ml-1 mt-2 pr-3 text-gray-800 text-1xl font-semibold">
              We're looking forward to hearing your stories.
            </p>
          </div>
        </div>

        <div className="ml-12 flex justify-center self-center z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="flex flex-col items-center justify-center align-center mb-5">
              <div className="mb-1 h-14 w-14"> 
                <img src={Fireside}/>
              </div>
              <p className="mt-1 italic text-gray-500 text-center">
                "A chat a day, keeps the loneliness away"
              </p>
              {errors.length > 0 &&
                <div className="mt-3 -mb-4">
                  <ErrorDisplay errors={errors}/>
                </div>
              }
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type=""
                  placeholder="johndoe@gmail.com"
                ></input>
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Password
                </label>
                <input
                  {...register("password")}
                  className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="password"
                  placeholder="Enter your password"
                ></input>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 focus:ring-blue-400 border-gray-300 rounded"
                  ></input>
                  <label className="ml-2 block text-sm text-gray-800">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-green-400 hover:text-green-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="-mb-7 w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Login
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
              <span className="mt-2">Don't have an account?</span>
              <br />
              <a
                href="#"
                className="-mt-5 font-bold text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300"
                onClick={() => openPage("signup")}
              >
                Sign up
              </a>
            </div>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <span>
                Copyright © 2021-2022
                <a
                  href=""
                  rel=""
                  target="_blank"
                  title=""
                  className="text-green hover:text-green-500 "
                ></a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;