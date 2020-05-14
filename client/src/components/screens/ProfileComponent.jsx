import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';

const ProfileComponent = () => {
  const [myPict, setMyPict] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch('http://192.168.1.7:5000/api/posts/v1/mypost', {
      headers: {
        "Authorization": localStorage.getItem('jwt')
      }
    }).then(res => res.json())
      .then(result => {
        setMyPict(result.data);
      })
  }, [myPict, setMyPict])
  return (
    <div className="profile-container">
      <div className="profile-box">
        <div>
          <img className="avatar" src="https://images.unsplash.com/photo-1519625594242-7db544018926?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar" />
        </div>
        <div>
          <h4>{state ? state.fullname : "loading"}</h4>
          <div className="profile-detail">
            <h6>{myPict.length} posts</h6>
            <h6>409 followers</h6>
            <h6>343 following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {
          myPict.map((item) => {
            return (
              <img key={item._id} src={item.photo} className="item" alt={item.title} />
            )
          })
        }
      </div>
    </div>
  )
};

export default ProfileComponent;