import axios from 'axios';
import { API } from '../../App';
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import ErrorDisplay from '../common/ErrorDisplay';
import { StatesContext } from '../../App';
import Fireside from '../Assets/Fireside.png';

const Signup = () => {
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
    let createdUser = {
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    };

    // handle errors
    errorList = handleErrors(createdUser, errorList);

    // POST to server
    axios({
      method: 'POST',
      url: `${API}/api/v1/auth/`,
      data: createdUser,
    }).then((response) => {
      // console.log(response); // ! TEMP
      // set headers
      setLoginUser(response.data.data)
      setLoginHeaders(response.headers);
    }).catch((error) => {
      // console.log(error?.response?.data?.errors?.full_messages) // ! TEMP
      errorList.push(...error?.response?.data?.errors?.full_messages);
      setErrors(errorList);
    }).then(() => {
      if (errorList.length === 0) {
        // show relevant pages
        openPage("dashboard");

        // ! TEMP: alert (turn into nicer alerts)
        alert('User successfully created! You are logged in!');
      }
    });
  };

  const handleErrors = (createdUser, errorList) => {
    // if (createdUser.password.length < 6) {
    //   errorList.push("Password must be at least 6 characters long.");
    // }

    // if (createdUser.password_confirmation !== createdUser.password) {
    //   errorList.push("Password and confirm password do not match.")
    // }

    return errorList;
  };

  return <>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-gradient-to-b from-purple-300 to-purple-500 min-h-screen sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
            <div className="-mt-12 self-start hidden lg:flex flex-col  text-black">
              <h1 className="mb-3 font-bold text-5xl">Thanks for the interest in our app! 🙏</h1>
              <h1 className="ml-1 mt-2 mb-2 font-bold text-2xl">It seems like you haven't registered...</h1>
              <p className="ml-1 mt-2 pr-3 text-gray-800 text-1xl font-semibold">
                Please do register in the form found on the right to hop right in Fireside!
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
                “Life is either a daring adventure or nothing at all.”
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
                  type="email"
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
              <div className="space-y-2">
                <label htmlFor='password_confirmation' className="text-sm font-medium text-gray-700 tracking-wide">
                  Confirm Password
                </label>
                <input
                {...register('password_confirmation')}
                className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                type='password'
                placeholder='Please retype your password'></input>
              </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="mt-7 -mb-7 w-full flex justify-center bg-purple-600  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Create
                </button>
              </div>
              <div className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                <a
                  href="#"
                  className="mt-5 font-bold text-green-500 hover:text-indigo-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                  onClick={() => openPage("login")}
                >
                  Already have an account?
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
  </>
};

export default Signup;

/* <h1
className='
self-start
text-2xl font-bold
mb-2
'
>
Sign Up
</h1>
{errors.length > 0 && (
<div
  className='
flex flex-col justify-center items-center
w-full mb-4
'
>
  <ErrorDisplay errors={errors} />
</div>
)}
<div
className='
flex flex-col justify-center items-center
mb-4
w-full
'
>
<label htmlFor='email' className='self-start'>
  Email
</label>
<input
  {...register('email')}
  type='email'
  placeholder='Email'
  className='
rounded-md
w-full
'
/>
</div>
<div
className='
flex flex-col justify-center items-center
w-full mb-4
'
>
<label htmlFor='password' className='self-start'>
  Password
</label>
<input
  {...register('password')}
  type='password'
  placeholder='Password'
  className='
rounded-md
w-full
'
/>
</div>
<div
className='
flex flex-col justify-center items-center
w-full mb-4
'
>
<label htmlFor='password_confirmation' className='self-start'>
  Confirm Password
</label>
<input
  {...register('password_confirmation')}
  type='password'
  placeholder='Password'
  className='
rounded-md
w-full
'
/>
</div>

<div
className='
flex justify-between items-center
w-full
'
>
<button
  className='
py-2 px-4 mt-2 rounded
bg-blue-500 hover:bg-blue-700
text-white font-bold
'
>
  Create
</button>
<div
  className='
text-blue-500 hover:text-blue-700
font-bold text-sm
cursor-pointer
'
  onClick={() => openPage('login')}
>
  Already have an account?
</div>
</div> */