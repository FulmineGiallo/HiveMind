import './App.css';
import Navbar from './NavbarBeforeLogin.js';
import Footer from './Footer.js';
import React, { useState, useEffect } from 'react';
import useFetch from './api/useFetch.js';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './HomePage.js'
import Login from './Login.js';
import Register from './Register.js'
import NotFound from './NotFound.js'

function App() 
{
  return (
    <Router>
      <div className= "App">
          <Navbar />
          <div className= "content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />



              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
      </div>
    </Router>
    
  );
}

export default App;
