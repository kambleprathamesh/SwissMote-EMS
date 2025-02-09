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
          ⚡Event Upload Tips
        </h1>
        <ol className="w-full flex flex-col gap-y-2 font-inter text-sm font-medium list-disc pl-6">
          <li>Set the event date and time.</li>
          <li>Use a 1024x576 image size.</li>
          <li>Provide a clear event description.</li>
          <li>Manage organizers in the Event Organizer section.</li>
          <li>Add sessions to break the event into parts.</li>
          <li>Additional data shows on the event page.</li>
          <li>Use announcements for important updates.</li>
          <li>Send notes to all participants.</li>
        </ol>
      </div>
    </div>
  );
};
