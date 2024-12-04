import React, { useContext, useEffect, useState } from 'react';
import '../styles/LandingPage.css'
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';
import axios from 'axios';
import OffersSection from './OffersSection';
import WhyBookSection from './WhyBookSection';
import { Plane, Calendar, MapPin } from 'lucide-react'; // Added icons

const LandingPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();
  const { setTicketBookingDate } = useContext(GeneralContext);

  const cities = [
    "Chennai", "Bangalore", "Hyderabad", "Mumbai", "Indore",
    "Delhi", "Pune", "Trivendrum", "Bhopal", "Kolkata",
    "Varanasi", "Jaipur"
  ].sort(); // Sorted cities alphabetically


  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType === 'admin') navigate('/admin');
    else if (userType === 'flight-operator') navigate('/flight-admin');
  }, [navigate]);

  const fetchFlights = async () => {
    try {
      const date = new Date();
      const date1 = new Date(departureDate);
      const date2 = checkBox ? new Date(returnDate) : null;

      if (!departure || !destination || !departureDate || (checkBox && !returnDate)) {
        setError("Please fill all the required fields");
        return;
      }

      if (departure === destination) {
        setError("Departure and destination cannot be the same");
        return;
      }

      if (date1 < date || (checkBox && date2 < date1)) {
        setError("Please check the dates");
        return;
      }

      setError("");
      setLoading(true);
      const response = await axios.get('http://localhost:6001/fetch-flights');
      console.log(response.data);
      setFlights(response.data);
    } catch (err) {
      setError("Failed to fetch flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTicketBooking = async (id, origin, destination) => {
    if (!localStorage.getItem('userId')) {
      navigate('/auth');
      return;
    }

    const bookingDate = origin === departure ? departureDate : returnDate;
    setTicketBookingDate(bookingDate);
    navigate(`/book-flight/${id}`);
  };

  const formatTime = (time) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Discover unbeatable fares on iairgo to your favorite destinations
          with fast and easy booking</h1>
          <p>
            
          </p>
        </div>

        <div className="search-card">
          <div className="search-header">
            <h2><Plane className="inline-icon" /> Book a flight</h2>
            <div className="round-trip-toggle">
              <input
                type="checkbox"
                id="returnTrip"
                checked={checkBox}
                onChange={(e) => setCheckBox(e.target.checked)}
              />
            </div>
          </div>

          <div className="search-form">
            <div className="form-group">
              <select value={departure} onChange={(e) => setDeparture(e.target.value)}>
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {checkBox && (
              <div className="form-group">
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={departureDate || new Date().toISOString().split('T')[0]}
                />
              </div>
            )}

            {error && <p className="error-message">{error}</p>}

            <button 
              onClick={fetchFlights} 
              className={`search-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search Flights'}
            </button>
          </div>
        </div>
      </div>

      {flights.length > 0 ? (
        <div className="flights-section">
          <h2>Available Flights</h2>
          <div className="flights-grid">
            {flights
              .filter(flight => 
                checkBox
                  ? (flight.origin === departure && flight.destination === destination) ||
                    (flight.origin === destination && flight.destination === departure)
                  : flight.origin === departure && flight.destination === destination
              )
              .map((flight) => (
                <div key={flight._id} className="flight-card">
                  <div className="flight-header">
                    <h3>{flight.flightName}</h3>
                    <span className="flight-number">Flight #{flight.flightId}</span>
                  </div>
                  
                  <div className="flight-route">
                    <div className="route-point">
                      <p className="city">{flight.origin}</p>
                      <p className="time">{formatTime(flight.departureTime)}</p>
                    </div>
                    <div className="route-arrow">→</div>
                    <div className="route-point">
                      <p className="city">{flight.destination}</p>
                      <p className="time">{formatTime(flight.arrivalTime)}</p>
                    </div>
                  </div>

                  <div className="flight-details">
                    <div className="detail-item">
                      <p className="value">₹{flight.basePrice.toLocaleString()}</p>
                      <p className="label">Starting from</p>
                    </div>
                    <div className="detail-item">
                      <p className="value">{flight.totalSeats}</p>
                      <p className="label">Available Seats</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleTicketBooking(flight._id, flight.origin, flight.destination)}
                    className="book-button"
                  >
                    Book Now
                  </button>
                </div>
              ))}
          </div>
        </div>
      ) : flights.length === 0 && !error && !loading && (
        <div className="no-flights">
          <h3>No Flights Found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
      
      <OffersSection />
      <WhyBookSection/>
    </div>
  );
};

export default LandingPage;