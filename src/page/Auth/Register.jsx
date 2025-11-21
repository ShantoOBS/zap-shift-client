import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // react icons
import useAuth from "../../Hooks/useAuth";
import Social from "../../Compontens/Social";

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const { registerUser } = useAuth()

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    registerUser(data.email, data.password)
      .then(res => {
        console.log(res);
      })
      .catch(error => { console.log(error) })
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <p className="text-2xl md:text-3xl font-bold">Create an Account</p>
      <p className="text-xs md:text-sm mb-3">Register with ZapShift</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset w-full">

          {/* Full Name */}
          <label className="label">Full Name</label>
          <input
            type="text"
            className="input"
            placeholder="Your Name"
            {...register("name", { required: "Full Name is required" })}
          />
          {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}

          {/* Password with React Icon toggle */}
          <label className="label">Password</label>
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
              className="absolute right-8 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={togglePassword}
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </span>
          </div>
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}

          <button
            type="submit"
            className="btn btn-neutral mt-5 bg-[#caeb66] text-black border-0 w-full"
          >
            Register
          </button>
        </fieldset>
      </form>

      {/* LOGIN LINK */}
      <p className="text-[#71717a] text-xs md:text-sm mt-3">
        Already have an account?{" "}
        <Link to="/login" className="text-black font-semibold link link-hover">
          Login
        </Link>
      </p>

      <Social></Social>
    </div>
  );
}
