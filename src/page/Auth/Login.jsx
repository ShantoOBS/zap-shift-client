import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Social from "../../Compontens/Social";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useAuth from "../../Hooks/useAuth";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#056873] focus:outline-none focus:ring-2 focus:ring-[#056873]/20";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then(() => {
        navigate(location.state?.from?.pathname || "/", { replace: true });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full md:max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
        Welcome back
      </h1>
      <p className="mt-1 text-sm text-gray-500">Sign in with ZapShift</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={inputClass}
            placeholder="you@example.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`${inputClass} pr-12`}
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
          <div className="mt-2">
            <Link
              to="/forget"
              className="text-sm text-[#056873] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#caeb66] py-3 text-sm font-semibold text-black shadow-sm transition-colors hover:bg-[#b8d95a]"
        >
          Sign in
        </button>
      </form>

      <p className="my-3 text-center text-sm text-gray-500">
        Don’t have an account?{" "}
        <Link
          state={location.state}
          to="/register"
          className="font-semibold text-[#056873] hover:underline"
        >
          Register
        </Link>
      </p>

      <Social className="" />
    </div>
  );
}
