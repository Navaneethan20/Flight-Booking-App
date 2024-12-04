import React, { useState, useEffect } from 'react';
import { Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SeatBooking = ({ onBack, onProceedToBooking }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { state } = useNavigate().location || {}; // Use location to access passed state (if any)
  const [seatMap, setSeatMap] = useState([]);
  const navigate = useNavigate();

  const ROWS = 15;
  const SEATS_PER_ROW = 6;

  useEffect(() => {
    const initialSeatMap = [];
    for (let row = 0; row < ROWS; row++) {
      const seatRow = [];
      for (let seat = 0; seat < SEATS_PER_ROW; seat++) {
        const seatNumber = `${row + 1}${String.fromCharCode(65 + seat)}`;
        seatRow.push({
          id: seatNumber,
          isBooked: Math.random() < 0.3,
          isSelected: false
        });
      }
      initialSeatMap.push(seatRow);
    }
    setSeatMap(initialSeatMap);
  }, []);

  const handleSeatClick = (rowIndex, seatIndex) => {
    const seat = seatMap[rowIndex][seatIndex];
    if (seat.isBooked) return;

    const newSeatMap = [...seatMap];
    const seatNumber = seat.id;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
      newSeatMap[rowIndex][seatIndex].isSelected = false;
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
      newSeatMap[rowIndex][seatIndex].isSelected = true;
    }
    setSeatMap(newSeatMap);
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    console.log('Proceeding with seats: ', selectedSeats);
    alert('Booking successful!');
    // Navigate to the booking page and pass selected seats as part of the state
    navigate('/bookings', { state: { selectedSeats } });
  };

  return (
    <div className="seat-booking-container">
      <div className="booking-card">
        <div className="card-header">
          <h2 className="card-title">
            <Plane /> Select Your Seats
          </h2>
        </div>

        <div className="card-content">
          <div className="legend">
            <div className="legend-item">
              <div className="legend-color available"></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="legend-color selected"></div>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div className="legend-color booked"></div>
              <span>Booked</span>
            </div>
          </div>

          <div className="airplane-container">
            <div className="airplane-nose"></div>

            <div className="seat-map">
              {seatMap.map((row, rowIndex) => (
                <div key={rowIndex} className="seat-row">
                  <div className="seat-group">
                    {row.slice(0, 3).map((seat, seatIndex) => (
                      <button
                        key={seat.id}
                        className={`seat ${seat.isBooked ? 'booked' : ''} ${seat.isSelected ? 'selected' : ''}`}
                        onClick={() => handleSeatClick(rowIndex, seatIndex)}
                        disabled={seat.isBooked}
                      >
                        {seat.id}
                      </button>
                    ))}
                  </div>
                  <div className="seat-group">
                    {row.slice(3).map((seat, seatIndex) => (
                      <button
                        key={seat.id}
                        className={`seat ${seat.isBooked ? 'booked' : ''} ${seat.isSelected ? 'selected' : ''}`}
                        onClick={() => handleSeatClick(rowIndex, seatIndex + 3)}
                        disabled={seat.isBooked}
                      >
                        {seat.id}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedSeats.length > 0 && (
            <div className="selected-seats-alert">
              Selected seats: {selectedSeats.join(', ')}
            </div>
          )}

          <div className="button-container">
            <button className="button secondary" onClick={onBack}>
              Back
            </button>
            <button
              className="button primary"
              onClick={handleProceed}
              disabled={selectedSeats.length === 0}
            >
              Proceed to Booking
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .seat-booking-container {
          min-height: 100vh;
          background-color: #f5f5f5;
          padding: 2rem;
          display: flex;
          justify-content: center; /* Centers the seat numbers horizontally */
          align-items: center; /* Centers the seat numbers vertically if required */
          flex-wrap: wrap; /* Wraps seats if there are many */
        }

        .booking-card {
          background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px; /* Smaller width */
  margin: 20px auto; /* Adjusted margin to ensure it doesn't overlap with navbar */
  padding: 10px;
  position: relative; /* Ensure the position is relative if necessary */
  z-index: 1; /* To stay on top if there's any overlap */
        }

        .card-header {
          padding: 1.5rem;
          border-bottom: 1px solid #eee;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .card-content {
          padding: 1.5rem;
        }

        .legend {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
        }

        .legend-color {
          width: 24px;
          height: 24px;
          border-radius: 4px;
        }

        .legend-color.available {
          background-color: #e2e8f0;
        }

        .legend-color.selected {
          background-color: #3b82f6;
        }

        .legend-color.booked {
          background-color: #94a3b8;
        }

        .airplane-container {
          position: relative;
          margin-bottom: 2rem;
        }

        .airplane-nose {
          width: 128px;
          height: 128px;
          background-color: #e2e8f0;
          border-radius: 64px 64px 0 0;
          margin: 0 auto 1rem;
        }

        .seat-map {
          background: white;
          border-radius: 8px;
          padding: 2rem;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .seat-row {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 1rem;
        }

        .seat-group {
          display: flex;
          gap: 0.5rem;
        }

        .seat {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 8px 8px 0 0;
          background-color: #e2e8f0;
          color: #1e293b;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          margin: 5px;
          padding: 10px;
          text-align: center;
        }

        
       
        .seat:hover:not(:disabled) {
          background-color: #cbd5e1;
        }

        .seat.selected {
          background-color: #3b82f6;
          color: white;
        }

        .seat.selected:hover {
          background-color: #2563eb;
        }

        .seat.booked {
          background-color: #94a3b8;
          cursor: not-allowed;
          color: #e2e8f0;
        }

        .selected-seats-alert {
          background-color: #f0f9ff;
          border: 1px solid #bae6fd;
          color: #0369a1;
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1.5rem;
        }

        .button-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .button {
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .button.primary {
          background-color: #3b82f6;
          color: white;
        }

        .button.primary:hover:not(:disabled) {
          background-color: #2563eb;
        }

        .button.primary:disabled {
          background-color: #94a3b8;
          cursor: not-allowed;
        }

        .button.secondary {
          background-color: white;
          border: 1px solid #e2e8f0;
          color: #1e293b;
        }

        .button.secondary:hover {
          background-color: #f8fafc;
        }

        @media (max-width: 640px) {
          .seat-booking-container {
            padding: 1rem;
          }

          .seat {
            width: 32px;
            height: 32px;
            font-size: 0.75rem;
          }

          .seat-row {
            gap: 1rem;
          }

          .legend {
            flex-wrap: wrap;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SeatBooking;
