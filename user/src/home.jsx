import './home.css'
import vec from './assets/calendar.png'

export default function Home(){
    return(
        <>
        <div className="home-main">
            <div className="home-1">
                <h1>Emisor</h1>
                <p><span>Event</span> Management and Ticketing System</p>
            </div>
            <div className="home-2">
                <div className="home-2-1">
                    <img src={vec} alt="" />
                    <div className="home-2-1-con">
                        <div className="home-2-p">
                            <p>Say goodbye to manual event tracking! Automate ticketing, gain real-time insights, and ensure smooth event management effortlessly with Emisor.</p>
                        </div>
                        <div className="b-grad">
                            <button>Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}