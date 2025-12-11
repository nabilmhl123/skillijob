import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { AuthProvider, useAuth } from './components/AuthProvider';
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
import PublierOffre from './pages/PublierOffre';
import Paiements from './pages/Paiements';
import Profile from './pages/Profile';
import FAQ from './pages/FAQ';
import NewsletterAdmin from './pages/NewsletterAdmin';
import './styles/globals.css';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

// Composant pour rediriger vers le bon dashboard selon le type d'utilisateur
function DashboardRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.userType === 'company') {
    return <Navigate to="/dashboard-entreprise" replace />;
  } else if (user.userType === 'candidate') {
    return <Navigate to="/dashboard-candidat" replace />;
  }

  // Par défaut, rediriger vers login si type inconnu
  return <Navigate to="/login" replace />;
}

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
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardRedirect />
            </ProtectedRoute>
          }
        />
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
          path="/publier-offre"
          element={
            <ProtectedRoute allowedUserTypes={['company']}>
              <PublierOffre />
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
    <ConvexProvider client={convex}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </AuthProvider>
    </ConvexProvider>
  );
}

export default App;
