import axios from "axios";
import { API } from '../../App'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ErrorDisplay from "../common/ErrorDisplay";

const Login = (props) => {
  const { register, handleSubmit } = useForm();
  const [ user, setUser ] = useState({});
  const [ errors, setErrors ] = useState([]);

  const onSubmit = (data) => {
    let errorList = [];

    // create user obj
    let loggedInUser = {
      "email": data.username,
      "password": data.password,
    }

    // handle errors
    errorList = handleErrors(loggedInUser, errorList);

    // POST to server
    axios.post(
      `${API}/api/v1/auth/sign_in`,
      loggedInUser,
    ).then((response) => {
      console.log(response);
      console.log(response.data);
      console.log(response.data.data);
      
      // save headers
      props.setLoginHeaders(response.headers);

    }).catch((error) => {
      console.error(error.response.data.errors); // ! TEMP
      errorList.push(...error.response.data.errors);
      setErrors(errorList);
    }).then(() => {
      if (errorList.length === 0) {
        // save user obj
        setUser(loggedInUser);

        // login (change visible components)
        props.openPage("dashboard");
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
      <div className="py-6">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-2xl">
          <div className="hidden lg:block lg:w-1/2 bg-cover" style={{backgroundImage: "url('https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fG9mZmljZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80')"}}></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">Slack App Logo here</h2>
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
            {errors.length > 0 &&
              <div className="mt-2">
                <ErrorDisplay errors={errors}/>
              </div>
            }
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input {...register("username")} placeholder="Username" className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"/>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input {...register("password")} type="password" placeholder="Password" className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"/>
            </div>
            <div className="mt-8">
              <button className="bg-purple-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-purple-400">Login</button>
            </div>
            <div className="mt-8">
                <button type="button" className="bg-purple-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-purple-400" onClick={() => props.openPage("signup")}>Signup</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;

