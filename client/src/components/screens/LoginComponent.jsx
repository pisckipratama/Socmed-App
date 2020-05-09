import React from 'react';
import { Link } from 'react-router-dom';

const LoginComponent = () => {
  return (
    <div className="myCard">
      <div className="card auth-card input-field">
        <h2 className="text-instagram">Instagram</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">Login</button>
        <h5>
          <Link to="/signup">Don't have an account</Link>
        </h5>
      </div>
    </div>
  )
};

export default LoginComponent;