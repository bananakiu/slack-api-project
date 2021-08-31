import axios from "axios";
import { API } from '../../App'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ErrorDisplay from "../common/ErrorDisplay";

const Signup = (props) => {
  const { register, handleSubmit } = useForm();
  const [ newUser, setNewUser ] = useState({});
  const [ errors, setErrors ] = useState([]);

  const onSubmit = (data) => {
    let errorList = [];

    // create user obj
    let createdUser = {
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    }

    // handle errors
    errorList = handleErrors(createdUser, errorList);
    setErrors(errorList);

    if (errorList.length === 0) {
      // ! TEMP: alert (turn into nicer alerts)
      alert("User successfully created!");

      // save user obj
      setNewUser(createdUser);

      // POST to server
      axios({
        method: "POST",
        url: `${API}/api/v1/auth/`,
        data: createdUser,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error(error);
      })
      props.handleCreateAccount();
    }
  }

  const handleErrors = (createdUser, errorList) => {
    if (createdUser.password.length < 6) {
      errorList.push("Password must be at least 6 characters long.");
    }

    if (createdUser.password_confirmation !== createdUser.password) {
      errorList.push("Password and confirm password do not match.")
    }

    return errorList;
  }

  return <>
    <form onSubmit={handleSubmit(onSubmit)} className="
    flex flex-col justify-cetner items-center
    py-4 px-6
    w-96
    border-2
    ">
      <h1 className="
      self-start
      text-2xl font-bold
      mb-2
      ">
        Sign Up
        </h1>
      {errors.length>0 &&
        <div className="
        flex flex-col justify-center items-center
        w-full mb-4
        ">
          <ErrorDisplay errors={errors}/>
        </div>
      }
      <div className="
      flex flex-col justify-center items-center
      mb-4
      w-full
      ">
        <label htmlFor="email" className="self-start">Email</label>
        <input {...register("email")} type="email" placeholder="Email" className="
        rounded-md
        w-full
        "/>
      </div>
      <div className="
      flex flex-col justify-center items-center
      w-full mb-4
      ">
        <label htmlFor="password" className="self-start">Password</label>
        <input {...register("password")} type="password" placeholder="Password" className="
        rounded-md
        w-full
        "/>
      </div>
      <div className="
      flex flex-col justify-center items-center
      w-full mb-4
      ">
        <label htmlFor="password_confirmation" className="self-start">Confirm Password</label>
        <input {...register("password_confirmation")} type="password" placeholder="Password" className="
        rounded-md
        w-full
        "/>
      </div>

      <div className="
      flex justify-between items-center
      w-full
      ">
        <button className="
        py-2 px-4 mt-2 rounded
        bg-blue-500 hover:bg-blue-700
        text-white font-bold
        ">
          Create
        </button>
        <div className="
        text-blue-500 hover:text-blue-700
        font-bold text-sm
        cursor-pointer
        " onClick={props.handleLogin}>
          Already have an account?
        </div>
      </div>      
    </form>
    <p>{JSON.stringify(newUser)}</p> {/* TEMP */}
  </>;
};

export default Signup;
