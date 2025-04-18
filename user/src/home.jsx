import './home.css';
import vec from './assets/calendar.png';
import { useEffect, useState } from 'react';

export default function Home() {
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('http://localhost:3000/api/auth/getuser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'auth-token': token // ✅ match your backend middleware
                        }
                    });

                    const data = await response.json();
                    setUserName(data.name || 'User'); // ✅ set name
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <div className="home-main">
                <div className="home-1">
                    <h1>Hello {userName}!</h1> {/* ✅ updated */}
                    <p>Welcome to <span>Emisor</span></p>
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
                    <div className="suggestion">
                        <h1>Wanna organize an event with Emisor?</h1>
                        <div className="media-outer">
                            <div className="media-object">
                                <h1><a href="">  Click Here!</a></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
