import React from 'react';
import { Link } from 'react-router-dom';

const SignupComponent = () => {
  return (
    <div className="myCard">
      <div className="card auth-card input-field">
        <h2 className="text-instagram">Instagram</h2>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Retype Password" />
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">Sign Up</button>
        <h5>
          <Link to="/login">Already have an account</Link>
        </h5>
      </div>
    </div>
  )
};

export default SignupComponent;