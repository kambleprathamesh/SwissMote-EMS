import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
function Login({ accountType }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(login(formData.email, formData.password, navigate));
  };

  return (
    <div className="w-full mt-6 max-w-maxContent bg-[#000814] text-[#F1F2FF]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-[#F1F2FF]">
            Email Address <span className="text-pink-300">*</span>
          </p>
          <input
            type="email"
            placeholder="Enter Email Address"
            name="email"
            required
            value={formData.email}
            onChange={handleOnChange}
            className="w-full rounded-md bg-[#161D29] p-[12px] text-[#F1F2FF] border-b-[1px] border-richblack-300"
          />
        </label>
        {accountType != "guest" && (
          <div className="relative">
            <label className="w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-[#F1F2FF]">
                Password <span className="text-pink-300">*</span>
              </p>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                required
                className="w-full rounded-md bg-[#161D29] p-[12px] pr-12 text-[#F1F2FF] border-b-[1px] border-richblack-300"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute bottom-0 right-3 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <FaRegEye fontSize={24} fill="#AFB2BF" />
                ) : (
                  <FaRegEyeSlash fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
          </div>
        )}

        <button
          type="submit"
          className="rounded-[8px] bg-[#FFD60A] py-[8px] px-[12px] font-medium text-[#000814]"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
