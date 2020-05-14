import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <li key="profile"><Link to="/profile">Profile</Link></li>,
        <li key="posting"><Link to="/postpicture">Posting!</Link></li>,
        <li key="logout">
          <button className="btn waves-effect waves-light #ff8a80 red accent-1"
            onClick={() => {
              localStorage.clear();
              dispatch({"type": "CLEAR"});
              history.push('/login');
            }}>
            Logout
          </button>
        </li>
      ]
    } else {
      return [
        <li key="login"><Link to="/login">Login</Link></li>,
        <li key="signup"><Link to="/signup">Signup</Link></li>
      ]
    }
  }
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/login"} className="brand-logo left">Instagram</Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;