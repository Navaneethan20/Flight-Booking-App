import React, { useContext, useEffect, useState } from 'react'
import '../styles/BookFlight.css'
import { GeneralContext } from '../context/GeneralContext';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookFlight = () => {
  const { id } = useParams();

  const [flightName, setFlightName] = useState('');
  const [flightId, setFlightId] = useState('');
  const [basePrice, setBasePrice] = useState(0);
  const [StartCity, setStartCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [startTime, setStartTime] = useState();

  useEffect(() => {
    fetchFlightData();
  }, [id])

  const fetchFlightData = async () => {
    await axios.get(`http://localhost:6001/fetch-flight/${id}`).then(
      (response) => {
        setFlightName(response.data.flightName);
        setFlightId(response.data.flightId);
        setBasePrice(response.data.basePrice);
        setStartCity(response.data.origin);
        setDestinationCity(response.data.destination);
        setStartTime(response.data.departureTime);
      }
    )
  }

  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [coachType, setCoachType] = useState('');
  const { ticketBookingDate } = useContext(GeneralContext);
  const [journeyDate, setJourneyDate] = useState(ticketBookingDate);

  const [numberOfPassengers, setNumberOfPassengers] = useState(0);
  const [passengerDetails, setPassengerDetails] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const price = { 'economy': 1, 'premium-economy': 2, 'business': 3, 'first-class': 4 }

  const [errors, setErrors] = useState({
    email: '',
    mobile: '',
    coachType: '',
    journeyDate: '',
    passengerDetails: [],
  });

  const handlePassengerChange = (event) => {
    const value = parseInt(event.target.value);
    setNumberOfPassengers(value);
  };

  const handlePassengerDetailsChange = (index, key, value) => {
    setPassengerDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = { ...updatedDetails[index], [key]: value };
      return updatedDetails;
    });
  };

  useEffect(() => {
    if (price[coachType] * basePrice * numberOfPassengers) {
      setTotalPrice(price[coachType] * basePrice * numberOfPassengers);
    }
  }, [numberOfPassengers, coachType])

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: '',
      mobile: '',
      coachType: '',
      journeyDate: '',
      passengerDetails: [],
    };

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    // Validate mobile
    if (!mobile) {
      newErrors.mobile = 'Mobile number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = 'Please enter a valid mobile number';
      valid = false;
    }

    // Validate seat class
    if (!coachType) {
      newErrors.coachType = 'Seat class is required';
      valid = false;
    }

    // Validate journey date
    if (!journeyDate) {
      newErrors.journeyDate = 'Journey date is required';
      valid = false;
    }

    // Validate passenger details
    passengerDetails.forEach((passenger, index) => {
      const passengerErrors = {};
      if (!passenger.name) {
        passengerErrors.name = 'Name is required';
        valid = false;
      }
      if (!passenger.age || passenger.age <= 0) {
        passengerErrors.age = 'Please enter a valid age';
        valid = false;
      }
      newErrors.passengerDetails[index] = passengerErrors;
    });

    setErrors(newErrors);
    return valid;
  }

  const navigate = useNavigate();

  const bookFlight = async () => {
    if (!validateForm()) {
      return;
    }

    const inputs = {
      user: localStorage.getItem('userId'), flight: id, flightName,
      flightId, departure: StartCity, journeyTime: startTime, destination: destinationCity,
      email, mobile, passengers: passengerDetails, totalPrice,
      journeyDate, seatClass: coachType
    }

    await axios.post('http://localhost:6001/book-ticket', inputs).then(
      (response) => {
        navigate('/seatbooking', { state: inputs });

        navigate('/seatbooking');
      }
    ).catch((err) => {
      alert("Booking failed!!");
    })
  }

  return (
    <div className='BookFlightPage'>
      <div className="BookingFlightPageContainer">
        <h2>Book ticket</h2>
        <span>
          <p><b>Flight Name: </b> {flightName}</p>
          <p><b>Flight No: </b> {flightId}</p>
        </span>
        <span>
          <p><b>Base price: </b> {basePrice}</p>
        </span>

        <span>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInputemail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="floatingInputemail">Email</label>
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInputmobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            <label htmlFor="floatingInputmobile">Mobile</label>
            {errors.mobile && <div className="error">{errors.mobile}</div>}
          </div>
        </span>
        <span className='span3'>
          <div className="no-of-passengers">
            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="floatingInputreturnDate" value={numberOfPassengers} onChange={handlePassengerChange} />
              <label htmlFor="floatingInputreturnDate">No of passengers</label>
            </div>
          </div>
          <div className="form-floating mb-3">
            <input type="date" className="form-control" id="floatingInputreturnDate" value={journeyDate} onChange={(e) => setJourneyDate(e.target.value)} />
            <label htmlFor="floatingInputreturnDate">Journey date</label>
            {errors.journeyDate && <div className="error">{errors.journeyDate}</div>}
          </div>
          <div className="form-floating">
            <select className="form-select form-select-sm mb-3" defaultValue="" aria-label=".form-select-sm example" value={coachType} onChange={(e) => setCoachType(e.target.value)}>
              <option value="" disabled>Select</option>
              <option value="economy">Economy class</option>
              <option value="premium-economy">Premium Economy</option>
              <option value="business">Business class</option>
              <option value="first-class">First class</option>
            </select>
            <label htmlFor="floatingSelect">Seat Class</label>
            {errors.coachType && <div className="error">{errors.coachType}</div>}
          </div>
        </span>

        <div className="new-passengers">
          {Array.from({ length: numberOfPassengers }).map((_, index) => (
            <div className='new-passenger' key={index}>
              <h4>Passenger {index + 1}</h4>
              <div className="new-passenger-inputs">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingInputpassengerName" value={passengerDetails[index]?.name || ''} onChange={(event) => handlePassengerDetailsChange(index, 'name', event.target.value)} />
                  <label htmlFor="floatingInputpassengerName">Name</label>
                  {errors.passengerDetails[index]?.name && <div className="error">{errors.passengerDetails[index].name}</div>}
                </div>
                <div className="form-floating mb-3">
                  <input type="number" className="form-control" id="floatingInputpassengerAge" value={passengerDetails[index]?.age || ''} onChange={(event) => handlePassengerDetailsChange(index, 'age', event.target.value)} />
                  <label htmlFor="floatingInputpassengerAge">Age</label>
                  {errors.passengerDetails[index]?.age && <div className="error">{errors.passengerDetails[index].age}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="total-price">
          <h5>Total Price: ₹ {totalPrice}</h5>
        </div>
        <div className="book-ticket-button">
          <button className='book-ticket-btn' onClick={bookFlight}>Book Ticket</button>
        </div>
      </div>
    </div>
  );
}

export default BookFlight;
