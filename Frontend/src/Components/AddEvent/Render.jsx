import React from "react";
import CourseInformation from "./CourseInformation";

const RenderForm = () => {
  return (
    <div className="p-6 bg-[#161D29] rounded-md space-y-6 overflow-y-auto max-h-[1000vh] custom_scrollbar body">
      <CourseInformation />
    </div>
  );
};

export default RenderForm;
