import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing up...");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.post(`${backendUrl}/auth/signup`, formData);

      console.log("SIGNUP RESPONSE", response.data.message);

      if (response.status === 201) {
        toast.success(response.data.message || "Signup successful!");
        navigate("/signin");

        // Reset form data only on successful signup
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("SIGNUP ERROR:", error);

      if (error.response) {
        // Server responded with a status code outside 2xx range
        const status = error.response.status;
        if (status === 400) {
          toast.error(
            error.response.data.message || "Please fill all fields correctly!"
          );
        } else if (status === 409) {
          toast.error(error.response.data.message || "User already exists!");
        } else {
          toast.error(error.response.data.message || "Something went wrong!");
        }
      } else if (error.request) {
        // No response received from server
        toast.error("Server not responding! Please try again.");
      } else {
        // Other errors
        toast.error("An unexpected error occurred!");
      }
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="w-full mt-6 max-w-maxContent bg-[#000814] text-[#F1F2FF]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="md:w-[75%] flex flex-col gap-1">
            <p className="text-[14px] leading-[22px] text-[#F1F2FF] font-normal">
              First Name <span className="text-pink-300">*</span>
            </p>
            <input
              type="text"
              placeholder="Enter First Name"
              name="name"
              value={name}
              required
              onChange={changeHandler}
              className="w-full pl-3 h-12 rounded-md bg-[#161D29] placeholder:pl-2 border-b-[1px] border-[#F1F2FF]"
            />
          </label>
        </div>

        <label htmlFor="email" className="md:w-[75%] flex flex-col gap-1">
          <p className="text-[14px] leading-[22px] text-[#F1F2FF] font-normal">
            Email Address <span className="text-pink-300">*</span>
          </p>
          <input
            type="email"
            placeholder="Enter Email Address"
            name="email"
            value={email}
            required
            onChange={changeHandler}
            className="w-full pl-3 h-12 rounded-md bg-[#161D29] placeholder:pl-2 border-b-[1px] border-[#F1F2FF]"
          />
        </label>

        <div className="relative">
          <label
            htmlFor="password"
            className="md:w-[75%] flex flex-col relative"
          >
            <p className="text-[14px] leading-[22px] text-[#F1F2FF] font-normal mb-1">
              Create Password <span className="text-pink-300">*</span>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              value={password}
              required
              onChange={changeHandler}
              className="w-full pl-3 h-12 rounded-md bg-[#161D29] placeholder:pl-2 border-b-[1px] border-[#F1F2FF]00"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-9 right-2 cursor-pointer"
            >
              {showPassword ? (
                <FaRegEye fontSize={20} fill="#AFB2BF" />
              ) : (
                <FaRegEyeSlash fontSize={20} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="md:w-[73%] mt-6 rounded-[8px] bg-yellow-300 py-[8px] px-[12px] font-medium text-[#000814]"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUp;
