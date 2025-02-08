import React from "react";
import sp from "../assets/signup.png";
import SignUp from "../Components/Core/Auth/SignUp";
const Signin = () => {
  return (
    <div class="w-[85%] mx-auto min-h-[80vh] grid-cols-1 flex flex-col-reverse  md:grid md:grid-cols-2 place-items-center p-2 ">
      <div>
        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-[#F1F2FF]">
            Join the Excitement!
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
            <span className="text-[#F1F2FF]">
              Sign up now to be part of the event!
            </span>{" "}
            <span className="font-serif font-bold italic text-[#47A5C5]">
              Get access to exclusive updates and features.
            </span>
          </p>
        </div>
        <SignUp />
      </div>
      <img
        src={sp}
        alt="signup"
        height={10}
        className="mb-10 md:h-[500px]"
        loading="lazy"
      />
    </div>
  );
};

export default Signin;
