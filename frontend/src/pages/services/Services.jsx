import React, { useState, useEffect } from 'react';
import { Sparkles, X, Hammer, ArrowRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard from '../../components/cards/ServiceCard';
import API from '../../utils/api';

const Services = ({ onOpenQuote }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get('/services');
        setServices(res.data);
      } catch (err) {
        console.warn('Could not fetch services, displaying placeholders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-brand-dark transition-colors duration-300 font-sans pb-20">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-slate-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            Engineering Excellence
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1">
            Civil Construction Services
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Professional turn-key solutions spanning building foundation rafts, heavy pavement roadways, PEB steel sheds, and corporate interior refits.
          </p>
        </div>
      </section>

      {/* Grid List */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 w-full animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service._id || service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                >
                  <ServiceCard
                    service={service}
                    onLearnMore={(s) => setSelectedService(s)}
                  />
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Details Specifications Dialog Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white dark:bg-brand-cardDark rounded-2xl overflow-hidden shadow-2xl z-10 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row"
            >
              
              {/* Close button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition z-20"
              >
                <X size={18} />
              </button>

              {/* Side Banner Image */}
              <div className="w-full md:w-2/5 h-48 md:h-auto relative bg-slate-100 dark:bg-slate-800 shrink-0">
                <img
                  src={selectedService.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'}
                  alt={selectedService.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-dark/20 to-brand-dark/80" />
              </div>

              {/* Detailed Specs Text */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-brand-orange text-[10px] font-extrabold uppercase tracking-widest mb-2">
                    <Sparkles size={12} />
                    Detailed Scope Sheet
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
                    {selectedService.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 mb-6">
                    {selectedService.detailedDescription}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
                    <h5 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Standard Quality Parameters
                    </h5>
                    <ul className="text-xs space-y-1.5 text-slate-500 dark:text-slate-400 font-medium list-disc pl-4">
                      <li>Code-compliant concrete mixes (M20, M25, M30 grades)</li>
                      <li>Fe 500 / Fe 550 TMT steel reinforcing bars</li>
                      <li>Anti-termite layout foundation proofing</li>
                      <li>Double-coat chemical waterproof sealings</li>
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      onOpenQuote();
                    }}
                    className="flex items-center justify-center gap-2 bg-brand-orange hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-md text-sm transition"
                  >
                    Request Quote for {selectedService.title}
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-semibold transition"
                  >
                    Close Specifications
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Services;
