import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("password");

  const onSubmit = (data) => {
    console.log("Reset Password Data:", data);
  };

  return (
    <div>
      <p className="text-2xl md:text-3xl font-bold">Reset Password</p>
      <p className="text-xs md:text-sm my-3">
        Set your new password below
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset w-full">

          {/* New Password */}
          <label className="label">New Password</label>
          <input
            type="password"
            className="input"
            placeholder="Enter new password"
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

          {/* Confirm Password */}
          <label className="label mt-3">Confirm Password</label>
          <input
            type="password"
            className="input"
            placeholder="Confirm new password"
            {...register("confirmPassword", {
              required: "Confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </span>
          )}

          <button
            type="submit"
            className="btn btn-neutral mt-5 bg-[#caeb66] text-black border-0"
          >
            Reset Password
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
