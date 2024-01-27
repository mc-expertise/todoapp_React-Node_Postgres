import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
const Auth = () => {
  const [setCookie] = useCookies(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  //   console.log('cookies', cookies);

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError('Make sure passwords match!');
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/${endpoint}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();

    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie('Email', data.email);
      setCookie('AuthToken', data.token);
      window.location.reload();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form action="">
          <h2>{isLogIn ? 'Please log in' : 'Please sign up!'}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogIn && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')}
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: isLogIn
                ? 'rgb(255,255,255)'
                : 'rgb(188,188,188)',
            }}>
            Sign Up
          </button>
          <button
            style={{
              backgroundColor: !isLogIn
                ? 'rgb(255,255,255)'
                : 'rgb(188,188,188)',
            }}
            onClick={() => viewLogin(true)}>
            Login In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
