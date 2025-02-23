import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config/config";
import { toast } from "react-toastify";
import Load from "../components/Loading";
import { userSignup } from "../services/apiService";

function UserRegistration() {
  const navigate = useNavigate();
  const [userError, setUserError] = useState();
  const [loading, setLoading] = useState(false);

  const handleUserRegistration = async (userData) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("profilePic", userData.profilePic[0]);
    formData.append("phoneNum", userData.phoneNum);
    formData.append("userCity", userData.userCity);
    formData.append("userEmail", userData.userEmail);
    formData.append("userPassword", userData.userPassword);
    formData.append("userState", userData.userState);
    formData.append("userName", userData.userName);

    try {
      const { data } = await userSignup(formData);
      toast.success(data?.message);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleUserRegistration(data);
  };

  if (loading) return <Load />;

  return (
    <div className="bg-gray-50 h-full">
      <div className="g-6 flex h-full flex-wrap items-center justify-center mx-10">
        <div className="wrapper mt-20 shadow-2xl rounded-lg mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 bg-white p-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6">
              Sign Up
            </h1>
            <div className="flex flex-row items-center justify-center">
              <p className="mb-0 mr-4 text-base items-center">
                Please enter your details for sign up
              </p>
            </div>

            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
            <div className="relative mb-6  mt-10">
              <input
                {...register("userName", { required: "Full Name is required" })}
                type="text"
                className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none "
                placeholder="Full Name"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm">
                  {errors.userName.message}
                </p>
              )}
            </div>

            <div className="relative mb-6">
              <input
                {...register("userEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none"
                placeholder="Email"
              />
              {errors.userEmail && (
                <p className="text-red-500 text-sm">
                  {errors.userEmail.message}
                </p>
              )}
            </div>
            <div className="relative mb-6">
              <input
                {...register("userPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none "
                placeholder="Password"
              />
              {errors.userPassword && (
                <p className="text-red-500 text-sm">
                  {errors.userPassword.message}
                </p>
              )}
            </div>
            <div className="relative mb-6">
              <input
                {...register("phoneNum", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
                type="tel"
                className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none"
                placeholder="Phone Number"
              />
              {errors.phoneNum && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNum.message}
                </p>
              )}
            </div>
            <div className="relative mb-6">
              <input
                {...register("profilePic", {
                  required: "Profile Picture is required",
                })}
                type="file"
                className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none"
                placeholder=""
              />
              {errors.profilePic && (
                <p className="text-red-500 text-sm">
                  {errors.profilePic.message}
                </p>
              )}
            </div>
            <div className="relative mb-6">
              <select
                {...register("userCity", { required: "Please select a city" })}
                type="text"
                className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none  text-neutral-500 h-11"
              >
                <option value="Indore">Indore</option>
                <option value="Indore">Lucknow</option>
                <option value="Indore">Bangalore</option>
                <option value="Indore">Mumbai</option>
                <option value="Indore">Dehli</option>
              </select>
              {errors.userCity && (
                <p className="text-red-500 text-sm">
                  {errors.userCity.message}
                </p>
              )}
            </div>
            <div className="relative mb-6">
              <select
                {...register("userState", {
                  required: "Please select a state",
                })}
                type="text"
                className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 text-neutral-500 h-11"
              >
                <option className="" value="Madhya Pradesh">
                  Madhya Pradesh
                </option>
                <option value="Madhya Pradesh">Uttar Pradesh</option>
                <option value="Madhya Pradesh">Karnataka</option>
                <option value="Madhya Pradesh">Maharashtra</option>
                <option value="Madhya Pradesh">Dehli</option>
              </select>
              {errors.userState && (
                <p className="text-red-500 text-sm">
                  {errors.userState.message}
                </p>
              )}
            </div>

            <div className="mb-5 flex items-center justify-between">
              <div className="block min-h-[1rem] pl-[1.5rem]"></div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="p-2 px-8 rounded-md text-white font-semibold bg-gradient-to-tl from-indigo-600 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Sign Up
              </button>
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
              <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
                Already have an account ?
                <Link to={"/login"}>
                  <button className="ml-1 text-[16px] underline text-blue-700 transition duration-150 ease-in-out hover:text-indigo-600 focus:text-pink-600 active:text-blue-700">
                    Login
                  </button>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserRegistration;
