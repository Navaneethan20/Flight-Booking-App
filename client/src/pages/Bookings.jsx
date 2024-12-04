import React, { useEffect, useState } from 'react';
import '../styles/Bookings.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Bookings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedSeats } = location.state || {}; // Destructure selectedSeats from the location state

  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem('userId');



  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-bookings');
      setBookings(response.data.reverse());
    }
    catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelTicket = async (id) => {
    try {
      await axios.put(`http://localhost:6001/cancel-ticket/${id}`);
      alert('Ticket cancelled!');
      fetchBookings(); // Refresh bookings after cancellation
    }
    catch (error) {
      console.error('Error cancelling ticket:', error);
    }
  };

  const userBookings = bookings.filter((booking) => booking.user === userId);

  return (
    <div className="bookings-page">

      <h1>Your Bookings</h1>

      <div className="bookings-container">
        {userBookings.map((booking) => (
          <div className="ticket" key={booking._id}>
            <div className="ticket-content">
              <div className="ticket-header">
                <div className="flight-name">{booking.flightName}</div>
                <p className='cities'>
                  {booking.departure.slice(0, 3).toUpperCase()} → {booking.destination.slice(0, 3).toUpperCase()}
                </p>
                <div className="flight-no">#{booking.flightId}</div>
              </div>

              <div className="ticket-details">

                <div className="detail-item">

                  <p><b> No of Passengers :</b> {booking.passengers.length}</p>
                </div>
                <div className="detail-item">

                  <p>{booking.journeyDate?.slice(0, 10)}</p>
                </div>
                <div className="detail-item">
                  {selectedSeats && selectedSeats.length > 0 && (
                    <div>
                      <p><b>Selected Seats:</b> {selectedSeats.join(', ')}</p>
                    </div>
                  )}
                </div>
                <div className="detail-item">

                  <p>₹{booking.totalPrice}</p>
                </div>
              </div>

              {booking.bookingStatus === "confirmed" && (
                <button
                  className="cancel-button"
                  onClick={() => cancelTicket(booking._id)}
                >
                  Cancel Ticket
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Bookings;
