import React, { useState } from "react";
import Login from "../Components/Core/Auth/Login";
import login from "../assets/login.avif";
import ToggleButton from "../Components/Toggle";

const tabData = [
  {
    id: 1,
    tabName: "Guest Login",
    role: "guest",
  },
  {
    id: 2,
    tabName: "Normal User",
    role: "normal",
  },
];

const Signin = () => {
  const [role, setRole] = useState("normal");
  const [accountType, setAccountType] = useState("normal");
  console.log(accountType);

  return (
    <div class="w-[85%] mx-auto min-h-[80vh] grid-cols-1 flex flex-col-reverse  md:grid md:grid-cols-2 place-items-center  ">
      <div>
        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-[#F1F2FF]">
            Welcome Back
          </h1>
          <p className="mt-2 text-[1.125rem] leading-[1.625rem]">
            <span className="text-[#F1F2FF]">Join the event hassle-free!</span>{" "}
            <span className="font-serif font-bold italic text-[#47A5C5]">
              Log in to access exclusive content and stay updated.
            </span>
          </p>
        </div>
        <ToggleButton
          tabData={tabData}
          field={accountType}
          setRole={setAccountType}
        />
        <Login accountType={accountType} />
      </div>
      <img
        src={login}
        alt="login"
        height={10}
        className="mb-5 pt-2 h-[300px]  md:h-[500px]"
        loading="lazy"
      />
    </div>
  );
};

export default Signin;
