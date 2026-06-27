import React, { useState, useRef, useCallback, useEffect } from 'react';

const BeforeAfterSlider = ({ beforeImage, afterImage, beforeLabel = 'Before', afterLabel = 'After' }) => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0–100
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePos = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = (e) => { e.preventDefault(); setDragging(true); };
  const onTouchStart = () => setDragging(true);

  useEffect(() => {
    const onMouseMove = (e) => { if (dragging) updatePos(e.clientX); };
    const onTouchMove = (e) => { if (dragging) updatePos(e.touches[0].clientX); };
    const onUp = () => setDragging(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging, updatePos]);

  const placeholder = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 rounded-2xl overflow-hidden select-none cursor-ew-resize border border-slate-200 dark:border-slate-700 shadow-lg"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{ touchAction: 'none' }}
    >
      {/* AFTER image (full background) */}
      <img
        src={afterImage || placeholder}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* BEFORE image (clipped left side) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={beforeImage || placeholder}
          alt="Before"
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${(100 / sliderPos) * 100}%`, maxWidth: 'none' }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPos}%` }}
      />

      {/* Handle circle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-white z-10"
        style={{ left: `${sliderPos}%` }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M6 4L2 9L6 14" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 4L16 9L12 14" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* BEFORE label */}
      <div className="absolute top-3 left-3 bg-slate-900/75 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md pointer-events-none">
        {beforeLabel}
      </div>

      {/* AFTER label */}
      <div className="absolute top-3 right-3 bg-brand-orange/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md pointer-events-none">
        {afterLabel}
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
