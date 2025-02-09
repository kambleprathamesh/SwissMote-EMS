import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Replace this with an actual API call to fetch event details by ID
    const allEvents = [
      {
        id: 1,
        image:
          "https://res.cloudinary.com/demo/image/upload/v1699999999/sample.jpg",
        title: "Tech Conference 2025",
        description:
          "An event showcasing the latest advancements in technology.",
        date: "2025-03-15",
        time: "10:00 AM",
        location: "Mumbai Convention Center",
        capacity: 500,
        isPaid: true,
        ticketPrice: 999,
        duration: "4 hours",
        category: "Technology",
        tags: "AI, ML, Cloud Computing",
        hostContact: "+91 9876543210",
        registrationLink: "https://example.com/register",
      },
      {
        id: 2,
        image:
          "https://res.cloudinary.com/demo/image/upload/v1699999999/sample.jpg",
        title: "AI Workshop",
        description: "A hands-on workshop on Artificial Intelligence.",
        date: "2025-04-10",
        time: "11:00 AM",
        location: "Pune Tech Park",
        capacity: 300,
        isPaid: false,
        ticketPrice: 0,
        duration: "3 hours",
        category: "AI",
        tags: "AI, Deep Learning, Data Science",
        hostContact: "+91 9123456789",
        registrationLink: "https://example.com/register",
      },
    ];

    const selectedEvent = allEvents.find((e) => e.id === parseInt(id));
    setEvent(selectedEvent);
  }, [id]);

  if (!event)
    return <div className="text-white text-center p-6">Loading...</div>;

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
          📅 <strong>Date:</strong> {event.date}
        </p>
        <p>
          ⏰ <strong>Time:</strong> {event.time}
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
          🔖 <strong>Tags:</strong> {event.tags}
        </p>
        <p>
          📞 <strong>Contact:</strong> {event.hostContact}
        </p>
        <p>
          🎟️ <strong>Tickets:</strong>{" "}
          {event.isPaid ? `₹${event.ticketPrice}` : "Free"}
        </p>
      </div>
      <a
        href={event.registrationLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
      >
        Register Now
      </a>
    </div>
  );
};

export default EventDetails;
