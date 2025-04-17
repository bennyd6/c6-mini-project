import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/navbar'
import Home from './home'
import Signup from './components/signup';
import Login from './components/login';
import Dashboard from './dashboard';
import Chatbot from './components/chatbot';
import About from './about';

function App() {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  return (
    <>
      {!isAuthPage && (
        <>
          <Navbar></Navbar>
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
