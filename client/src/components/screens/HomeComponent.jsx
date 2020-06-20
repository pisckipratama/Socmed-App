import React, { useState, useEffect } from 'react';

const HomeComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts/v1', {
      headers: {
        "Authorization": localStorage.getItem('jwt')
      }
    }).then(res => res.json())
      .then(result => {
        setData(result.data);
      })
  }, []);

  return (
    <div className="home">
      {
        data.map(item => {
          return (
            <div className="card home-card" key={item._id}>
              <h5>{item.postedBy.fullname}</h5>
              <div className="card-image">
                <img src={item.photo} alt="monyet" />
              </div>
              <div className="card-content">
                <i className="material-icons">favorite_border</i>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
                <input type="text" placeholder="add a comment" />
              </div>
            </div>
          )
        })
      }
    </div>
  )
};

export default HomeComponent;