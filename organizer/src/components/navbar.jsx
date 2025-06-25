import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './navbar.css';
import Logo from '../assets/emisor.png';

export default function Navbar() {
    const [userName, setUserName] = useState('Loading...');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('http://localhost:3000/api/organizer/getorganizer', {
                    method: 'GET', // changed to GET
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user');
                }

                const data = await response.json();
                setUserName(data.name || 'User'); // ensure that data.name exists
            } catch (error) {
                console.error('Error fetching user:', error);
                setUserName('Error fetching user');
            }
        } else {
            setUserName('User');
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`nav-main ${scrolled ? 'nav-scrolled' : ''}`}>
            <a href="/"><img src={Logo} alt="Logo" /></a>
            <a href="/" className={location.pathname === "/" ? "active-link" : ""}>Home</a>
            <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active-link" : ""}>Dashboard</Link>
            <Link to="/about" className={location.pathname === "/about" ? "active-link" : ""}>About Us</Link>

            <div className="user-dropdown" onClick={toggleDropdown} ref={dropdownRef}>
                <span>{userName}</span>
                {dropdownVisible && (
                    <div className="dropdown-menu">
                        <button className="dropdown-btn" onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
}