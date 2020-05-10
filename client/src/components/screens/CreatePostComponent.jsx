import React from 'react';

const CreatePostComponent = () => {
  return (
    <div className="card input-field posting-box">
      <h4>Post Your Picture</h4>
      <input type="text" placeholder="title" />
      <input type="text" placeholder="body" />

      <div className="file-field input-field">
        <div className="btn waves-effect waves-light #64b5f6 blue lighten-2">
          <span>Your Picture</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input type="text" className="file-path validate" />
        </div>
      </div>
      <button className="btn waves-effect waves-light green lighten-1">Post</button>
    </div>
  )
}

export default CreatePostComponent;