import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";   // ⬅ login link support

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordValue = watch("password");

  const onSubmit = (data) => {
    console.log("Register Data:", data);
  };

  return (
    <div>
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
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}

          {/* Email */}
          <label className="label ">Email</label>
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
          <input
            type="password"
            className="input"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                message:
                  "Must contain upper, lower, number, and special character",
              },
            })}
          />

          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}

          <button
            type="submit"
            className="btn btn-neutral mt-5 bg-[#caeb66] text-black border-0"
          >
            Register
          </button>
        </fieldset>
      </form>

      {/* LOGIN LINK BELOW FORM */}
      <p className="text-[#71717a] text-xs md:text-sm mt-3">
        Already have an account?{" "}
        <Link to="/login" className="text-black font-semibold link link-hover">
          Login
        </Link>
      </p>
      <p className="text-center my-2">or</p>
      {/* Google Register Button */}
      <button className="btn bg-white text-black border-[#e5e5e5] w-full">
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Register with Google
      </button>
    </div>
  );
}
