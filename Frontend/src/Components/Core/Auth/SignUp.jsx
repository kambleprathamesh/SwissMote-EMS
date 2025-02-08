// import ToggleButton from "../../Common/ToggleButton";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    };

    // Reset form data
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="w-full mt-6 max-w-maxContent bg-[#000814] text-[#F1F2FF]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="w-[75%] flex flex-col gap-1">
            <p className="text-[14px] leading-[22px] text-[#F1F2FF] font-normal">
              First Name <span className="text-pink-300">*</span>
            </p>
            <input
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              value={firstName}
              required
              onChange={changeHandler}
              className="w-full pl-3 h-12 rounded-md bg-[#161D29] placeholder:pl-2 border-b-[1px] border-[#F1F2FF]"
            />
          </label>
        </div>

        <label htmlFor="email" className="w-[75%] flex flex-col gap-1">
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
          <label htmlFor="password" className="w-[75%] flex flex-col relative">
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
          className="w-[73%] mt-6 rounded-[8px] bg-yellow-300 py-[8px] px-[12px] font-medium text-[#000814]"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUp;

// richblack: {
//   5: "#F1F2FF",
//   25: "#DBDDEA",
//   50: "#C5C7D4",
//   100: "#AFB2BF",
//   200: "#999DAA",
//   300: "#838894",
//   400: "#6E727F",
//   500: "#585D69",
//   600: "#424854",
//   700: "#2C333F",
//   800: "#161D29",
//   900: "#000814",
// },
