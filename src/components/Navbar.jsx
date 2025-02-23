import React from "react";
import ReviewLogo from "../assets/Review_RATE_LOGO.png";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="wrapper shadow-lg flex justify-between items-center h-20 px-20 max-sm:px-10 bg-white">
      <div className="text-2xl font-semibold cursor-pointer -ml-10">
        <Link to={"/"}>
          <img
            src={ReviewLogo}
            alt="Review-And-Rating-Logo"
            style={{ height: 70, width: 225, objectFit: "cover" }}
          />
        </Link>
      </div>
      <div className="flex items-center justify-between gap-1">
        <button
          onClick={logOut}
          className="hover:bg-purple-500 hover:text-white p-1 px-6 rounded-md"
        >
          Log out➞
        </button>
      </div>
    </div>
  );
}

export default Navbar;
