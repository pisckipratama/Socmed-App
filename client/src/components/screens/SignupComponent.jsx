import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const SignupComponent = () => {
  const history = useHistory();
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const PostData = () => {
    fetch('http://192.168.1.7:5000/api/users/v1/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fullname, email, password })
    }).then(res => res.json())
      .then(data => {
        if (!data.success) {
          M.toast({ html: data.message, classes: "#e57373 red lighten-2" });
        } else {
          M.toast({ html: data.message, classes: "#a5d6a7 green lighten-2" });
          history.push('/login');
        };
      }).catch(err => console.log(err));
  }

  return (
    <div className="myCard">
      <div className="card auth-card input-field">
        <h2 className="text-instagram">Instagram</h2>
        <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="Full Name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => PostData()}>Sign Up</button>
        <h5>
          <Link to="/login">Already have an account</Link>
        </h5>
      </div>
    </div>
  )
};

export default SignupComponent;