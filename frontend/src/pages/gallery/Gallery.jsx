import React, { useState, useEffect } from 'react';
import { Sparkles, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../../utils/api';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', 'Residential', 'Commercial', 'Infrastructure', 'Industrial', 'RCC', 'Renovation', 'Blueprint', 'Logo', 'General'];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await API.get('/gallery');
        setItems(res.data);
      } catch (err) {
        console.warn('Could not fetch gallery items, showing placeholders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.category?.toLowerCase() === selectedCategory.toLowerCase()));
    }
  }, [items, selectedCategory]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-slate-50 dark:bg-brand-dark transition-colors duration-300 font-sans pb-20">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-slate-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            Visual Showcases
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1">
            Site Photo Gallery
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Real photos captured by our site supervisors detailing concrete pouring, structural frames, and interior finishings.
          </p>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="py-6 bg-white dark:bg-brand-cardDark border-b border-slate-150 dark:border-slate-850 transition">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all border ${
                selectedCategory === cat
                  ? 'bg-brand-blue border-brand-blue text-white shadow-md'
                  : 'bg-transparent border-slate-200 dark:border-slate-850 text-slate-500 hover:border-slate-400 dark:hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 w-full animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 max-w-sm mx-auto">
              <Sparkles className="mx-auto text-slate-350 w-12 h-12 mb-3" />
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">No media uploaded</h4>
              <p className="text-xs text-slate-400 mt-1">Check back later or view other category links.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item._id || item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
                  onClick={() => openLightbox(index)}
                  className="relative h-64 overflow-hidden rounded-2xl group border border-slate-100 dark:border-slate-850 shadow-sm cursor-zoom-in"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title || 'Pandit Infra site'}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay Hover Details */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-10">
                    <span className="text-[10px] font-black text-brand-orange uppercase tracking-wider mb-1">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-white leading-snug flex items-center justify-between">
                      {item.title || 'Pandit Construction Site'}
                      <ZoomIn size={16} className="text-white/80" />
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Lightbox Pop-up Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4">
            
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white transition z-20"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Prev Image Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 md:left-8 p-3 rounded-full bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white transition z-20"
              aria-label="Previous Image"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Image display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={lightboxIndex}
              className="relative max-w-4xl max-h-[80vh] overflow-hidden rounded-xl border border-slate-800 shadow-2xl flex flex-col items-center justify-center bg-transparent z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-t-xl"
              />
              <div className="w-full bg-slate-900/90 text-left p-4 z-10 border-t border-slate-800 flex justify-between items-center text-xs font-semibold text-slate-400">
                <div>
                  <span className="block text-[10px] text-brand-orange uppercase">{filteredItems[lightboxIndex].category}</span>
                  <span className="text-white text-sm font-bold">{filteredItems[lightboxIndex].title || 'Pandit Civil Site'}</span>
                </div>
                <span>{lightboxIndex + 1} / {filteredItems.length}</span>
              </div>
            </motion.div>

            {/* Next Image Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-8 p-3 rounded-full bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white transition z-20"
              aria-label="Next Image"
            >
              <ChevronRight size={28} />
            </button>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
