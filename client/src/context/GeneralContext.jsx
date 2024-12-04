import React, { createContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  const [ticketBookingDate, setTicketBookingDate] = useState();
  const inputs = { username, email, usertype, password };

  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const loginInputs = { email, password };

      const res = await axios.post('http://localhost:6001/login', loginInputs);
      // Store user data in localStorage
      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('userType', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);

      // Redirect based on user type
      if (res.data.usertype === 'customer') {
        navigate('/');
      } else if (res.data.usertype === 'admin') {
        navigate('/admin');
      } else if (res.data.usertype === 'flight-operator') {
        navigate('/flight-admin');
      }

    } catch (err) {
      alert("Login failed! Please try again.");
      console.error("Login Error:", err.response?.data || err.message);
    }
  };

  const register = async () => {
    try {
      const res = await axios.post('http://localhost:6001/register', inputs);
      // Store user data in localStorage
      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('userType', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);

      // Redirect based on user type
      if (res.data.usertype === 'customer') {
        navigate('/');
      } else if (res.data.usertype === 'admin') {
        navigate('/admin');
      } else if (res.data.usertype === 'flight-operator') {
        navigate('/flight-admin');
      }

    } catch (err) {
      alert("Registration failed! Please try again.");
      console.error("Registration Error:", err.response?.data || err.message);
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.clear();
    alert("Logged out successfully!");

    // Refresh the page and redirect to home
    window.location.reload();
    navigate('/');
  };

  return (
    <GeneralContext.Provider
      value={{
        login,
        register,
        logout,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        usertype,
        setUsertype,
        ticketBookingDate,
        setTicketBookingDate,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
