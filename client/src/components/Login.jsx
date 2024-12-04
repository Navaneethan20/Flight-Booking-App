import React, { useContext, useState } from 'react';
import { GeneralContext } from '../context/GeneralContext';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const Login = ({ setIsLogin }) => {
  const { login } = useContext(GeneralContext);
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (password.trim().length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }



    await login(email, password);
  };

  return (
    <form className="authForm" onSubmit={handleLogin}>
      <h2>Login</h2>
      <div className="form-floating mb-3 authFormInputs">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => {
            SetEmail(e.target.value);
            setErrors({ ...errors, email: '' });
          }}
        />
        <label htmlFor="floatingInput">Email address</label>
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div className="form-floating mb-3 authFormInputs">
        <input
          type={passwordVisible ? 'text' : 'password'}
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            SetPassword(e.target.value);
            setErrors({ ...errors, password: '' });
          }}
        />
        <label htmlFor="floatingPassword">Password</label>
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

        {/* Password Eye Icon */}
        <span
          className="password-eye"
          onClick={() => setPasswordVisible(!passwordVisible)} 
        >
          {passwordVisible ? <BsEyeSlash /> : <BsEye />}
        </span>
      </div>
      <button type="submit" className="btn btn-primary">
        Sign in
      </button>
      <p>
        Not registered? <span onClick={() => setIsLogin(false)}>Register</span>
      </p>
    </form>
  );
};

export default Login;
