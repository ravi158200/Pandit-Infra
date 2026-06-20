import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Hammer, ShieldAlert, ChevronDown, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onOpenQuote }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  // Desktop Links with Dropdown nesting
  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Services', 
      path: '/services',
      dropdown: [
        { name: 'Our Services', path: '/services' },
        { name: 'Projects', path: '/services/projects' },
        { name: 'Gallery', path: '/services/gallery' }
      ]
    },
    { name: 'Contact', path: '/contact' },
    { 
      name: 'About', 
      path: '/about',
      dropdown: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/about/careers' }
      ]
    },
  ];

  // Mobile Links (Flat hierarchy for touch accessibility)
  const mobileLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Services', path: '/services' },
    { name: 'Projects', path: '/services/projects' },
    { name: 'Gallery', path: '/services/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'About Us', path: '/about' },
    { name: 'Careers', path: '/about/careers' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path) && path !== '/';
  };

  const isAboutActive = () => {
    return location.pathname.startsWith('/about');
  };

  const isServicesActive = () => {
    return location.pathname.startsWith('/services');
  };

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">
      {/* Topbar with Contact Info */}
      <div className="bg-slate-900 text-slate-300 py-2 hidden lg:block text-xs font-semibold shadow-inner">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-brand-orange transition-colors">
              <Phone size={13} className="text-brand-orange" />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:info@panditinfra.com" className="flex items-center gap-1.5 hover:text-brand-orange transition-colors">
              <Mail size={13} className="text-brand-orange" />
              <span>info@panditinfra.com</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <MapPin size={13} className="text-brand-orange" />
            <span>102, Pandit Heights, Thane West, Mumbai, MH - 400601</span>
          </div>
        </div>
      </div>

      <nav className="w-full glass-navbar transition-all duration-300 border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-blue-700 text-white shadow-md transition-transform group-hover:rotate-6">
              <Hammer size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                PANDIT <span className="text-brand-orange">INFRA</span>
              </span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                Civil & Construction
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              if (link.dropdown) {
                const isDropdownAbout = link.name === 'About';
                const isHovered = isDropdownAbout ? isAboutHovered : isServicesHovered;
                const setHovered = isDropdownAbout ? setIsAboutHovered : setIsServicesHovered;
                const isLinkActive = isDropdownAbout ? isAboutActive() : isServicesActive();

                return (
                  <div
                    key={link.name}
                    className="relative py-2"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-1 py-1 text-sm font-semibold tracking-wide transition-colors duration-300 outline-none cursor-pointer ${
                        isLinkActive
                          ? 'text-brand-blue'
                          : 'text-slate-600 hover:text-brand-blue'
                      }`}
                    >
                      {link.name}
                      <ChevronDown 
                        size={14} 
                        className={`transition-transform duration-200 ${isHovered ? 'rotate-180 text-brand-blue' : ''}`} 
                      />
                    </button>

                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 mt-2 w-44 rounded-xl bg-white border border-slate-100 shadow-xl py-2.5 z-50 text-slate-800"
                        >
                          {link.dropdown.map((subLink) => (
                            <Link
                              key={subLink.name}
                              to={subLink.path}
                              onClick={() => setHovered(false)}
                              className={`block px-4 py-2 text-xs font-bold hover:bg-blue-50/50 hover:text-brand-blue hover:pl-5 transition-all duration-300 ${
                                isActive(subLink.path) 
                                  ? 'text-brand-blue pl-5' 
                                  : 'text-slate-600'
                              }`}
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-1 py-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-brand-blue'
                      : 'text-slate-600 hover:text-brand-blue'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Tools */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl shadow-md transition duration-200"
                >
                  <ShieldAlert size={16} />
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-bold border border-slate-300 hover:bg-slate-100 rounded-xl transition duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenQuote}
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/10 hover:shadow-orange-500/25 transition duration-200 transform hover:-translate-y-0.5"
              >
                Get Quote
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Wrapper */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-slate-100 bg-white overflow-hidden"
          >
            <div className="space-y-1.5 px-4 py-4">
              {mobileLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-semibold tracking-wide transition-colors ${
                    isActive(link.path)
                      ? 'bg-blue-50 text-brand-blue'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg"
                    >
                      <ShieldAlert size={18} />
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full py-3 border border-slate-200 hover:bg-slate-550 font-semibold rounded-lg text-slate-650"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenQuote();
                    }}
                    className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-md"
                  >
                    Get Free Quote
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
