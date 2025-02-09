import React from "react";
import IconBtn from "./IconBtn";

const CommonModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-[#6E727F] bg-[#161D29] p-6">
        <p className="text-2xl font-semibold text-[#F1F2FF]">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-[#999DAA]">{modalData?.text2}</p>
        <div className="flex items-center gap-x-4">
          {/* Cancel button (closes modal) */}
          <button
            className="cursor-pointer rounded-md bg-[#999DAA] py-[8px] px-[20px] font-semibold text-[#000814]"
            onClick={modalData?.btn1Handler} // Now correctly assigned
          >
            {modalData?.btn1Text}
          </button>

          {/* Logout button (triggers logout) */}
          <IconBtn
            onClick={modalData?.btn2Handler}
            text={modalData?.btn2Text}
          />
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
