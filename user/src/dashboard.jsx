import "./dashboard.css";
import TicketCard from "./components/ticket";
import AiSuggestion from "./components/aiSuggestion";
import EventCard from "./components/eventCard";

export default function Dashboard() {
  return (
    <>
    <div className="dashboard-main">
      <div className="dashboard-1">
          <TicketCard
            image="https://images.jdmagicbox.com/comp/ahmedabad/k7/079pxx79.xx79.171223193231.m6k7/catalogue/dg-event-in-dj-light-sound-company-maninagar-ahmedabad-disc-jockey-1nxybqrxzg.jpg"
            eventName="Summer Beats Festival"
            status="Live"
            date="2025-05-10T19:00:00"
            hostedBy="DJ Nova"
          />
          <TicketCard
            image="https://images.jdmagicbox.com/comp/ahmedabad/k7/079pxx79.xx79.171223193231.m6k7/catalogue/dg-event-in-dj-light-sound-company-maninagar-ahmedabad-disc-jockey-1nxybqrxzg.jpg"
            eventName="Summer Beats Festival"
            status="Live"
            date="2025-05-10T19:00:00"
            hostedBy="DJ Nova"
          />
          <TicketCard
            image="https://images.jdmagicbox.com/comp/ahmedabad/k7/079pxx79.xx79.171223193231.m6k7/catalogue/dg-event-in-dj-light-sound-company-maninagar-ahmedabad-disc-jockey-1nxybqrxzg.jpg"
            eventName="Summer Beats Festival"
            status="Live"
            date="2025-05-10T19:00:00"
            hostedBy="DJ Nova"
          />
      </div>
      <div className="dashboard-2">
        <AiSuggestion></AiSuggestion>
          <h1>Upcoming Events</h1>
        <div className="events-holder"> 
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
