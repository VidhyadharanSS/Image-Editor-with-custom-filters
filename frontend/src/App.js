import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from './components/Login';
import ImageEditor from './components/ImageEditor';
import Compress from './components/Compress';
import Stream from './components/Stream';
import Palette from "./components/Palette";
import ImageAnnotator from './components/ImageAnnotator';
import ImageProcessor from './components/ImageProcessor';
import ImageCollage from './components/ImageCollage';  // Import ImageCollage component
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Home />} path="home" />
          <Route element={<Login />} path="login" />
          <Route element={<Register />} path="register" />
          <Route element={<ImageEditor />} path="imageEditor" />
          <Route element={<Compress />} path="compress" />
          <Route element={<Stream />} path="stream" />
          <Route element={<Palette />} path="palette" />
          <Route element={<ImageAnnotator />} path="ImageAnnotator" />
          <Route element={<ImageProcessor />} path="imageProcessor" />
          <Route element={<ImageCollage />} path="imageCollage" /> {/* Add ImageCollage route */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
