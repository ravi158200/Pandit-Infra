import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, PhoneCall, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import local civil construction slide images
import hero1 from '../../assets/hero/hero1.png';
import hero2 from '../../assets/hero/hero2.png';
import hero3 from '../../assets/hero/hero3.png';

const Hero = ({ onOpenQuote }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: hero1,
      title: 'Building Concrete Foundations For Tomorrow',
      subtitle: 'Premium high-rise, commercial complexes, and modern housing properties engineered to highest safety standards.',
    },
    {
      image: hero2,
      title: 'Connecting Towns with Modern Paving Solutions',
      subtitle: 'Express highways, urban industrial roads, and arterial paving constructed using state-of-the-art bitumen technology.',
    },
    {
      image: hero3,
      title: 'Precision Structural CAD & Mechanical Designs',
      subtitle: 'Expert engineering analysis, structural blueprint modeling, and soil stability checks for heavy RCC projects.',
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[85vh] min-h-[580px] w-full overflow-hidden bg-slate-950 font-sans">
      
      {/* Background Images with Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Overlay Dark Tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-950/60 z-10" />
          <img
            src={slides[currentSlide].image}
            alt="Construction background"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Container */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          
          {/* Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-bold uppercase tracking-widest"
          >
            <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
            ISO 9001:2015 Certified Builders
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
          >
            {slides[currentSlide].title.split(' ').map((word, idx) => {
              // highlight certain words
              const highlightWords = ['Concrete', 'Tomorrow', 'Modern', 'Paving', 'Structural', 'Designs'];
              const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
              if (highlightWords.includes(cleanWord)) {
                return <span key={idx} className="text-brand-yellow font-black">{word} </span>;
              }
              return word + ' ';
            })}
          </motion.h1>

          {/* Subheading Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl"
          >
            {slides[currentSlide].subtitle}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <button
              onClick={onOpenQuote}
              className="bg-brand-orange hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition flex items-center gap-2 group text-sm"
            >
              Request Free Estimation
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            
            <Link
              to="/services"
              className="bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700/60 font-semibold px-6 py-3.5 rounded-xl transition flex items-center gap-2 text-sm backdrop-blur"
            >
              Our Civil Services
              <ChevronRight size={18} />
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-8 bg-brand-yellow' : 'w-2 bg-slate-500/50 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default Hero;
