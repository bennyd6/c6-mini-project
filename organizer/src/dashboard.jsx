import "./dashboard.css";
import an from './assets/announcement.png';
import EventCard from "./components/eventCard";
import { useEffect, useState } from "react";
import CreateEventModal from './components/createEventModal'

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchMyEvents = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3000/api/event/myevents", {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          }
        });

        const data = await response.json();
        setEvents(data);

        const now = new Date();

        const upcoming = data.filter(event => new Date(event.date) >= now);
        const past = data.filter(event => new Date(event.date) < now);

        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (err) {
        console.error("Error fetching your events:", err);
      }
    };

    fetchMyEvents();
  }, []);

  return (
    <>
      <div className="dashboard-main">
        <div className="dashboard-1">
          <div className="media-object">
            <img src={an} alt="Announcement" />
            <h1>Planning an Event??</h1>
            <div className="add">
              <h1>
                <button onClick={() => setModalOpen(true)}>+</button>
              </h1>
            </div>
          </div>
        </div>

        <div className="dashboard-2">
          <h1>Your Upcoming Events</h1>
          <div className="upcoming">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, idx) => (
                <EventCard
                  key={idx}
                  image={event.imageUrl || "https://kzuu.org/wp-content/uploads/2019/10/electric-daisy-carnival-2019.png"}
                  eventName={event.title}
                  hostedBy="You"
                  date={event.date}
                  venue={event.location}
                  onBookNow={() => alert(`Booking for ${event.title} started!`)}
                />
              ))
            ) : (
              <p>No upcoming events.</p>
            )}
          </div>

          <h1>Your Past Events</h1>
          <div className="past">
            {pastEvents.length > 0 ? (
              pastEvents.map((event, idx) => (
                <EventCard
                  key={idx}
                  image={event.imageUrl || "https://kzuu.org/wp-content/uploads/2019/10/electric-daisy-carnival-2019.png"}
                  eventName={event.title}
                  hostedBy="You"
                  date={event.date}
                  venue={event.location}
                  onBookNow={() => alert(`Booking for ${event.title} ended.`)}
                />
              ))
            ) : (
              <p>No past events.</p>
            )}
          </div>
        </div>
      </div>
      <CreateEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventCreated={(newEvent) => setEvents(prev => [...prev, newEvent])}
      />
    </>
  );
}
