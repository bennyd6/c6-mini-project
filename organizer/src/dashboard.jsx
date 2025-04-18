import "./dashboard.css";
import an from './assets/announcement.png'
import EventCard from "./components/eventCard";

export default function Dashboard() {
  return (
    <>
    <div className="dashboard-main">
      <div className="dashboard-1">
        <div class="media-object">
          <img src={an} alt="" />
          <h1>Planning an Event?? </h1>
          <div className="add">
            <h1><a href="">+</a></h1>
          </div>
        </div>
      </div>
      <div className="dashboard-2">
          <h1>Your Upcoming Events</h1>
        <div className="upcoming">
          <EventCard
            image="https://kzuu.org/wp-content/uploads/2019/10/electric-daisy-carnival-2019.png"
            eventName="Electric Carnival Night"
            hostedBy="Pulse Entertainment"
            date="2025-07-12T21:00:00"
            venue="Skyline Arena, NYC"
            onBookNow={() => alert('Booking started!')}
            />
          <EventCard
            image="https://kzuu.org/wp-content/uploads/2019/10/electric-daisy-carnival-2019.png"
            eventName="Electric Carnival Night"
            hostedBy="Pulse Entertainment"
            date="2025-07-12T21:00:00"
            venue="Skyline Arena, NYC"
            onBookNow={() => alert('Booking started!')}
            />
          <EventCard
            image="https://kzuu.org/wp-content/uploads/2019/10/electric-daisy-carnival-2019.png"
            eventName="Electric Carnival Night"
            hostedBy="Pulse Entertainment"
            date="2025-07-12T21:00:00"
            venue="Skyline Arena, NYC"
            onBookNow={() => alert('Booking started!')}
            />
          <EventCard
            image="https://kzuu.org/wp-content/uploads/2019/10/electric-daisy-carnival-2019.png"
            eventName="Electric Carnival Night"
            hostedBy="Pulse Entertainment"
            date="2025-07-12T21:00:00"
            venue="Skyline Arena, NYC"
            onBookNow={() => alert('Booking started!')}
            />
        </div>
        <h1>Your Past Events</h1>
        <div className="past">
          <EventCard
            image="https://kzuu.org/wp-content/uploads/2019/10/electric-daisy-carnival-2019.png"
            eventName="Electric Carnival Night"
            hostedBy="Pulse Entertainment"
            date="2025-07-12T21:00:00"
            venue="Skyline Arena, NYC"
            onBookNow={() => alert('Booking started!')}
            />
          <EventCard
            image="https://kzuu.org/wp-content/uploads/2019/10/electric-daisy-carnival-2019.png"
            eventName="Electric Carnival Night"
            hostedBy="Pulse Entertainment"
            date="2025-07-12T21:00:00"
            venue="Skyline Arena, NYC"
            onBookNow={() => alert('Booking started!')}
            />
          <EventCard
            image="https://kzuu.org/wp-content/uploads/2019/10/electric-daisy-carnival-2019.png"
            eventName="Electric Carnival Night"
            hostedBy="Pulse Entertainment"
            date="2025-07-12T21:00:00"
            venue="Skyline Arena, NYC"
            onBookNow={() => alert('Booking started!')}
            />

        </div>
      </div>
    </div>
    </>
  );
}
