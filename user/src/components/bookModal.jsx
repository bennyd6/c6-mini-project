import "./bookModal.css";

export default function BookModal({ event, onClose, onBook }) {
  if (!event) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Book Ticket for {event.title}</h2>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p><strong>Venue:</strong> {event.location}</p>
        <p><strong>Organizer:</strong> {event.organizerId?.name || "Unknown"}</p>
        <p><strong>Available Tickets:</strong> {event.availableTickets}</p>

        <div className="modal-buttons">
          <button onClick={onBook} className="confirm-btn">Confirm Booking</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
}
