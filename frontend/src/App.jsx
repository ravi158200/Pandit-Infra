import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// ── Components (organized by folder) ──────────────────
import Navbar      from './components/navbar/Navbar';
import Footer      from './components/footer/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import QuoteModal  from './components/modals/QuoteModal';

// ── Pages (organized by folder) ───────────────────────
import Home           from './pages/home/Home';
import About          from './pages/about/About';
import Services       from './pages/services/Services';
import Projects       from './pages/projects/Projects';
import Gallery        from './pages/gallery/Gallery';
import Careers        from './pages/careers/Careers';
import Contact        from './pages/contact/Contact';
import AdminLogin     from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

import { AuthProvider } from './context/AuthContext';

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <ScrollToHash />
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300">
          {/* Header Navigation */}
          <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />

          {/* Routing Content Area */}
          <main className="flex-grow">
            <Routes>
              <Route path="/"                   element={<Home      onOpenQuote={() => setIsQuoteOpen(true)} />} />
              <Route path="/about"              element={<About />} />
              <Route path="/services"           element={<Services  onOpenQuote={() => setIsQuoteOpen(true)} />} />
              <Route path="/services/projects"  element={<Projects />} />
              <Route path="/services/gallery"   element={<Gallery />} />
              <Route path="/about/careers"      element={<Careers />} />
              <Route path="/contact"            element={<Contact />} />
              <Route path="/admin-login"        element={<AdminLogin />} />
              <Route path="/admin/dashboard"    element={<AdminDashboard />} />
            </Routes>
          </main>

          {/* Footer & Social Contacts */}
          <Footer />

          {/* Floating Actions */}
          <WhatsAppButton />

          {/* Inquiry Form Modal */}
          <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
