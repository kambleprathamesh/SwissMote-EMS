// import React from "react";

// const EventCard = ({ event }) => {
//   return (
//     <div className="p-6 bg-[#161D29] rounded-md space-y-4 text-white">
//       {event.image && (
//         <img
//           src={event.image}
//           alt={event.title || "Event Image"}
//           className="w-full h-48 object-cover rounded-md"
//         />
//       )}
//       <h2 className="text-2xl font-bold">{event.title || "Untitled Event"}</h2>
//       <p className="text-gray-300">
//         {event.description || "No description available."}
//       </p>
//       <div className="grid grid-cols-2 gap-4">
//         <p>
//           <strong>Date:</strong> {event.date || "TBA"}
//         </p>
//         <p>
//           <strong>Time:</strong> {event.time || "TBA"}
//         </p>
//         <p>
//           <strong>Location:</strong> {event.location || "Not specified"}
//         </p>
//         <p>
//           <strong>Capacity:</strong> {event.capacity || "Unlimited"}
//         </p>
//         {event.isPaid && (
//           <p>
//             <strong>Ticket Price:</strong> ₹{event.ticketPrice}
//           </p>
//         )}
//         <p>
//           <strong>Duration:</strong> {event.duration || "Not specified"}
//         </p>
//         <p>
//           <strong>Category:</strong> {event.category || "General"}
//         </p>

//         <p>
//           <strong>Host Contact:</strong> {event.hostContact || "Not available"}
//         </p>
//       </div>
//       {event.registrationLink && (
//         <a
//           href={event.registrationLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-block mt-4 p-3 bg-yellow-500 text-yellow-900 font-semibold rounded-md text-center"
//         >
//           Register Now
//         </a>
//       )}
//     </div>
//   );
// };

// export default EventCard;

const EventCard = ({ event, onClick }) => {
  return (
    <div
      className="bg-gray-800 text-white p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition"
      onClick={onClick}
    >
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-2">{event.title}</h2>
      <p className="text-gray-300">📅 {event.date}</p>
      <p className="text-gray-300">📍 {event.location}</p>
    </div>
  );
};

export default EventCard;
