import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Pages/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

function Login({ accountType }) {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormdata] = useState({ email: "", password: "" });

  // Redirect if already logged in
  useEffect(() => {
    if (auth?.token) {
      navigate("/feed");
    }
  }, [auth, navigate]);

  const handleOnChange = (e) => {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = accountType;
    const signinData = { ...formData, role };
    const toastId = toast.loading("Signing in...");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
        signinData
      );
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message || "Login successful!");
        localStorage.setItem("user", JSON.stringify(response.data));
        setAuth(response.data);
        navigate("/feed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="w-full mt-6 max-w-maxContent bg-[#000814] text-[#F1F2FF]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] text-[#F1F2FF]">
            Email Address <span className="text-pink-300">*</span>
          </p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
            required
            placeholder="Enter Email"
            className="w-full rounded-md bg-[#161D29] p-[12px] text-[#F1F2FF] border-b-[1px]"
          />
        </label>

        {accountType != "guest" && (
          <div className="relative">
            <label className="w-full">
              <p className="mb-1 text-[0.875rem] text-[#F1F2FF]">
                Password <span className="text-pink-300">*</span>
              </p>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                required
                placeholder="Enter Password"
                className="w-full rounded-md bg-[#161D29] p-[12px] pr-12 text-[#F1F2FF] border-b-[1px]"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-2 cursor-pointer"
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
          className="rounded-md bg-[#FFD60A] py-[8px] px-[12px] font-medium text-[#000814]"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
