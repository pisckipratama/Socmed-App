import React from 'react';

const ProfileComponent = () => {
  return (
    <div className="profile-container">
      <div className="profile-box">
        <div>
          <img className="avatar" src="https://images.unsplash.com/photo-1519625594242-7db544018926?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar" />
        </div>
        <div>
          <h4>Stephany Angela</h4>
          <div className="profile-detail">
            <h6>40 posts</h6>
            <h6>409 followers</h6>
            <h6>343 following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        <img src="https://images.unsplash.com/photo-1565651454302-e263192bad3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" className="item" alt="pictures" />
        <img src="https://images.unsplash.com/photo-1545230731-051693c8cd7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" className="item" alt="pictures" />
        <img src="https://images.unsplash.com/photo-1553495280-37259d1e6ebc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" className="item" alt="pictures" />
        <img src="https://images.unsplash.com/photo-1570025796121-87d2d9b69ca9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" className="item" alt="pictures" />
        <img src="https://images.unsplash.com/flagged/photo-1557527694-b679da68a0c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" className="item" alt="pictures" />
        <img src="https://images.unsplash.com/photo-1588198280092-6efe98a5dceb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" className="item" alt="pictures" />
      </div>
    </div>
  )
};

export default ProfileComponent;