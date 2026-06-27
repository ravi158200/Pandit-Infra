import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import API from '../../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceType: 'General Inquiry',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await API.post('/queries', formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        serviceType: 'General Inquiry',
      });
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit contact query.');
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    { title: 'Office Location', desc: '133, Star World Nr. Baghban Circle, Greencity Rd. Bhatha Surat  394510', icon: <MapPin size={22} className="text-orange-500" /> },
    { title: 'Phone Contacts', desc: '+91 6358755599', icon: <Phone size={22} className="text-blue-500" /> },
    { title: 'Email Inquiries', desc: 'panditinfra503@gmail.com', icon: <Mail size={22} className="text-emerald-500" /> },
    { title: 'Business Hours', desc: 'Monday - Saturday: 9:00 AM - 6:00 PM (Sunday Closed)', icon: <Clock size={22} className="text-amber-500" /> },
  ];  

  return (
    <div className="bg-slate-50 dark:bg-brand-dark transition-colors duration-300 font-sans pb-20">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-slate-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1">
            Contact Engineering Team
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Submit site layouts or schedule coordination meetings. We are here to align with your project constraints.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Column: Contact cards */}
            <div className="lg:col-span-1 space-y-6">
              {contactCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-brand-cardDark p-6 rounded-2xl border border-slate-150 dark:border-slate-850 shadow-sm flex items-start gap-4 hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-slate-50 dark:bg-brand-dark flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                      {card.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-semibold">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Contact form */}
            <div className="lg:col-span-2 bg-white dark:bg-brand-cardDark p-8 rounded-2xl border border-slate-150 dark:border-slate-850 shadow-premium transition">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                Send a Project Message
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
                Fill out the secure ledger form below to dispatch an direct alert to our site coordinators.
              </p>

              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="text-emerald-500 w-14 h-14 mb-4 animate-pulse" />
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Message Transmitted!</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 max-w-xs">
                    Your inquiry has been stored. The engineering desk will review and contact you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@gmail.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                        Inquiry Category
                      </label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-950 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-blue [&>option]:bg-white [&>option]:text-slate-950 dark:[&>option]:bg-brand-cardDark dark:[&>option]:text-slate-100"
                      >
                        <option value="General Inquiry">General Civil Inquiry</option>
                        <option value="Building Construction">Building Construction</option>
                        <option value="Road Construction">Road Construction</option>
                        <option value="Interior Fitout">Interior fit-out</option>
                        <option value="RCC Concrete Foundations">RCC Foundation works</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                      Scope Specifications / Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Specify total built area, road length, timeline deadlines..."
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none"
                    />
                  </div>

                  {error && <p className="text-red-500 text-xs font-medium">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-orange-500/25 transition duration-300 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={16} />
                        Transmit Inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md h-96 w-full">
          {/* Real Google Maps Iframe */}
          <iframe
            src="https://maps.google.com/maps?q=133+Star+World+Baghban+Circle+Greencity+Road+Bhatha+Surat+394510+Gujarat+India&output=embed&z=16"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Pandit Infra Office Location - Bhatha, Surat"
          ></iframe>
        </div>
      </section>

    </div>
  );
};

export default Contact;
