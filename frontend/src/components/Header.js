// src/components/Header.js
import React from "react";  
import { NavLink } from "react-router-dom";
import './Header.css';

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a href="/" className="navbar-brand mt-2 mt-lg-0"></a>
            
            {/* Left links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home" style={{ fontWeight: 'bold' }}>
                  HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" style={{ fontWeight: 'bold' }}>
                  LOGIN
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register" style={{ fontWeight: 'bold' }}>
                  REGISTER
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/imageeditor" style={{ fontWeight: 'bold' }}>
                  IMAGE-EDITOR
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/compress" style={{ fontWeight: 'bold' }}>
                  COMPRESS
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/stream" style={{ fontWeight: 'bold' }}>
                  STREAM
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/palette" style={{ fontWeight: 'bold' }}>
                  COLOUR PALETTE
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/ImageAnnotator" style={{ fontWeight: 'bold' }}>
                  ANNOTATE
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/imageProcessor" style={{ fontWeight: 'bold' }}>
                  ADVANCED PROCESSING
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/imageCollage" style={{ fontWeight: 'bold' }}>
                  IMAGE COLLAGE BUILDER
                </NavLink> {/* Add Image Collage Builder route */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
