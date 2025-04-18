import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './navbar.css';
import Logo from '../assets/emisor.png';

export default function Navbar() {
    const [userName, setUserName] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('http://localhost:3000/api/auth/getuser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    const data = await response.json();
                    setUserName(data || 'User');
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className={`nav-main ${scrolled ? 'nav-scrolled' : ''}`}>
            <a href="/"><img src={Logo} alt="Logo" /></a>
            <a href="/" className={location.pathname === "/" ? "active-link" : ""}>Home</a>
            <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active-link" : ""}>Dashboard</Link>
            <Link to="/about" className={location.pathname === "/about" ? "active-link" : ""}>About Us</Link>

            <div className="user-dropdown" onClick={toggleDropdown} ref={dropdownRef}>
                <span>{userName || "Loading..."}</span>
                {dropdownVisible && (
                    <div className="dropdown-menu">
                        <button className="dropdown-btn" onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
}
