

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
