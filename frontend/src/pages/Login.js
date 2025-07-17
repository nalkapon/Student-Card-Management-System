import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { setCurrentUserId } from '../utils/userUtils';
import { EmailPasswordStrategy, AuthContext } from '../strategies/AuthStrategies';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    checkFormValidity(e.target.value, password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkFormValidity(email, e.target.value);
  };

  const checkFormValidity = (email, password) => {
    if (email.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const strategy = new EmailPasswordStrategy();
      const authContext = new AuthContext(strategy);
      const userId = await authContext.executeLogin(email.trim(), password.trim());

      setCurrentUserId(userId);
      navigate('/home');
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage(
        error.response?.data?.message || 'An unexpected error occurred.'
      );
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <h1>Welcome Back</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" disabled={isButtonDisabled}>
          Login
        </button>
      </form>
      <p>
        Don’t have an account?{' '}
        <button type="button" onClick={handleSignUpRedirect} className="signup-button">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;