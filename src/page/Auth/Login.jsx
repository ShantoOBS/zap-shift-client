import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Social from "../../Compontens/Social";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import useAuth from "../../Hooks/useAuth";


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);
    const {signInUser}=useAuth();

    const location =useLocation();

    const navigate=useNavigate();

    console.log(location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email,data.password)
    .then(res=>{
        navigate(location.state || '/');
    })
    .catch(error=>{console.log(error)})
  };


  return (
    <div>
      <p className="text-2xl md:text-3xl font-bold">Welcome Back</p>
      <p className="text-xs md:text-sm mb-3">Login with ZapShift</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset w-full">

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}

          {/* Password */}
          <label className="label ">Password</label>
           <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input pr-10"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <span
                  className="absolute right-17 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                  onClick={togglePassword}
                >
                  {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </span>
              </div>

          {/* Password Errors */}
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}

          <div>
            <Link to="/forget" className="link link-hover">Forgot password?</Link>
          </div>

          <button
            type="submit"
            className="btn btn-neutral mt-4 bg-[#caeb66] text-black border-0"
          >
            Login
          </button>
        </fieldset>
      </form>

      <p className="text-[#71717a] text-xs md:text-sm">
        Don’t have any account?
          <Link state={location.state} to="/register" className="text-black font-semibold link link-hover">
          Register
        </Link>
      </p>

     <Social></Social>
    </div>
  );
}
