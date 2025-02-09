import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventCard from "../Components/EventCard/EventCard";

function Feeds() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); // New state for filtered events
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  // Fetch Events (Both default and filtered)
  const fetchEvents = async (applyFilters = false) => {
    try {
      setLoading(true);

      // Extract token from localStorage
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

      // Remove empty/undefined filters
      const params = Object.fromEntries(
        Object.entries({
          category: filters.category,
          startDate: filters.startDate,
          endDate: filters.endDate,
        }).filter(([_, value]) => value)
      );

      if (applyFilters) {
        // Fetch filtered events when filters are applied
        const filteredRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/event/filter`,
          { params, headers }
        );
        setFilteredEvents(filteredRes.data.events || []);
      } else {
        // Fetch default events (upcoming and past)
        const [upcomingRes, pastRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/event/filter`, {
            params: { status: "upcoming" },
            headers,
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/event/filter`, {
            params: { status: "past" },
            headers,
          }),
        ]);

        setUpcomingEvents(upcomingRes.data.events || []);
        setPastEvents(pastRes.data.events || []);
        setFilteredEvents([]); // Reset filtered events when no filters are applied
      }
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
    fetchEvents(); // Fetch default events on mount
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Generate Filter Title
  const getFilterTitle = () => {
    if (filters.startDate && filters.endDate) {
      return `Events from ${filters.startDate} to ${filters.endDate}`;
    } else if (filters.category) {
      return `Category: ${filters.category}`;
    }
    return "Filtered Events";
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Events</h1>

      {/* Filters Section */}
      {/* <div className="flex flex-wrap gap-4 mb-6 bg-gray-800 p-4 rounded-lg">
        <input
          type="text"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          placeholder="Category"
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
        />
        <label htmlFor="">
          Start Date
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="bg-gray-700 text-white px-4 py-2 rounded-md"
          />
        </label>

        <label htmlFor="">
          End Date
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="bg-gray-700 text-white px-4 py-2 rounded-md"
          />
        </label>

        <button
          onClick={() => fetchEvents(true)}
          className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div> */}

      <div className="flex flex-wrap gap-4 mb-6 bg-gray-800 p-4 rounded-lg">
        <label className="flex flex-col text-gray-300 text-sm font-medium">
          Category
          <input
            type="text"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            placeholder="Enter category"
            className="bg-gray-700 text-white px-4 py-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring focus:ring-blue-500 mt-1"
          />
        </label>

        <label className="flex flex-col text-gray-300 text-sm font-medium">
          Start Date
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="bg-gray-700 text-white px-4 py-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring focus:ring-blue-500 mt-1"
          />
        </label>

        <label className="flex flex-col text-gray-300 text-sm font-medium ">
          End Date
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="bg-gray-700 text-white px-4 py-2 rounded-md w-full sm:w-64 focus:outline-none focus:ring focus:ring-blue-500 mt-1"
          />
        </label>

        <button
          onClick={() => fetchEvents(true)}
          className="h-10 bg-yellow-400 px-6 py-2 rounded-md text-yellow-900 font-semibold hover:bg-yellow-700 hover:text-yellow-300 transition duration-200 mt-6"
        >
          Apply Filters
        </button>
      </div>

      {/* Filtered Events Section (Visible only if filters return results) */}
      {filteredEvents.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">{getFilterTitle()}</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onClick={() => navigate(`/dashboard/event/${event._id}`)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Upcoming Events */}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Upcoming Events</h2>
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
