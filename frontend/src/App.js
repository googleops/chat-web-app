import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './Navbar';
import Homepage from './Homepage';


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;