import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './home';
import Signup from './components/signup';
import Login from './components/login';
import Dashboard from './dashboard';
import Chatbot from './components/chatbot';
import About from './about';
import './App.css'

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chatbot /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
