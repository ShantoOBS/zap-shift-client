import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {forgetPassword}=useAuth();

  const onSubmit = (data) => {
    forgetPassword(data.email)
    .then(()=>{
        toast("Check Your Email");
    })
    .catch(()=>{})

  };

  return (
    <div>
      <p className="text-2xl md:text-3xl font-bold">Forget Password</p>
      <p className="text-xs md:text-sm my-3">
        Enter your email to recover your password
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset w-full">

          {/* Email Input */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />

          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}

          <button
            type="submit"
            className="btn btn-neutral mt-5 bg-[#caeb66] text-black border-0"
          >
            Send Reset Link
          </button>
        </fieldset>
      </form>

      {/* Back to Login */}
      <p className="text-[#71717a] text-xs md:text-sm mt-4">
        Remember your password?{" "}
        <Link to="/login" className="text-black font-semibold link link-hover">
          Login
        </Link>
      </p>
    </div>
  );
}
