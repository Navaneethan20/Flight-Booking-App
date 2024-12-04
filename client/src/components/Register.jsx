import React, { useState, useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';
import { BsEye, BsEyeSlash } from 'react-icons/bs';


const Register = ({ setIsLogin }) => {
  const {
    setUsername,
    setEmail,
    setPassword,
    usertype,
    setUsertype,
    register,
  } = useContext(GeneralContext);

  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    usertype: '',
  });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formValues.username.trim()) {
      newErrors.username = 'Username is required.';
    } else if (formValues.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long.';
    }

    // Email validation
    if (!formValues.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formValues.email)
    ) {
      newErrors.email = 'Invalid email format.';
    }

    // Password validation
    if (!formValues.password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (formValues.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    // Usertype validation
    if (!formValues.usertype) {
      newErrors.usertype = 'Please select a user type.';
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // Update context as the user types
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'usertype') setUsertype(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await register();
    }
  };

  return (
    <form className="authForm">
      <h2>Register</h2>

      <div className="form-floating mb-3 authFormInputs">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <label htmlFor="floatingInput">Username</label>
        {errors.username && <small className="text-danger">{errors.username}</small>}
      </div>

      <div className="form-floating mb-3 authFormInputs">
        <input
          type="email"
          className="form-control"
          id="floatingEmail"
          name="email"
          placeholder="name@example.com"
          onChange={handleChange}
        />
        <label htmlFor="floatingEmail">Email address</label>
        {errors.email && <small className="text-danger">{errors.email}</small>}
      </div>

      <div className="form-floating mb-3 authFormInputs">
        <input
          type={passwordVisible ? 'text' : 'password'}
          className="form-control"
          id="floatingPassword"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <label htmlFor="floatingPassword">Password</label>
        {errors.password && <small className="text-danger">{errors.password}</small>}

        {/* Password Eye Icon */}
        <span
          className="password-eye"
          onClick={() => setPasswordVisible(!passwordVisible)} 
        >
          {passwordVisible ? <BsEyeSlash /> : <BsEye />}
        </span>
        
      </div>

      <select
        className="form-select form-select-lg mb-3"
        name="usertype"
        onChange={handleChange}
      >
        <option value="">User type</option>
        <option value="admin">Admin</option>
        <option value="customer">Customer</option>
        <option value="flight-operator">Flight Operator</option>
      </select>
      {errors.usertype && <small className="text-danger">{errors.usertype}</small>}

      <button className="btn btn-primary" onClick={handleRegister}>
        Sign up
      </button>
      <p>
        Already registered?{' '}
        <span onClick={() => setIsLogin(true)} style={{ cursor: 'pointer', color: 'blue' }}>
          Login
        </span>
      </p>
    </form>
  );
};

export default Register;
