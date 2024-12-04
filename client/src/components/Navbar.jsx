import React, { useContext, useState } from 'react'
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';
// Import your logo - adjust the path as needed
import logo from '../assets/logo.png';  // Make sure to add your logo image in assets folder

const Navbar = () => {
    const navigate = useNavigate();
    const usertype = localStorage.getItem('userType');
    const { logout } = useContext(GeneralContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    // Get suffix based on usertype
    const getTitleSuffix = () => {
        if (usertype === 'admin') return ' (Admin)';
        if (usertype === 'flight-operator') return ' (Operator)';
        return '';
    };

    return (
        <div className={`navbar ${usertype === 'admin' ? 'admin' : usertype === 'flight-operator' ? 'operator' : ''}`}>
            <div className="navbar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <img 
                    src={logo} 
                    alt="SB Flights Logo" 
                />
                <span>{getTitleSuffix()}</span>
            </div>

            <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            <div className={`nav-options ${isMenuOpen ? 'active' : ''}`}>
                {!usertype ? (
                    <>
                        <p onClick={() => handleNavClick('/')}>Home</p>
                        <p onClick={() => handleNavClick('/auth')}>Login</p>
                    </>
                ) : usertype === 'customer' ? (
                    <>
                        <p onClick={() => handleNavClick('/')}>Home</p>
                        <p onClick={() => handleNavClick('/bookings')}>Bookings</p>
                        <p onClick={handleLogout}>Logout</p>
                    </>
                ) : usertype === 'admin' ? (
                    <>
                        <p onClick={() => handleNavClick('/admin')}>Home</p>
                        <p onClick={handleLogout}>Logout</p>
                    </>
                ) : usertype === 'flight-operator' ? (
                    <>
                        <p onClick={() => handleNavClick('/flight-admin')}>Home</p>
                        <p onClick={() => handleNavClick('/flight-bookings')}>Bookings</p>
                        <p onClick={() => handleNavClick('/flights')}>Flights</p>
                        <p onClick={() => handleNavClick('/new-flight')}>Add Flight</p>
                        <p onClick={handleLogout}>Logout</p>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Navbar;