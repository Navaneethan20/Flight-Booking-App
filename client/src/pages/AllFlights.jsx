import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/AllFlights.css';

const AllFlights = () => {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFlights = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:6001/fetch-flights');
      const data = await response.json();
      setFlights(data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Flights Available</h1>
        <button className="refresh-btn" onClick={fetchFlights}>
          Refresh Flights
        </button>
      </header>

      <div className="summary-stats">
        <div className="stat-card">
          <h3>Total Flights</h3>
          <p>{flights.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Seats</h3>
          <p>{flights.reduce((acc, flight) => acc + flight.totalSeats, 0)}</p>
        </div>
      </div>

      <div className="flights-grid">
        {isLoading ? (
          <div className="loading">Loading flights...</div>
        ) : (
          flights.map((flight) => (
            <div className="flight-card" key={flight._id}>
              <div className="flight-header">
                <h2>{flight.flightName}</h2>
                <span className="flight-id">ID: {flight.flightId}</span>
              </div>
              
              <div className="flight-details">
                <div className="detail-row">
                  <div className="detail-group">
                  <p>{flight.origin ? flight.origin.slice(0, 3).toUpperCase() : "N/A"}</p>
                  </div>
                  <div className="detail-group">
                  <p>{flight.destination ? flight.destination.slice(0, 3).toUpperCase() : "N/A"}</p>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-group">
                    <p>{flight.departureTime}</p>
                  </div>
                  <div className="detail-group">
                    <p>{flight.arrivalTime}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllFlights;