import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ShowcasePage from './pages/ShowcasePage';
import MyThinkingPage from './pages/MyThinkingPage';
import PlanningPage from './pages/PlanningPage';
import NotFoundPage from './pages/NotFoundPage';
import { ProtectedRoute } from './components/planning/ProtectedRoute';
import ScrollToTop from './components/shared/ScrollToTop';

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Helmet>
            <title>Rafi | Software Engineer, Researcher & 3D Designer</title>
            <meta name="description" content="Official portfolio of Nazmul Haque Rafi. Explore architectural visualizations, AI research, and high-performance web applications." />
          </Helmet>
          
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="showcase" element={<ShowcasePage />} />
              <Route path="thinking" element={<MyThinkingPage />} />
              <Route 
                path="planning" 
                element={
                  <ProtectedRoute>
                    <PlanningPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}
