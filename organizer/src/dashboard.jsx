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

      </div>
    </div>
    </>
  );
}
