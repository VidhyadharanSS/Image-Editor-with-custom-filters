import React, { useState } from 'react';
import './ImageAnnotator.css';

const ImageAnnotator = () => {
  const [image, setImage] = useState(null);
  const [watermarkText, setWatermarkText] = useState('');
  const [fontSize, setFontSize] = useState(70); // Default font size for the watermark
  const [annotatedImage, setAnnotatedImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [flip, setFlip] = useState('none'); // 'horizontal' or 'vertical'
  const [rotate, setRotate] = useState(0); // Degrees for rotation
  const [loading, setLoading] = useState(false); // To show progress

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setShowPreview(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnnotate = () => {
    setLoading(true); // Start loading
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = image;
    img.onload = () => {
      // Set canvas dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Apply transformations
      ctx.save(); // Save the current state

      // Flip the image
      if (flip === 'horizontal') {
        ctx.scale(-1, 1);
        ctx.drawImage(img, -img.width, 0);
      } else if (flip === 'vertical') {
        ctx.scale(1, -1);
        ctx.drawImage(img, 0, -img.height);
      } else {
        ctx.drawImage(img, 0, 0);
      }

      // Rotate the image
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotate * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore(); // Restore the context to original state

      // Adding semi-transparent watermark
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'; // Semi-transparent white
      ctx.textAlign = 'center';
      ctx.fillText(watermarkText, canvas.width / 2, canvas.height / 2); // Center the watermark

      // Set annotated image
      setAnnotatedImage(canvas.toDataURL());
      setShowPreview(true);
      setLoading(false); // Stop loading
    };
  };

  const handleReset = () => {
    setImage(null);
    setWatermarkText('');
    setFontSize(70);
    setAnnotatedImage(null);
    setShowPreview(false);
    setFlip('none');
    setRotate(0);
  };

  return (
    <div className="annotate-container">
      <h2>Annotate Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <div className="image-container">
          <div className="split-screen">
            <div className="original-image-container">
              <h3>Original Image</h3>
              <img src={image} alt="Original" className="original-image" />
            </div>
            <div className="processed-image-container">
              <h3>Processed Image</h3>
              {showPreview ? (
                <img src={annotatedImage} alt="Annotated" className="annotated-image" />
              ) : (
                <p>No processed image yet.</p>
              )}
            </div>
          </div>
          <div className="annotations">
            <input 
              type="text" 
              placeholder="Enter watermark text" 
              value={watermarkText} 
              onChange={(e) => setWatermarkText(e.target.value)} 
            />
            <div>
              <label>Watermark Font Size:</label>
              <input 
                type="number" 
                value={fontSize} 
                min="10" 
                max="100" 
                onChange={(e) => setFontSize(Number(e.target.value))} 
              />
            </div>
            <div>
              <label>Flip:</label>
              <select onChange={(e) => setFlip(e.target.value)}>
                <option value="none">None</option>
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
              </select>
            </div>
            <div>
              <label>Rotate:</label>
              <input 
                type="number" 
                value={rotate} 
                onChange={(e) => setRotate(Number(e.target.value))} 
              />
              <span>°</span>
              <progress value={rotate} max="360" className="rotation-progress" />
            </div>
            <button onClick={handleAnnotate}>Annotate</button>
            <button onClick={handleReset}>Reset</button>
            {loading && <progress className="loading-bar" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageAnnotator;
