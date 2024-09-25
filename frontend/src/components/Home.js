import React from "react";
import './Home.css'; // Add custom styles if needed

const Home = () => {
  return (
    <div className="App">
      <h1 className="head1" style={{ color: "rosybrown" }}>
        IMAGERML
      </h1>
      <hr />

      <div className="container mt-4">
        <div className="row">

          {/* Section 1 */}
          <div className="col-md-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">What is ImagerML?</h5>
                <p className="card-text">
                  ImagerML is an advanced image processing tool that utilizes machine learning techniques to enhance and edit images efficiently. 
                  By leveraging state-of-the-art algorithms, it automates complex tasks such as image enhancement, noise reduction, and feature extraction, 
                  making it accessible for both amateur photographers and professional editors.
                </p>
                <p className="card-text">
                  Our platform aims to simplify the image editing process, providing users with powerful tools to produce high-quality images without requiring extensive technical knowledge.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="col-md-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Features</h5>
                <p className="card-text">
                  ImagerML offers various features such as filters, effects, and advanced editing tools to enhance your images easily. Some of the key features include:
                </p>
                <ul className="card-text">
                  <li><strong>Smart Filters:</strong> Apply filters that adapt to the content of the image for optimal results.</li>
                  <li><strong>Image Restoration:</strong> Repair and restore old or damaged photographs seamlessly.</li>
                  <li><strong>Batch Processing:</strong> Edit multiple images at once, saving time and effort.</li>
                  <li><strong>Customizable Effects:</strong> Fine-tune effects to match your artistic vision.</li>
                  
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="col-md-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Get Started</h5>
                <p className="card-text">
                  Start using ImagerML today to transform your images with just a few clicks and experience the power of AI in image editing.
                  To get started:
                </p>
                <ol className="card-text">
                  <li><strong>Create an Account:</strong> Sign up to access all features and tools.</li>
                  <li><strong>Upload Your Images:</strong> Easily upload images from your device or cloud storage.</li>
                  <li><strong>Choose Your Tools:</strong> Select from a range of editing options to enhance your images.</li>
                  <li><strong>Download & Share:</strong> Save your edited images or share them directly on social media platforms.</li>
                </ol>
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
