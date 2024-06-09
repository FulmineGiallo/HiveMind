import './App.css';
import NavBar from './NavBar.js'
import NavBarAfterLogin from './NavBarAfterLogin.js';
import Footer from './Footer.js';
import React, { useState, useEffect } from 'react';
import useFetch from './api/useFetch.js';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './HomePage.js';
import Login from './Login.js';
import Register from './Register.js';
import NotFound from './NotFound.js';
import { AuthProvider, useAuth} from './AuthContex.js';
import ProtectedRoute from './route/ProtecteRoute.js';
import PublicRoute from './route/PublicRoute.js'; // Importa la nuova rotta pubblica
import ProtectedComponent from './route/ProtectedComponent.js';

const AppContent = () => {
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    console.log(`User is ${isLoggedIn ? 'logged in' : 'logged out'}`);
  }, [isLoggedIn]);
  
  return (
    <>
      {isLoggedIn ? <NavBarAfterLogin /> : <NavBar />}
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<ProtectedComponent />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;