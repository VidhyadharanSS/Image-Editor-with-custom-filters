import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import html2canvas from 'html2canvas';
import './ImageCollage.css';

const ImageCollage = () => {
  const [images, setImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const collageRef = useRef(null); // Ref for the collage container

  // Handle file drop and add images to collage
  const onDrop = useCallback((acceptedFiles) => {
    const uploadedImages = acceptedFiles.map(file => ({
      id: file.name,
      src: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  // Handle drag and drop for collage layout
  const onDragStart = (image) => {
    setDraggedImage(image);
  };

  const onDropImage = (index) => {
    if (draggedImage) {
      const updatedImages = [...images];
      const draggedIndex = images.findIndex(img => img.id === draggedImage.id);
      updatedImages.splice(draggedIndex, 1); // Remove the dragged image from the previous position
      updatedImages.splice(index, 0, draggedImage); // Insert it into the new position
      setImages(updatedImages);
      setDraggedImage(null);
    }
  };

  // Remove image from collage
  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  // Download collage as an image
  const downloadCollage = async () => {
    if (collageRef.current) {
      const canvas = await html2canvas(collageRef.current);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'collage.png';
      link.click();
    }
  };

  return (
    <div className="collage-builder-container">
      <h2 className="title">Image Collage Builder</h2>

      {/* Dropzone for image upload */}
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag 'n' drop some images here, or click to select images</p>
      </div>

      <div className="collage-grid" ref={collageRef}>
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`collage-item ${index === hoveredIndex ? 'hover' : ''}`}
            draggable
            onDragStart={() => onDragStart(image)}
            onDragOver={() => setHoveredIndex(index)}
            onDragLeave={() => setHoveredIndex(null)}
            onDrop={() => onDropImage(index)}
          >
            <img src={image.src} alt="collage-img" className="collage-image" />
            <button className="remove-button" onClick={() => removeImage(image.id)}>✖</button>
          </div>
        ))}
      </div>

      {/* Download button */}
      {images.length > 0 && (
        <button className="download-button" onClick={downloadCollage}>
          Download Collage
        </button>
      )}
    </div>
  );
};

export default ImageCollage;
