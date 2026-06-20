import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    'Building Construction',
    'Road Construction',
    'Interior Work',
    'Plumbing Solutions',
    'RCC Work',
  ];

  const socialLinks = [
    {
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
      href: 'https://facebook.com'
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: 'https://twitter.com'
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      ),
      href: 'https://linkedin.com'
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.71.054 1.14.054 1.662.247 2.073.407.545.212.933.465 1.34.872.408.408.66.796.872 1.34.16.41.353.931.407 2.073.044.926.054 1.28.054 3.71s-.01 2.784-.054 3.71c-.054 1.14-.247 1.662-.407 2.073-.211.545-.465.933-.872 1.34-.408.408-.796.66-1.34.872-.41.16-.931.353-2.073.407-.926.044-1.28.054-3.71.054s-2.784-.01-3.71-.054c-1.14-.054-1.662-.247-2.073-.407-.545-.212-.933-.465-1.34-.872-.408-.408-.66-.796-.872-.34c-.16-.41-.353-.931-.407-2.073-.044-.926-.054-1.28-.054-3.71s.01-2.784.054-3.71c.054-1.14.247-1.662.407-2.073.212-.545.465-.933.872-1.34.408-.408.796-.66 1.34-.872.41-.16.931-.353 2.073-.407.926-.044 1.28-.054 3.71-.054zm0 2c-2.392 0-2.677.01-3.62.054-.887.04-1.368.188-1.688.313-.424.164-.726.36-1.043.678-.317.317-.514.62-.678 1.043-.125.32-.272.8-.313 1.688-.043.943-.054 1.228-.054 3.62s.01 2.677.054 3.62c.04.887.188 1.368.313 1.688.164.424.36.726.678 1.043.317.317.62.514 1.043.678.32.125.8.272 1.688.313.943.043 1.228.054 3.62.054s2.677-.01 3.62-.054c.887-.04 1.368-.188 1.688-.313.424-.164.726-.36 1.043-.678.317-.317.514-.62.678-1.043.125-.32.272-.8.313-1.688.043-.943.054-1.228.054-3.62s-.01-2.677-.054-3.62c-.04-.887-.188-1.368-.313-1.688-.164-.424-.36-.726-.678-1.043-.317-.317-.62-.514-1.043-.678-.32-.125-.8-.272-1.688-.313-.943-.043-1.228-.054-3.62-.054zm0 2.859c-2.839 0-5.141 2.302-5.141 5.141s2.302 5.141 5.141 5.141 5.141-2.302 5.141-5.141-2.302-5.141-5.141-5.141zm0 8.282c-1.735 0-3.141-1.406-3.141-3.141s1.406-3.141 3.141-3.141 3.141 1.406 3.141 3.141-1.406 3.141-3.141 3.141zm5.278-8.997c0-.625-.506-1.131-1.131-1.131s-1.131.506-1.131 1.131.506 1.131 1.131 1.131 1.131-.506 1.131-1.131z" clipRule="evenodd" />
        </svg>
      ),
      href: 'https://instagram.com'
    }
  ];

  return (
    <footer className="bg-slate-900 text-slate-350 pt-16 pb-8 border-t border-slate-800 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-blue-700 text-white shadow-md">
                <Hammer size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight text-white">
                  PANDIT <span className="text-brand-orange">INFRA</span>
                </span>
                <p className="text-[9px] uppercase font-bold tracking-widest text-slate-500">
                  Civil & Construction
                </p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              Pandit Infra is a premier infrastructure and civil engineering contracting firm. We build durable buildings, commercial centers, and transportation projects with absolute precision.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-brand-blue text-slate-400 hover:text-white flex items-center justify-center transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:w-8 after:bg-brand-orange">
              Company Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Home Page', path: '/' },
                { name: 'Services Catalog', path: '/services' },
                { name: 'Project Portfolio', path: '/services/projects' },
                { name: 'Photo Gallery', path: '/services/gallery' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'About History', path: '/about' },
                { name: 'Job Careers', path: '/about/careers' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200 text-slate-400"
                  >
                    <ArrowRight size={12} className="text-brand-orange" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Civil Services */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:w-8 after:bg-brand-orange">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to="/services"
                    className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200 text-slate-400"
                  >
                    <ArrowRight size={12} className="text-brand-orange" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:h-0.5 after:w-8 after:bg-brand-orange">
              Corporate Office
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-orange shrink-0 mt-0.5" />
                <span>
                  102, Pandit Heights, Commercial Highway Link Road, Thane West, Mumbai, MH - 400601
                </span>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-3 hover:text-white transition">
                  <Phone size={18} className="text-brand-orange shrink-0" />
                  <span>+91 98765 43210</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@panditinfra.com" className="flex items-center gap-3 hover:text-white transition">
                  <Mail size={18} className="text-brand-orange shrink-0" />
                  <span>info@panditinfra.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Banner */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} Pandit Infra Contracts Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/admin-login" className="hover:text-slate-300 font-semibold text-slate-600 transition">
              Admin Login Portal
            </Link>
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
