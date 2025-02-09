import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import Upload from "./Upload";
import { toast } from "react-hot-toast";
import axios from "axios";

const CourseInformation = () => {
  const [isPaid, setIsPaid] = useState(false);
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (file) => {
    console.log("handle iamge called");
    console.log("FILE", file);
    setImage(file);
    console.log("IMAGE aafter setimage", image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("HANDLE SUBMIT CALLED");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (image) {
      data.append("image", image); // Ensure the key matches the backend (e.g., "image")
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);
    console.log("Token:", token);
    console.log("FormData Entries:", [...data.entries()]);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/event/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Event created successfully!");
      } else {
        toast.error(response.data.message || "Failed to create event.");
      }
      console.log("Event Created:", response.data);
    } catch (error) {
      toast.error("Error creating event. Please try again.");
      console.error("Error creating event:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-[#161D29] rounded-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Event Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          className="p-3 bg-gray-800 text-white rounded-md"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Event Description"
          className="p-3 bg-gray-800 text-white rounded-md"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          className="p-3 bg-gray-800 text-white rounded-md [&::-webkit-calendar-picker-indicator]:invert"
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          className="p-3 bg-gray-800 text-white rounded-md [&::-webkit-calendar-picker-indicator]:invert"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Event Location"
          className="p-3 bg-gray-800 text-white rounded-md"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Event Capacity"
          className="p-3 bg-gray-800 text-white rounded-md"
          onChange={handleChange}
        />
        <input
          type="url"
          name="registrationLink"
          placeholder="Registration Link"
          className="p-3 bg-gray-800 text-white rounded-md"
          onChange={handleChange}
        />
        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            name="isPaid"
            className="w-5 h-5 accent-blue-500"
            onChange={(e) => {
              setIsPaid(e.target.checked);
              handleChange(e);
            }}
          />
          Is Paid
        </label>
        {isPaid && (
          <input
            type="number"
            name="ticketPrice"
            placeholder="Ticket Price"
            className="p-3 bg-gray-800 text-white rounded-md"
            onChange={handleChange}
          />
        )}
        <input
          type="text"
          name="duration"
          placeholder="Event Duration"
          className="p-3 bg-gray-800 text-white rounded-md"
          onChange={handleChange}
        />
        <input
          type="text"
          name="tags"
          placeholder="Event Tags"
          className="p-3 bg-gray-800 text-white rounded-md"
          onChange={handleChange}
        />
        <input
          type="text"
          name="hostContact"
          placeholder="Host Contact"
          className="p-3 bg-gray-800 text-white rounded-md"
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Event Category"
          className="p-3 bg-gray-800 text-white rounded-md"
          onChange={handleChange}
        />

        <div className="col-span-2">
          <Upload
            name="image"
            label="Upload Event Image"
            onUpload={handleImageUpload} // This function will handle the image upload
          />
        </div>
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 p-3 bg-yellow-500 text-yellow-900 font-semibold rounded-md"
      >
        Create Event <MdNavigateNext />
      </button>
    </form>
  );
};

export default CourseInformation;
