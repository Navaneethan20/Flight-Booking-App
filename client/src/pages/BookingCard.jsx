import React from 'react';

const BookingCard = ({ booking, onCancelTicket }) => {
  return (
      <div className="user-booking">
        <div className="booking-header">
          <div className="seat-number">{booking.seats || '--'}</div>
        </div>

        <div className="booking-content">
          <div className="booking-main">
            <div className="booking-passenger">{booking.passengers[0].name}</div>
            
            <div className="booking-route">
              {booking.departure} ✈ {booking.destination}
            </div>

            <div className="booking-details">
              <div className="booking-detail-item">
                <span className="detail-label">Flight</span>
                <span className="detail-value">{booking.flightId}</span>
              </div>
              <div className="booking-detail-item">
                <span className="detail-label">Gate</span>
                <span className="detail-value">--</span>
              </div>
              <div className="booking-detail-item">
                <span className="detail-label">Date</span>
                <span className="detail-value">{booking.journeyDate.slice(0,10)}</span>
              </div>
              <div className="booking-detail-item">
                <span className="detail-label">Time</span>
                <span className="detail-value">{booking.journeyTime}</span>
              </div>
            </div>

            {booking.passengers.length > 1 && (
              <div className="booking-detail-item">
                <span className="detail-label">Additional Passengers</span>
                {booking.passengers.slice(1).map((passenger, i) => (
                  <span key={i} className="detail-value">
                    {passenger.name} ({passenger.age} yrs)
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="booking-separator" />

          <div className="booking-summary">
            <div className="booking-details">
              <div className="booking-detail-item">
                <span className="detail-label">Contact</span>
                <span className="detail-value">{booking.mobile}</span>
              </div>
              <div className="booking-detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{booking.email}</span>
              </div>
              <div className="booking-detail-item">
                <span className="detail-label">Price</span>
                <span className="detail-value">₹{booking.totalPrice}</span>
              </div>
              <div className="booking-detail-item">
                <span className="detail-label">Booking Date</span>
                <span className="detail-value">{booking.bookingDate.slice(0,10)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-barcode">
          <div className="booking-id">Booking ID: {booking._id}</div>
        </div>

        <div className={`status-badge ${
          booking.bookingStatus === 'cancelled' ? 'status-cancelled' : 'status-confirmed'
        }`}>
          {booking.bookingStatus}
        </div>

        {booking.bookingStatus === 'confirmed' && (
          <button className="cancel-button" onClick={() => onCancelTicket(booking._id)}>
            Cancel Ticket
          </button>
        )}
      </div>
  );
};

export default BookingCard;
