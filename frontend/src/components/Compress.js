import React, { useState } from "react";
import { saveAs } from "file-saver";
import './Compress.css';  // Import the CSS file

const Compress = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [compressionType, setCompressionType] = useState("standard");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [quality, setQuality] = useState(75); // Default quality set to 75
    const [compressedImage, setCompressedImage] = useState(null);
    const [originalImage, setOriginalImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [compressionRatio, setCompressionRatio] = useState(null);
    const [fileSizeLimit] = useState(5 * 1024 * 1024); // 5 MB limit

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file.size > fileSizeLimit) {
            setError("File size exceeds 5 MB limit.");
            setSelectedFile(null);
            return;
        }
        setSelectedFile(file);
        setOriginalImage(URL.createObjectURL(file)); // Set original image URL
        setCompressedImage(null); // Reset compressed image on file change
        setCompressionRatio(null); // Reset compression ratio
        setError(""); // Clear error message
    };

    const handleCompressionChange = (e) => {
        setCompressionType(e.target.value);
    };

    const compressImage = async (file) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                let newWidth = img.width;
                let newHeight = img.height;

                switch (compressionType) {
                    case "huffman":
                        // Placeholder for Huffman coding (not implemented)
                        newWidth = img.width;
                        newHeight = img.height;
                        break;
                    case "lossy":
                        newWidth = img.width * 0.75; // Resize to 75% for lossy compression
                        newHeight = img.height * 0.75;
                        break;
                    case "standard":
                        newWidth = img.width;
                        newHeight = img.height;
                        break;
                    case "input-based":
                        newWidth = parseInt(width) || img.width;
                        newHeight = parseInt(height) || img.height;
                        break;
                    default:
                        return reject(new Error("Invalid compression type"));
                }

                canvas.width = newWidth;
                canvas.height = newHeight;

                // Draw the image on the canvas
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                // Get the compressed image data
                const qualityValue = quality / 100; // Convert to a value between 0 and 1
                canvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        setCompressedImage(url);
                        setCompressionRatio((blob.size / file.size).toFixed(2)); // Calculate and set compression ratio
                        resolve(blob);
                    } else {
                        reject(new Error("Compression failed"));
                    }
                }, "image/jpeg", qualityValue);
            };
            img.onerror = reject;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (selectedFile) {
            try {
                await compressImage(selectedFile);
            } catch (err) {
                setError("Error during compression. Please try again.");
                console.error(err);
            }
        }

        setLoading(false);
    };

    const downloadImage = () => {
        if (compressedImage) {
            saveAs(compressedImage, "compressed_image.jpg");
        }
    };

    return (
        <div className="compress-container">
            <h1>Image Compression</h1>
            <form className="compress-form" onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} required />
                <select value={compressionType} onChange={handleCompressionChange}>
                    <option value="standard">Standard Compression</option>
                    <option value="lossy">Lossy Compression</option>
                    <option value="huffman">Huffman Coding</option>
                    <option value="input-based">Input Based Compression</option>
                </select>
                {compressionType === "input-based" && (
                    <>
                        <input
                            type="number"
                            placeholder="Width"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Height"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            required
                        />
                    </>
                )}
                <input
                    type="number"
                    placeholder="Quality (0-100)"
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    required
                />
                <button type="submit" className="compress-button" disabled={loading}>
                    {loading ? "Compressing..." : "Compress"}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>

            <div className="image-display">
                {originalImage && (
                    <div className="image-container">
                        <h2>Original Image:</h2>
                        <img src={originalImage} alt="Original" />
                    </div>
                )}
                {compressedImage && (
                    <div className="image-container">
                        <h2>Compressed Image:</h2>
                        <img src={compressedImage} alt="Compressed" />
                    </div>
                )}
            </div>

            {compressionRatio && (
                <p className="compression-ratio">Compression Ratio: {compressionRatio}</p>
            )}

            {compressedImage && (
                <div className="progress-container">
                    <div className="progress-label">Quality: {quality}%</div>
                    <div className="progress-bar" style={{ width: `${quality}%` }}></div>
                </div>
            )}

            {compressedImage && (
                <button className="download-button" onClick={downloadImage}>
                    Download Compressed Image
                </button>
            )}
        </div>
    );
};

export default Compress;
