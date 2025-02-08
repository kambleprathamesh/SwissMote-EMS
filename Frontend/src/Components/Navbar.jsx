import { Link, useLocation } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import ProfileDropDown from "../Components/Core/Auth/ProfileDropDown";
import { useAuth } from "../Pages/AuthContext";

function Navbar() {
  const location = useLocation();
  const { auth } = useAuth();
  const token = auth?.token;
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
          {!token ? (
            <>
              <Link to="/signin">
                <button className="rounded-md border border-[#2C333F] bg-[#161D29] px-3 py-2 text-[#AFB2BF] cursor-pointer">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-md border border-[#2C333F] bg-[#161D29] px-3 py-2 text-[#AFB2BF] cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropDown />
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
