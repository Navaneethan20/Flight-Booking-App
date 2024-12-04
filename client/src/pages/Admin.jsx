import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TrendingUp, TrendingDown, Users, Briefcase, Plane } from 'lucide-react';
import '../styles/Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setbookingCount] = useState(0);
  const [flightsCount, setFlightsCount] = useState(0);
  // Mock trend data - in real application, calculate these from historical data
  const [trends] = useState({
    users: { isUp: true, percentage: 12 },
    bookings: { isUp: true, percentage: 8 },
    flights: { isUp: false, percentage: 5 }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersResponse = await axios.get('http://localhost:6001/fetch-users');
      setUserCount(usersResponse.data.length - 1);
      setUsers(usersResponse.data.filter(user => user.approval === 'not-approved'));

      const bookingsResponse = await axios.get('http://localhost:6001/fetch-bookings');
      setbookingCount(bookingsResponse.data.length);

      const flightsResponse = await axios.get('http://localhost:6001/fetch-flights');
      setFlightsCount(flightsResponse.data.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const approveRequest = async (id) => {
    try {
      await axios.post('http://localhost:6001/approve-operator', { id });
      alert("Operator approved!");
      fetchData();
    } catch (err) {
      console.error('Error approving operator:', err);
    }
  };

  const rejectRequest = async (id) => {
    try {
      await axios.post('http://localhost:6001/reject-operator', { id });
      alert("Operator rejected!");
      fetchData();
    } catch (err) {
      console.error('Error rejecting operator:', err);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Welcome Admin!</h1>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <div className="stats-icon users">
            <Users size={24} />
          </div>
          <div className="stats-content">
            <h3>Total Users</h3>
            <div className="stats-value">
              <span className="number">{userCount}</span>
            </div>
            <button 
              onClick={() => navigate('/all-users')}
              className="stats-button"
            >
              View All
            </button>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon bookings">
            <Briefcase size={24} />
          </div>
          <div className="stats-content">
            <h3>Total Bookings</h3>
            <div className="stats-value">
              <span className="number">{bookingCount}</span>
            </div>
            <button 
              onClick={() => navigate('/all-bookings')}
              className="stats-button"
            >
              View All
            </button>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon flights">
            <Plane size={24} />
          </div>
          <div className="stats-content">
            <h3>Total Flights</h3>
            <div className="stats-value">
              <span className="number">{flightsCount}</span>
            </div>
            <button 
              onClick={() => navigate('/all-flights')}
              className="stats-button"
            >
              View All
            </button>
          </div>
        </div>
      </div>

      <div className="applications-section">
        <h2>New Operator Applications</h2>
        <div className="applications-list">
          {users.length === 0 ? (
            <p className="no-applications">No new requests...</p>
          ) : (
            users.map((user) => (
              <div className="application-item" key={user._id}>
                <div className="application-info">
                  <div className="info-row">
                    <span className="label">Operator name:</span>
                    <span className="value">{user.username}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Operator email:</span>
                    <span className="value">{user.email}</span>
                  </div>
                </div>
                <div className="application-actions">
                  <button 
                    className="approve-button"
                    onClick={() => approveRequest(user._id)}
                  >
                    Approve
                  </button>
                  <button 
                    className="reject-button"
                    onClick={() => rejectRequest(user._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin