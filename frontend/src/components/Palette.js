import React, { useState, useCallback } from 'react';
import { ColorExtractor } from 'react-color-extractor';
import './Palette.css'; // Import the CSS file

const Palette = () => {
  const [image, setImage] = useState(null);
  const [colorPalette, setColorPalette] = useState([]);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setError(null);
      };
      reader.onerror = () => {
        setError("Failed to read the image file. Please try again.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColors = useCallback((colors) => {
    if (colors.length > 0) {
      setColorPalette(colors);
      setError(null);
    } else {
      setError("No colors could be extracted from this image. Try a different image.");
    }
  }, []);

  const downloadPalette = () => {
    const paletteText = colorPalette.join('\n');
    const blob = new Blob([paletteText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'color-palette.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const clearPalette = () => {
    setImage(null);
    setColorPalette([]);
    setError(null);
  };

  return (
    <div className="App">
      <div className="color-palette-container">
        <h2>Upload Image to Extract Color Palette</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: '20px' }}
        />
        {error && (
          <div style={{ backgroundColor: '#FFEBEE', color: '#D32F2F', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        {image && (
          <ColorExtractor getColors={handleColors}>
            <img src={image} alt="Uploaded" className="uploaded-image" />
          </ColorExtractor>
        )}
        <div className="palette">
          <div className="colors">
            {colorPalette.map((color, index) => (
              <div
                key={index}
                className="color-swatch"
                style={{ backgroundColor: color }}
              >
                <span>{color}</span>
              </div>
            ))}
          </div>
        </div>
        {colorPalette.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <button onClick={downloadPalette} style={{ marginRight: '10px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Download Palette
            </button>
            <button onClick={clearPalette} style={{ padding: '10px', backgroundColor: '#F44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Palette;