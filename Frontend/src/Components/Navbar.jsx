import { useState, useEffect } from "react";
import { Link, matchPath } from "react-router-dom";

import { useLocation } from "react-router-dom";

import ProfileDropDown from "../Components/Core/Auth/ProfileDropDown";

import { AiOutlineMenu } from "react-icons/ai";

import { AiOutlineShoppingCart } from "react-icons/ai";
function Navbar() {
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  useEffect(() => {}, []);

  function matchRoute(route) {
    return matchPath({ path: route }, location.pathname);
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-[#2C333F] ${
        location.pathname !== "/home" ? "bg-[#161D29]" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/home">
          <h1 className="text-xl font-black text-white">EVENT SPHERE</h1>
        </Link>

        {/* Login / Signup / Dashboard */}
        <div className="hidden md:flex items-center gap-x-4">
          {token === null && (
            <Link to="/login">
              <button className="rounded-md border border-[#2C333F] bg-[#161D29] px-3 py-2 text-[#AFB2BF] cursor-pointer">
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-md border border-[#2C333F] bg-[#161D29] px-3 py-2 text-[#AFB2BF] cursor-pointer">
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
        <button className="md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
