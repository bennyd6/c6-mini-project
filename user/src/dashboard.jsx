import "./dashboard.css";
import TicketCard from "./components/ticket";
import AiSuggestion from "./components/aiSuggestion";
import EventCard from "./components/eventCard";
import BookModal from "./components/bookModal";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch tickets for logged-in user
  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3000/api/ticket/mytickets", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        const data = await response.json();
        setTickets(data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };

    fetchTickets();
  }, []);

  // Fetch all upcoming events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/event/");
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  const handleBookEvent = async () => {
    const token = localStorage.getItem("token");
    if (!token || !selectedEvent) return;

    try {
      const response = await fetch(`http://localhost:3000/api/ticket/book/${selectedEvent._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        alert("Booking failed: " + error.error);
        return;
      }

      const ticket = await response.json();
      alert("Booking successful! Ticket Number: " + ticket.ticketNumber);

      // Refresh tickets
      setTickets((prev) => [...prev, ticket]);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="dashboard-main">
      <div className="dashboard-1">
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => (
            <TicketCard
              key={index}
              image="https://images.jdmagicbox.com/comp/ahmedabad/k7/079pxx79.xx79.171223193231.m6k7/catalogue/dg-event-in-dj-light-sound-company-maninagar-ahmedabad-disc-jockey-1nxybqrxzg.jpg"
              eventName={ticket.eventId.title}
              status="Live"
              date={ticket.eventId.date}
              hostedBy={ticket.eventId.location}
            />
          ))
        ) : (
          <p>No tickets found.</p>
        )}
      </div>

      <div className="dashboard-2">
        <AiSuggestion />
        <h1>Upcoming Events</h1>
        <div className="events-holder">
          {events.length > 0 ? (
            events.map((event, index) => (
              <EventCard
                key={index}
                image={event.image || "https://kzuu.org/wp-content/uploads/2019/10/electric-daisy-carnival-2019.png"}
                eventName={event.title}
                hostedBy={event.organizerId?.name || "Unknown"}
                date={event.date}
                venue={event.location}
                onBookNow={() => setSelectedEvent(event)}
              />
            ))
          ) : (
            <p>No upcoming events found.</p>
          )}
        </div>
      </div>

      <BookModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onBook={handleBookEvent}
      />
    </div>
  );
}
