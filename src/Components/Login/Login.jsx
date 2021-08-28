import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (data) => setResult(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="Username" />
      <input {...register("password")} type="password" placeholder="Password" />

      <p>{JSON.stringify(result)}</p>
      <button>Login</button>
    </form>
  );
};

export default Login;
