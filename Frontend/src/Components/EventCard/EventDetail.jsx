import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Extract token from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;
        if (!token) {
          throw new Error("User not authenticated. No token found.");
        }

        // Fetch event details
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/event/filter`,
          {
            params: { eventId: id },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success && response.data.events.length > 0) {
          setEvent(response.data.events[0]); // ✅ Correctly setting event
        } else {
          throw new Error("Event not found.");
        }
      } catch (err) {
        setError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div className="text-white text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-6">{error}</div>;
  }

  if (!event) {
    return <div className="text-white text-center p-6">Event not found.</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-64 object-cover rounded-md"
      />
      <h2 className="text-3xl font-bold mt-4">{event.title}</h2>
      <p className="mt-2 text-gray-300">{event.description}</p>
      <div className="mt-4 space-y-2">
        <p>
          📅 <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p>
          ⏰ <strong>Time:</strong> {new Date(event.date).toLocaleTimeString()}
        </p>
        <p>
          📍 <strong>Location:</strong> {event.location}
        </p>
        <p>
          ⏳ <strong>Duration:</strong> {event.duration}
        </p>
        <p>
          🏷️ <strong>Category:</strong> {event.category}
        </p>
        <p>
          🔖 <strong>Tags:</strong> {event.tags?.join(", ") || "N/A"}
        </p>
        <p>
          🎟️ <strong>Tickets:</strong>{" "}
          {event.isPaid ? `₹${event.ticketPrice}` : "Free"}
        </p>
      </div>
      {event.registrationLink && (
        <a
          href={event.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
        >
          Register Now
        </a>
      )}
    </div>
  );
};

export default EventDetails;
