import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function EnterCode() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  // create 6 refs for OTP boxes
  const inputsRef = useRef([]);

  const onSubmit = (data) => {
    const otp = Object.values(data).join("");
    console.log("OTP:", otp);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    // accept only 1 digit
    if (!/^[0-9]?$/.test(value)) return;

    setValue(`digit${index}`, value);

    // move to next box
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace: go to previous box
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div>
      <p className="text-2xl md:text-3xl font-bold">Verification Code</p>
      <p className="text-xs md:text-sm my-3">
        Enter the 6-digit code sent to your email
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 justify-between w-full my-4">

          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="w-10 h-12 border border-gray-300 rounded text-center text-xl font-semibold"
              {...register(`digit${index}`, {
                required: true,
                pattern: /^[0-9]$/,
              })}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        {errors.digit0 ||
        errors.digit1 ||
        errors.digit2 ||
        errors.digit3 ||
        errors.digit4 ||
        errors.digit5 ? (
          <p className="text-red-500 text-xs">Please enter all 6 digits</p>
        ) : null}

        <button
          type="submit"
          className="btn btn-neutral mt-4 bg-[#caeb66] text-black border-0 w-full"
        >
          Verify Code
        </button>
      </form>

      <p className="text-[#71717a] text-xs md:text-sm mt-3">
        Didn’t receive the code?{" "}
        <button className="text-black font-semibold link link-hover">
          Resend
        </button>
      </p>

      <p className="text-[#71717a] text-xs md:text-sm mt-1">
        <Link to="/login" className="text-black font-semibold link link-hover">
          Back to Login
        </Link>
      </p>
    </div>
  );
}
