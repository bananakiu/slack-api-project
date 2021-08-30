import axios from "axios";
import { API } from '../../App'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [ user, setUser ] = useState({});

  const onSubmit = (data) => {
    // create user obj
    let loggedInUser = {
      "email": data.username,
      "password": data.password,
    }
    // save user obj
    setUser(loggedInUser);

    // POST to server
    axios.post(
      `https://${API}/api/v1/auth/sign_in`,
      loggedInUser,
    ).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.error(error);
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Username" />
      <input {...register("password")} type="password" placeholder="Password" />

      <p>{JSON.stringify(user)}</p>
      <button>Login</button>
    </form>
  );
};

export default Login;
