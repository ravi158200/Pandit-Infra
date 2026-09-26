import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, HardHat, Compass, ShieldAlert, Award, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

import hero1 from '../../assets/hero/hero1.png';
import hero2 from '../../assets/hero/hero2.png';
import hero3 from '../../assets/hero/hero3.png';

const Hero = ({ onOpenQuote }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: hero1,
      title: 'Building Mega Civil Foundations For Tomorrow',
      subtitle: 'Turn-key commercial complexes, highway corridors, heavy earthworks, and PEB steel structures engineered to highest seismic & safety standards.',
      badge: 'ISO 9001:2015 Certified Engineering Firm'
    },
    {
      image: hero2,
      title: 'Connecting Industries with Modern Road Paving',
      subtitle: 'Express highways, urban industrial access roads, and heavy paving constructed using high-density bitumen and laser GPS grading.',
      badge: 'IRC Code Compliant Bituminous Paving'
    },
    {
      image: hero3,
      title: 'Precision Structural CAD & Heavy Steel PEB',
      subtitle: 'Turn-key structural blueprint modeling, soil bearing analysis, and heavy clear-span PEB steel erection for industrial complexes.',
      badge: 'Advanced Structural Engineering Tech'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative min-h-[90vh] lg:min-h-[640px] w-full overflow-hidden bg-slate-950 font-sans flex items-center justify-center">
      
      {/* Dynamic Background Image Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 z-10" />
          <img
            src={slides[currentSlide].image}
            alt="Pandit Infra Engineering Hero"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* High-Tech Blueprint Ambient Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 z-10 pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-orange-600/20 rounded-full blur-[140px] z-10 pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Text */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Dynamic Badge */}
            <motion.div
              key={`badge-${currentSlide}`}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-widest backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full bg-orange-400 animate-ping" />
              {slides[currentSlide].badge}
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]"
            >
              {slides[currentSlide].title.split(' ').map((word, idx) => {
                const highlightWords = ['Mega', 'Tomorrow', 'Modern', 'Paving', 'Structural', 'PEB', 'Foundations'];
                const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
                if (highlightWords.includes(cleanWord)) {
                  return <span key={idx} className="text-amber-400 font-black">{word} </span>;
                }
                return word + ' ';
              })}
            </motion.h1>

            {/* Subtitle Description */}
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl"
            >
              {slides[currentSlide].subtitle}
            </motion.p>

            {/* Action Buttons & Quick Nav */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <button
                onClick={onOpenQuote}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 flex items-center gap-2 group text-xs uppercase tracking-wider cursor-pointer transform hover:-translate-y-0.5"
              >
                Request Official Quote
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#blueprint-explorer"
                className="bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 font-bold px-6 py-4 rounded-2xl transition flex items-center gap-2 text-xs uppercase tracking-wider backdrop-blur-md hover:border-blue-500/50"
              >
                <Compass size={15} className="text-blue-400" />
                Blueprint Visualizer
              </a>
            </motion.div>

          </div>

          {/* Right Floating Metric Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-4 hidden lg:block"
          >
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                  Pandit Infra Track Record
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xl">
                    150+
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Turn-key Projects Handed Over</h4>
                    <p className="text-[11px] text-slate-400">Roads, Bridges & PEB Sheds</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xl">
                    100%
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">IS/IRC Code Compliance</h4>
                    <p className="text-[11px] text-slate-400">Zero structural audit defects</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <p className="text-[11px] font-bold text-slate-400">
                  ⚡ Heavy Machinery Fleet On Standby
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Slide Navigation Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === index ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default Hero;
