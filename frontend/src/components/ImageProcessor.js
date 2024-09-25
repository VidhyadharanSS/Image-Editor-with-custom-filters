import React, { useState } from 'react';
import './ImageProcessor.css';

const ImageProcessor = () => {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [operation, setOperation] = useState('edge'); // Default to edge detection
  const [loading, setLoading] = useState(false); // For progress bar

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyProcessing = () => {
    if (!image) return;
    setLoading(true);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      let processedData;
      if (operation === 'edge') {
        processedData = edgeDetection(imageData);
      } else if (operation === 'morph') {
        processedData = morphologicalOperations(imageData);
      } else if (operation === 'segment') {
        processedData = imageSegmentation(imageData);
      }

      ctx.putImageData(processedData, 0, 0);
      setProcessedImage(canvas.toDataURL());
      setLoading(false);
    };
  };

  const edgeDetection = (imageData) => {
    const { data, width, height } = imageData;
    const edgeData = new Uint8ClampedArray(data);

    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let pixelX = 0;
        let pixelY = 0;
        for (let j = -1; j <= 1; j++) {
          for (let i = -1; i <= 1; i++) {
            const index = (y + j) * width + (x + i);
            const grey = data[index * 4]; // Grey value
            const sobelIndex = (j + 1) * 3 + (i + 1);
            pixelX += grey * sobelX[sobelIndex];
            pixelY += grey * sobelY[sobelIndex];
          }
        }
        const magnitude = Math.sqrt(pixelX ** 2 + pixelY ** 2);
        const newPixelIndex = (y * width + x) * 4;
        edgeData[newPixelIndex] = magnitude;
        edgeData[newPixelIndex + 1] = magnitude;
        edgeData[newPixelIndex + 2] = magnitude;
        edgeData[newPixelIndex + 3] = 255;
      }
    }
    return new ImageData(edgeData, width, height);
  };

  const morphologicalOperations = (imageData) => {
    const { data, width, height } = imageData;
    const morphedData = new Uint8ClampedArray(data);

    // Simple dilation and erosion (morphological operations)
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const index = (y * width + x) * 4;
        const grey = data[index]; // Get greyscale value

        // Dilation - expand bright areas
        if (grey > 128) {
          for (let j = -1; j <= 1; j++) {
            for (let i = -1; i <= 1; i++) {
              const dilateIndex = ((y + j) * width + (x + i)) * 4;
              morphedData[dilateIndex] = 255;
              morphedData[dilateIndex + 1] = 255;
              morphedData[dilateIndex + 2] = 255;
              morphedData[dilateIndex + 3] = 255;
            }
          }
        }

        // Erosion - shrink dark areas
        if (grey < 128) {
          for (let j = -1; j <= 1; j++) {
            for (let i = -1; i <= 1; i++) {
              const erodeIndex = ((y + j) * width + (x + i)) * 4;
              morphedData[erodeIndex] = 0;
              morphedData[erodeIndex + 1] = 0;
              morphedData[erodeIndex + 2] = 0;
              morphedData[erodeIndex + 3] = 255;
            }
          }
        }
      }
    }
    return new ImageData(morphedData, width, height);
  };

  const imageSegmentation = (imageData) => {
    const { data, width, height } = imageData;
    const segmentedData = new Uint8ClampedArray(data);

    // Simple thresholding segmentation
    for (let i = 0; i < data.length; i += 4) {
      const grey = data[i]; // Get greyscale value
      if (grey > 128) {
        // Foreground
        segmentedData[i] = 255;
        segmentedData[i + 1] = 255;
        segmentedData[i + 2] = 255;
        segmentedData[i + 3] = 255;
      } else {
        // Background
        segmentedData[i] = 0;
        segmentedData[i + 1] = 0;
        segmentedData[i + 2] = 0;
        segmentedData[i + 3] = 255;
      }
    }
    return new ImageData(segmentedData, width, height);
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'processed_image.png';
      link.click();
    }
  };

  return (
    <div className="image-processor-container">
      <h2 className="title">Advanced Image Processor</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <div className="controls">
        <label>Choose Operation:</label>
        <select onChange={(e) => setOperation(e.target.value)}>
          <option value="edge">Edge Detection</option>
          <option value="morph">Morphological Operations</option>
          <option value="segment">Image Segmentation</option>
        </select>
        <button onClick={applyProcessing}>Process Image</button>
      </div>

      {/* Progress Bar */}
      {loading && (
        <div className="progress-bar">
          <div className="progress-bar-fill"></div>
        </div>
      )}

      {/* Split Screen for Original and Processed Image */}
      {image && (
        <div className="split-screen">
          <div className="image-container">
            <h3>Original Image</h3>
            <img src={image} alt="Original" className="original-image" />
          </div>
          {processedImage && (
            <div className="image-container">
              <h3>Processed Image</h3>
              <img src={processedImage} alt="Processed" className="processed-image" />
              <button onClick={handleDownload} className="download-btn">Download Processed Image</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageProcessor;
