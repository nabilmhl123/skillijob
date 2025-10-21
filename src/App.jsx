import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatBot from './components/layout/ChatBot';
import Home from './pages/Home';
import Candidates from './pages/Candidates';
import Companies from './pages/Companies';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/candidats" element={<Candidates />} />
          <Route path="/entreprises" element={<Companies />} />
        </Routes>

        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
