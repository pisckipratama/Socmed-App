import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { useHistory } from 'react-router-dom';

const CreatePostComponent = () => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (url) {
      // upload data to backend
      fetch('http://192.168.1.7:5000/api/posts/v1', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('jwt')
        },
        body: JSON.stringify({ title, body, pic: url })
      }).then(res => res.json())
        .then(data => {
          if (!data.success) {
            M.toast({ html: data.message, classes: "#e57373 red lighten-2" });
          } else {
            M.toast({ html: data.message, classes: "#a5d6a7 green lighten-2" });
            history.push('/');
          };
        }).catch(err => console.log(err));
    }
  }, [url, body, history, title]);

  const postDetails = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'socmedApp');
    data.append('cloud_name', 'dtx75b7pa');

    // upload photo to cloudinary
    fetch('https://api.cloudinary.com/v1_1/dtx75b7pa/image/upload', {
      method: 'POST',
      body: data
    }).then(res => res.json())
      .then(data => setUrl(data.url))
      .catch(err => console.log(err));
  };

  return (
    <div className="card input-field posting-box">
      <h4>Post Your Picture</h4>
      <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)} />

      <div className="file-field input-field">
        <div className="btn waves-effect waves-light #64b5f6 blue lighten-2">
          <span>Your Picture</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input type="text" className="file-path validate" />
        </div>
      </div>
      <button className="btn waves-effect waves-light green lighten-1" onClick={() => postDetails()}>Post</button>
    </div>
  )
};

export default CreatePostComponent;