import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatBot from './components/layout/ChatBot';
import NewsletterPopup from './components/NewsletterPopup';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Candidates from './pages/Candidates';
import CompaniesNew from './pages/CompaniesNew';
import LoginForm from './pages/LoginForm';
import DashboardCandidat from './pages/DashboardCandidat';
import DashboardEntreprise from './pages/DashboardEntreprise';
import Paiements from './pages/Paiements';
import Profile from './pages/Profile';
import FAQ from './pages/FAQ';
import NewsletterAdmin from './pages/NewsletterAdmin';
import './styles/globals.css';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  return (
    <div className="App">
      {!isAuthPage && !isDashboardPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/candidats" element={<Candidates />} />
        <Route path="/entreprises" element={<CompaniesNew />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dashboard-candidat"
          element={
            <ProtectedRoute allowedUserTypes={['candidate']}>
              <DashboardCandidat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-entreprise"
          element={
            <ProtectedRoute allowedUserTypes={['company']}>
              <DashboardEntreprise />
            </ProtectedRoute>
          }
        />
        <Route
          path="/paiements"
          element={<Paiements />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newsletter-admin"
          element={<NewsletterAdmin />}
        />
      </Routes>

      {!isAuthPage && !isDashboardPage && <Footer />}
      {!isAuthPage && !isDashboardPage && <ChatBot />}
      {!isAuthPage && !isDashboardPage && <NewsletterPopup />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
