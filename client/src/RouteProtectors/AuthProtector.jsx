import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthProtector = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if 'userType' is in localStorage
    if (!localStorage.getItem('userType')) {
      
      navigate('/'); // Redirect to login page if not authenticated
    }
  }, []); // Empty dependency array means this runs only once on component mount

  return children;
};

export default AuthProtector;
