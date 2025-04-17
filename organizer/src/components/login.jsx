import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple frontend-only validation
        if (credentials.email.trim() && credentials.password.trim()) {
            alert('Login successful!');
            localStorage.setItem('token', 'demo-token'); // Optional simulation
            navigate('/'); // Redirect after login
        } else {
            alert('Please fill in both email and password.');
        }
    };

    return (
        <div className="login-main">
            <div className="login-main-two">
                <div className="login-card">
                    <h2>Login</h2>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder='Enter your email'
                            onChange={handleChange}
                            required
                            className='id-and-pass'
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder='Enter your password'
                            onChange={handleChange}
                            required
                            className='id-and-pass'
                        />
                        <div className="show-pass">
                            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
                            <p>Show Password?</p>
                        </div>
                        <button className='login-button' type="submit">Login</button>
                    </form>
                    <p><a href="/signup" className="signup-link">Don't have an account?</a></p>
                </div>
            </div>
        </div>
    );
}
