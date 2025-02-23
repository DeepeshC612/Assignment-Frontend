import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config/config";
import Load from "../components/Loading";
import { toast } from "react-toastify";
import { userlogin } from "../services/apiService";

function UserLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUserLogin = async (userData) => {
    try {
      const { data } = await userlogin(userData);
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    handleUserLogin(data);
  };

  if (loading) return <Load />;

  return (
    <div className="bg-gray-50 h-screen">
      <div className="g-6 flex h-full flex-wrap items-center justify-center mx-10">
        <div className="wrapper shadow-2xl rounded-lg mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 bg-white p-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6">
              Login
            </h1>
            <div className="flex flex-row items-center justify-center">
              <p className="mb-0 mr-4 text-base">
                Please enter your Email and Password for login
              </p>
            </div>
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
            <div className="relative mb-6  mt-10" data-te-input-wrapper-init>
              <input
                {...register("userEmail", { required: true, maxLength: 40 })}
                type="email"
                className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-purple-500"
                placeholder="Email address"
              />
            </div>

            <div className="relative mb-6" data-te-input-wrapper-init>
              <input
                {...register("userPassword", { required: true })}
                type="password"
                className="peer block min-h-[auto] w-full rounded border border-gray-400 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-purple-500"
                placeholder="Password"
              />
            </div>

            <div className="mb-6 flex items-center justify-between">
              <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]"></div>
              <h1 className="cursor-pointer" onClick={() => {}}>
                Forgot password?
              </h1>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="p-2 px-8 rounded-md text-white font-semibold bg-gradient-to-tl from-indigo-600 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Login
              </button>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
              <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
                Don't have an account ?
                <Link to={"/signup"}>
                  <button className="ml-1 text-[16px] underline text-blue-700 transition duration-150 ease-in-out hover:text-indigo-600 focus:text-pink-600 active:text-blue-700">
                    Register
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
export default UserLogin;
