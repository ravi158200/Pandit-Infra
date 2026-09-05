import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Info, CheckCircle2, ShieldCheck, Compass, Sliders, Cpu } from 'lucide-react';

const BLUEPRINTS = [
  {
    id: 'road-paving',
    title: 'Heavy Asphalt Road Cross-Section',
    subtitle: 'IRC:37 Compliant Multi-Layer Flexible Pavement Structure',
    hotspots: [
      { id: 1, title: 'Surface Wear Layer (40mm SMA)', x: '75%', y: '18%', spec: 'Bituminous Concrete with polymer-modified bitumen (PMB) for crack resistance & heavy axle load endurance.' },
      { id: 2, title: 'Dense Bituminous Macadam (DBM - 80mm)', x: '60%', y: '35%', spec: 'High-density load-bearing asphalt binder course designed for zero rutting under heavy freight.' },
      { id: 3, title: 'Wet Mix Macadam (WMM Sub-base 250mm)', x: '45%', y: '55%', spec: 'Crushed stone aggregate bound with moisture control to absorb dynamic structural impact.' },
      { id: 4, title: 'Granular Sub-Base (GSB 200mm)', x: '30%', y: '75%', spec: 'Free-draining aggregate layer preventing capillary water rise and frost heave.' },
      { id: 5, title: 'Compacted Subgrade (CBR > 10%)', x: '15%', y: '90%', spec: 'Laser-guided heavy vibratory roller compaction ensuring 98% Proctor density.' }
    ]
  },
  {
    id: 'rcc-foundation',
    title: 'RCC Deep Foundation & Frame',
    subtitle: 'IS 456 Seismic Grade 5 Fe550 TMD Reinforced Concrete',
    hotspots: [
      { id: 1, title: 'Grade Fe550 TMT Reinforcement Mesh', x: '40%', y: '25%', spec: 'High-ductility steel rebar cage tied with double binding wire for maximum shear stress resistance.' },
      { id: 2, title: 'M35 Self-Compacting Concrete (SCC)', x: '65%', y: '45%', spec: 'Monolithic concrete mix with microsilica additives ensuring zero voids and low permeability.' },
      { id: 3, title: 'Heavy Foundation Raft Base (1.5m)', x: '50%', y: '70%', spec: 'Heavy spread raft spreading structural weight across subterranean rock layers.' },
      { id: 4, title: 'Anti-Termite & Waterproofing Membrane', x: '25%', y: '85%', spec: 'Dual elastomer damp-proof course preventing groundwater ingress into RCC.' }
    ]
  },
  {
    id: 'peb-steel',
    title: 'PEB Pre-Engineered Steel Shed',
    subtitle: 'High-Yield Grade 345 Steel Frame with Clear Span Truss',
    hotspots: [
      { id: 1, title: 'Tapered Structural Steel Column', x: '20%', y: '50%', spec: 'Precision CNC-plasma cut web plates welded with submerged arc welding (SAW) for 35m clear span.' },
      { id: 2, title: 'Galvalume Standing Seam Roof Panel', x: '50%', y: '15%', spec: 'AZ150 corrosion-resistant steel sheeting with mineral wool acoustic insulation.' },
      { id: 3, title: 'High-Tensile Anchor Bolt Assembly', x: '20%', y: '85%', spec: 'Grade 8.8 galvanized J-bolts embedded deep in RCC pedestal foundations.' },
      { id: 4, title: 'Z-Purlin Secondary Framing System', x: '70%', y: '30%', spec: 'Cold-formed galvanized steel purlins with sag rods for roof load transfer.' }
    ]
  }
];

const BlueprintVisualizer = () => {
  const [activeBlueprint, setActiveBlueprint] = useState(BLUEPRINTS[0]);
  const [selectedHotspot, setSelectedHotspot] = useState(BLUEPRINTS[0].hotspots[0]);

  const handleTabChange = (blueprint) => {
    setActiveBlueprint(blueprint);
    setSelectedHotspot(blueprint.hotspots[0]);
  };

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden" id="blueprint-explorer">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Compass size={14} className="text-blue-400" />
              Structural Engineering Visualizer
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Interactive Civil <span className="shimmer-text">Blueprint Explorer</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Click engineering hotspots below to inspect material specifications, IS/IRC code compliance, and structural integrity standards.
            </p>
          </div>

          {/* Blueprint Selector Tabs */}
          <div className="flex flex-wrap gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
            {BLUEPRINTS.map((bp) => {
              const isActive = activeBlueprint.id === bp.id;
              return (
                <button
                  key={bp.id}
                  onClick={() => handleTabChange(bp)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-orange-500 text-slate-950 font-black shadow-md shadow-orange-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {bp.title.split(' ')[0]} {bp.title.split(' ')[1]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Diagram Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
          
          {/* Left Visual Diagram with Hotspot Markers */}
          <div className="lg:col-span-7 relative bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-hidden">
            
            {/* SVG Visual Blueprint Illustration */}
            <div className="w-full h-full relative flex items-center justify-center">
              
              {/* Dynamic SVG graphics for structure */}
              {activeBlueprint.id === 'road-paving' && (
                <svg className="w-full h-64 text-orange-500/40" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Layer 1: Wear Course */}
                  <path d="M50 60 L550 60 L550 90 L50 90 Z" fill="#ea580c" fillOpacity="0.4" stroke="#ea580c" strokeWidth="2"/>
                  <text x="70" y="80" fill="#f97316" fontSize="12" fontWeight="bold">SMA Wear Layer 40mm</text>
                  {/* Layer 2: DBM */}
                  <path d="M50 90 L550 90 L550 140 L50 140 Z" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2"/>
                  <text x="70" y="120" fill="#60a5fa" fontSize="12" fontWeight="bold">Dense Bituminous Macadam 80mm</text>
                  {/* Layer 3: WMM */}
                  <path d="M50 140 L550 140 L550 200 L50 200 Z" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="2"/>
                  <text x="70" y="175" fill="#fbbf24" fontSize="12" fontWeight="bold">Wet Mix Macadam Sub-Base 250mm</text>
                  {/* Layer 4: GSB */}
                  <path d="M50 200 L550 200 L550 260 L50 260 Z" fill="#64748b" fillOpacity="0.3" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4"/>
                  <text x="70" y="235" fill="#cbd5e1" fontSize="12" fontWeight="bold">Granular Sub-Base (GSB) 200mm</text>
                </svg>
              )}

              {activeBlueprint.id === 'rcc-foundation' && (
                <svg className="w-full h-64 text-blue-500/40" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Column */}
                  <path d="M220 30 L380 30 L380 180 L220 180 Z" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2"/>
                  {/* Raft Base */}
                  <path d="M120 180 L480 180 L480 270 L120 270 Z" fill="#ea580c" fillOpacity="0.3" stroke="#ea580c" strokeWidth="2"/>
                  {/* Rebar lines */}
                  <line x1="240" y1="40" x2="240" y2="250" stroke="#f59e0b" strokeWidth="3"/>
                  <line x1="360" y1="40" x2="360" y2="250" stroke="#f59e0b" strokeWidth="3"/>
                  <line x1="240" y1="90" x2="360" y2="90" stroke="#f59e0b" strokeWidth="2"/>
                  <line x1="240" y1="140" x2="360" y2="140" stroke="#f59e0b" strokeWidth="2"/>
                  <text x="245" y="115" fill="#fbbf24" fontSize="12" fontWeight="bold">Fe550 Rebar Cage</text>
                </svg>
              )}

              {activeBlueprint.id === 'peb-steel' && (
                <svg className="w-full h-64 text-amber-500/40" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Roof Gable */}
                  <path d="M80 140 L300 40 L520 140" stroke="#ea580c" strokeWidth="4" strokeLinecap="round"/>
                  {/* Left Column */}
                  <path d="M100 140 L100 270" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round"/>
                  {/* Right Column */}
                  <path d="M500 140 L500 270" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round"/>
                  {/* Purlin Trusses */}
                  <line x1="100" y1="140" x2="500" y2="140" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 6"/>
                  <line x1="200" y1="90" x2="400" y2="90" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 6"/>
                </svg>
              )}

              {/* Hotspot Markers Overlay */}
              {activeBlueprint.hotspots.map((spot) => {
                const isSelected = selectedHotspot?.id === spot.id;
                return (
                  <motion.button
                    key={spot.id}
                    onClick={() => setSelectedHotspot(spot)}
                    style={{ left: spot.x, top: spot.y }}
                    whileHover={{ scale: 1.25 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                  >
                    <span className={`relative flex h-7 w-7 items-center justify-center rounded-full font-black text-xs transition-all ${
                      isSelected
                        ? 'bg-orange-500 text-slate-950 ring-4 ring-orange-500/30 scale-110 shadow-lg shadow-orange-500/50'
                        : 'bg-slate-900 border-2 border-orange-400 text-orange-400 hover:bg-orange-500 hover:text-slate-950'
                    }`}>
                      {spot.id}
                      <span className="absolute -inset-1 rounded-full bg-orange-500/40 animate-ping pointer-events-none" />
                    </span>
                  </motion.button>
                );
              })}

            </div>
          </div>

          {/* Right Inspection Details Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                Active Component Spec #{selectedHotspot?.id}
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                {selectedHotspot?.title}
              </h3>
            </div>

            {/* Spec Details Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHotspot?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 shrink-0">
                    <Info size={18} />
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {selectedHotspot?.spec}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                    <CheckCircle2 size={14} /> Verified Quality Spec
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">ISO 9001:2015</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Hotspots Quick Navigator */}
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">All Hotspots in Diagram</p>
              <div className="space-y-2">
                {activeBlueprint.hotspots.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedHotspot(spot)}
                    className={`w-full p-2.5 rounded-xl text-left text-xs font-bold transition-all flex items-center gap-3 border ${
                      selectedHotspot?.id === spot.id
                        ? 'bg-orange-500/15 border-orange-500/50 text-orange-400 pl-4'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-black flex items-center justify-center">
                      {spot.id}
                    </span>
                    <span className="truncate">{spot.title}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default BlueprintVisualizer;
