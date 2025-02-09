// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import EventCard from "../Components/EventCard/EventCard";

// function Feeds() {
//   const [events, setEvents] = useState([]);
//   const [upcomingEvents, setUpcomingEvents] = useState([]);
//   const [pastEvents, setPastEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     category: "",
//     startDate: "",
//     endDate: "",
//   });

//   const navigate = useNavigate();

//   // Fetch Events with Filters
//   const fetchEvents = async () => {
//     try {
//       setLoading(true);
//       const params = {
//         category: filters.category || undefined,
//         startDate: filters.startDate || undefined,
//         endDate: filters.endDate || undefined,
//       };

//       const upcomingRes = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/filter`,
//         {
//           params: { ...params, status: "upcoming" },
//         }
//       );

//       const pastRes = await axios.get("http://your-api-url.com/api/events", {
//         params: { ...params, status: "past" },
//       });

//       setUpcomingEvents(upcomingRes.data.events);
//       setPastEvents(pastRes.data.events);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // Handle filter changes
//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="p-6 text-white">
//       <h1 className="text-3xl font-bold mb-6">Events</h1>

//       {/* Filters Section */}
//       <div className="flex flex-wrap gap-4 mb-6 bg-gray-800 p-4 rounded-lg">
//         <input
//           type="text"
//           name="category"
//           value={filters.category}
//           onChange={handleFilterChange}
//           placeholder="Category"
//           className="bg-gray-700 text-white px-4 py-2 rounded-md"
//         />
//         <input
//           type="date"
//           name="startDate"
//           value={filters.startDate}
//           onChange={handleFilterChange}
//           className="bg-gray-700 text-white px-4 py-2 rounded-md"
//         />
//         <input
//           type="date"
//           name="endDate"
//           value={filters.endDate}
//           onChange={handleFilterChange}
//           className="bg-gray-700 text-white px-4 py-2 rounded-md"
//         />
//         <button
//           onClick={fetchEvents}
//           className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
//         >
//           Apply Filters
//         </button>
//       </div>

//       {/* Upcoming Events */}
//       <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
//       {loading ? (
//         <div>Loading...</div>
//       ) : upcomingEvents.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {upcomingEvents.map((event) => (
//             <EventCard
//               key={event._id}
//               event={event}
//               onClick={() => navigate(`/dashboard/event/${event._id}`)}
//             />
//           ))}
//         </div>
//       ) : (
//         <p>No upcoming events.</p>
//       )}

//       {/* Past Events */}
//       <h2 className="text-2xl font-semibold mt-8 mb-4">Past Events</h2>
//       {loading ? (
//         <div>Loading...</div>
//       ) : pastEvents.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {pastEvents.map((event) => (
//             <EventCard
//               key={event._id}
//               event={event}
//               onClick={() => navigate(`/dashboard/event/${event._id}`)}
//             />
//           ))}
//         </div>
//       ) : (
//         <p>No past events.</p>
//       )}
//     </div>
//   );
// }

// export default Feeds;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventCard from "../Components/EventCard/EventCard";

function Feeds() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  // Fetch Events with Filters
  const fetchEvents = async () => {
    try {
      setLoading(true);

      // Extract token from localStorage (assuming token is inside a user object)
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (!token) {
        console.error("No token found, user might not be authenticated.");
        setLoading(false);
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // Remove empty or undefined parameters
      const params = Object.fromEntries(
        Object.entries({
          category: filters.category,
          startDate: filters.startDate,
          endDate: filters.endDate,
          status: "upcoming",
        }).filter(([_, value]) => value)
      );

      // Fetch upcoming events
      const upcomingRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/event/filter`,
        {
          params,
          headers,
        }
      );

      // Fetch past events
      const pastRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/event/filter`,
        {
          params: { ...params, status: "past" },
          headers,
        }
      );

      setUpcomingEvents(upcomingRes.data.events || []);
      setPastEvents(pastRes.data.events || []);
    } catch (error) {
      console.error(
        "Error fetching events:",
        error?.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Events</h1>

      {/* Filters Section */}
      <div className="flex flex-wrap gap-4 mb-6 bg-gray-800 p-4 rounded-lg">
        <input
          type="text"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          placeholder="Category"
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
        />
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
        />
        <button
          onClick={fetchEvents}
          className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      {/* Upcoming Events */}
      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
      {loading ? (
        <div>Loading...</div>
      ) : upcomingEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onClick={() => navigate(`/dashboard/event/${event._id}`)}
            />
          ))}
        </div>
      ) : (
        <p>No upcoming events.</p>
      )}

      {/* Past Events */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Past Events</h2>
      {loading ? (
        <div>Loading...</div>
      ) : pastEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onClick={() => navigate(`/dashboard/event/${event._id}`)}
            />
          ))}
        </div>
      ) : (
        <p>No past events.</p>
      )}
    </div>
  );
}

export default Feeds;
