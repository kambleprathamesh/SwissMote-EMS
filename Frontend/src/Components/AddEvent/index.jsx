import React from "react";

import RenderForm from "./Render";
export const AddEvent = () => {
  return (
    <div className="  overflow-x-hidden h-auto w-full   text-white flex justify-start space-x-20  ">
      <div className="w-[60%]">
        <h1 className="text-3xl font-bold text-white mb-2">Add Event</h1>
        <div>
          <RenderForm />
        </div>
      </div>
      <div className="w-[40%] h-3/4  bg-[#161D29] border-[1px] border-[#2C333F] rounded-md p-4 flex flex-col gap-y-4">
        <h1 className="font-inter text-lg font-semibold">
          ⚡Course Upload Tips
        </h1>
        <ol className="w-full flex flex-col gap-y-2 font-inter text-sm font-medium list-disc pl-6">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>
            Add Topics in the Course Builder section to create lessons, quizzes,
            and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up on the course
            single page.
          </li>
          <li>Make Announcements to notify any important</li>
          <li>Notes to all enrolled students at once.</li>
        </ol>
      </div>
    </div>
  );
};
