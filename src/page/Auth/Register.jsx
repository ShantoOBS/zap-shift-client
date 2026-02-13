import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // react icons
import useAuth from "../../Hooks/useAuth";
import Social from "../../Compontens/Social";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const { registerUser,updateUser } = useAuth();

  const navigate=useNavigate();
  const location=useLocation();

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = (data) => {
    const file = data.photo[0];
    registerUser(data.email, data.password)
      .then(res => {
         
           const formData = new FormData();
            formData.append("image", file);
             const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_FIREBASE_IMAGE_KEY}`;
              axios.post(url, formData)
              .then(res=>{
                    const photo=res.data.data.url;
                    const userData={
                        displayName:data.name,
                        photoURL:photo,
                    }

                    updateUser(userData)
                    .then(()=>{
                        console.log("profile update successfuly");
                        toast.success("Account Created");
                        navigate(location.state || '/')
                    })


              })
      })
      .catch(error => { console.log(error) })
  };

  return (
    <div className="w-full md:max-w-md mx-auto ">
      <p className="text-2xl md:text-3xl font-bold">Create an Account</p>
      <p className="text-xs md:text-sm mb-3">Register with ZapShift</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset w-full">

          {/* Full Name */}
          <label className="label ">Full Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Your Name"
            {...register("name", { required: "Full Name is required" })}
          />
          {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
         <label className="label">Photo</label>
          <input type="file"
          {...register("photo", { required: "Photo is required" })}
          className="file-input file-input-ghost" />

          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}

          {/* Password with React Icon toggle */}
          <label className="label">Password</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              className="input pr-10 w-full"
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
      <p className="text-[#71717a] text-xs md:text-sm my-3">
        Already have an account?{" "}
        <Link state={location.state}
        to="/login" className="text-black font-semibold link link-hover">
          Login
        </Link>
      </p>

      <Social></Social>
    </div>
  );
}
