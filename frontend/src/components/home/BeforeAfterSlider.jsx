import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MoveHorizontal, CheckCircle } from 'lucide-react';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  // High-res realistic Unsplash civil construction images
  const beforeImg = "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1600&q=80"; // Heavy Excavation Site
  const afterImg = "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1600&q=80"; // Finished Infrastructure Highway / PEB

  return (
    <section className="py-24 bg-white text-slate-900 overflow-hidden relative" id="transformation-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 border border-orange-200 text-xs font-extrabold uppercase tracking-wider"
          >
            <Sparkles size={14} className="text-orange-500" />
            Engineering Excellence in Action
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900"
          >
            Raw Site to <span className="text-orange-600">Finished Infrastructure</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed"
          >
            Drag the interactive slider below to compare raw excavation ground conditions with completed Pandit Infra heavy civil paving and structural framing.
          </motion.p>
        </div>

        {/* Interactive Image Comparison Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto h-[380px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200 select-none cursor-ew-resize"
          ref={containerRef}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* AFTER Image (Full background) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={afterImg}
              alt="Completed Infrastructure Project"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-400" />
              Completed Project (After)
            </div>
          </div>

          {/* BEFORE Image (Clipped overlay) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeImg}
              alt="Raw Excavation Site"
              className="w-full h-full object-cover max-w-none"
              style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
            />
            <div className="absolute top-4 left-4 bg-orange-600/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
              Site Excavation (Before)
            </div>
          </div>

          {/* Divider Line & Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-orange-600 text-white border-4 border-white shadow-2xl flex items-center justify-center font-bold">
              <MoveHorizontal size={20} />
            </div>
          </div>

        </motion.div>

        {/* Caption */}
        <div className="mt-6 text-center text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
          <span>👈 Drag left or right to inspect structural transformation 👉</span>
        </div>

      </div>
    </section>
  );
};

export default BeforeAfterSlider;
