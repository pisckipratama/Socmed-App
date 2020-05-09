import React from 'react';

const HomeComponent = () => {
  return (
    <div className="home">
      <div className="card home-card">
        <h5>Stephany Angela</h5>
        <div className="card-image">
          <img src="https://images.unsplash.com/photo-1542897730-6e8d4bfe5508?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80" alt="monyet" />
        </div>
        <div className="card-content">
          <i className="material-icons">favorite_border</i>
          <h6>Bali's Women</h6>
          <p>This is beautiful women from Bali, Indonesia.</p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>

      <div className="card home-card">
        <h5>Stephany Angela</h5>
        <div className="card-image">
          <img src="https://images.unsplash.com/photo-1522435229388-6f7a422cd95b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="monyet" />
        </div>
        <div className="card-content">
          <i className="material-icons">favorite_border</i>
          <h6>Thinker</h6>
          <p>What the hell are you think?</p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>
    </div>
  )
};

export default HomeComponent;