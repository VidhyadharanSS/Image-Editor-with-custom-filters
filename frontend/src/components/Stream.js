import React, { useState } from 'react';
import './Stream.css';

const Stream = () => {
  const [image, setImage] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setStreaming(true);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please upload a valid image.');
    }
  };

  return (
    <div className="stream-container">
      <h1 className="stream-title">Live Image Stream Processor</h1>
      <div className={`stream-box ${streaming ? 'stream-active' : ''}`}>
        <label htmlFor="file-input" className="upload-label">
          Upload Image
        </label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />

        {error && <p className="error-message">{error}</p>}

        <div className="image-box">
          {image && (
            <div className="image-wrapper">
              <img src={image} alt="Uploaded" className="uploaded-image animated-image" />
              <div className="stream-overlay">
                <span className="streaming-text">Streaming...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stream;
