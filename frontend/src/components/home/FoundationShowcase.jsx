import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ShieldCheck, Cpu, ArrowRight, CheckCircle2, Maximize2, X, Anchor, HardHat } from 'lucide-react';

const foundationItems = [
  {
    id: 'steel-set',
    title: 'Full Heavy Steel Rebar Set',
    category: 'REBAR REINFORCEMENT FRAMEWORK',
    badge: 'TMT FE-550D STEEL',
    image: '/images/foundation/full_steel_foundation_set.jpg',
    summary: 'High-tensile TMT steel rebar cage matrix, precision-bent column starters, and heavy anchor bolt assemblies for maximum earthquake seismic resilience.',
    specs: [
      { label: 'Steel Grade', value: 'Fe-550D / Fe-600 High Ductility' },
      { label: 'Rebar Diameter Range', value: '12mm to 40mm TMT Bars' },
      { label: 'Seismic Compliance', value: 'IS 13920 & IS 456 Ductile Detailing' },
      { label: 'Tie Wire Binding', value: '16 SWG Annealed Steel Wire Grid' }
    ],
    features: [
      'Precision welded & tied column rebar cage matrix',
      'Anchor bolt embedded template for PEB structural columns',
      'Double-mat bottom and top mesh reinforcement',
      'Ultrasonic weld testing & bar-bending schedule adherence'
    ]
  },
  {
    id: 'concrete-pouring',
    title: 'High-Grade Concrete Pouring',
    category: 'READY-MIX CONCRETE (RMC)',
    badge: 'M25 TO M50 GRADE',
    image: '/images/foundation/concrete_pouring_foundation.jpg',
    summary: 'Automated boom pump placement of dense ready-mix concrete with internal needle vibration consolidation to achieve zero honeycombing and maximum compressive strength.',
    specs: [
      { label: 'Concrete Grades', value: 'M25, M30, M35, M40, M50' },
      { label: 'Placement Method', value: '36m to 52m Boom Pumps & Transit Mixers' },
      { label: 'Compaction', value: 'High-Frequency Needle Vibrators (60mm)' },
      { label: 'Quality Testing', value: 'Slump Cone & 28-Day Cube Compressive Test' }
    ],
    features: [
      'Self-compacting high-durability mix design',
      'Waterproofing admixtures for damp-proof sub-structures',
      'Monolithic continuous pour execution without cold joints',
      'Temperature controlled mass concrete pour monitoring'
    ]
  },
  {
    id: 'rcc-foundation',
    title: 'Heavy RCC & Raft Foundation',
    category: 'SUB-STRUCTURE PILING & RAFT',
    badge: 'SUB-SURFACE LOAD BEARING',
    image: '/images/foundation/foundation_steel_rcc.jpg',
    summary: 'Complete deep pile cap, isolated footing, and heavy raft slab foundation construction engineered to support multi-ton industrial loads and bridge piers.',
    specs: [
      { label: 'Foundation Types', value: 'Raft / Mat, Deep Piles, Isolated Footings' },
      { label: 'Soil Bearing Capacity', value: 'Custom engineered per NABL Geotech Report' },
      { label: 'Excavation Depth', value: '3m to 15m Deep Sub-Structure Pits' },
      { label: 'Design Standard', value: 'IS 2911 (Pile) & IS 1080 (Footings)' }
    ],
    features: [
      'Heavy machine-bored pile foundation with permanent casing',
      'Integrated drainage channel & anti-termite membrane barrier',
      'High-capacity load bearing footing for heavy industrial machinery',
      'Full surveyor laser alignment for millimeter level accuracy'
    ]
  }
];

const FoundationShowcase = ({ onOpenQuote }) => {
  const [activeTab, setActiveTab] = useState(foundationItems[0].id);
  const [modalImage, setModalImage] = useState(null);

  const currentItem = foundationItems.find(item => item.id === activeTab) || foundationItems[0];

  return (
    <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
      {/* Background blueprint & glow effects */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(234, 88, 12, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(234, 88, 12, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-brand-orange text-xs font-black tracking-widest uppercase mb-4"
          >
            <Anchor size={14} />
            <span>Sub-Structure Engineering Excellence</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white"
          >
            Heavy RCC Foundation, Concrete <br className="hidden sm:block" />
            & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-yellow-400">Full Steel Rebar Engineering</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed"
          >
            A strong building requires an unbreakable foundation. We execute full steel cage rebar frameworks, high-grade ready-mix concrete pours, and heavy RCC raft footings for mega industrial facilities across India.
          </motion.p>
        </div>

        {/* Navigation Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {foundationItems.map((item) => {
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center gap-2.5 cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-orange to-amber-500 text-white border-transparent shadow-lg shadow-orange-950/50 scale-105'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <Layers size={16} className={isActive ? 'text-white' : 'text-slate-500'} />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Item Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl"
          >
            {/* Image Preview Side */}
            <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-slate-950">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-[320px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Category Badge overlay */}
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] font-black text-amber-400 tracking-wider">
                {currentItem.badge}
              </div>

              {/* Zoom Button */}
              <button
                type="button"
                onClick={() => setModalImage(currentItem)}
                className="absolute top-4 right-4 h-10 w-10 rounded-xl bg-slate-950/80 hover:bg-brand-orange border border-slate-800 text-white flex items-center justify-center transition cursor-pointer shadow-lg"
                title="Expand HD Preview"
              >
                <Maximize2 size={16} />
              </button>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 backdrop-blur-md">
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  {currentItem.summary}
                </p>
              </div>
            </div>

            {/* Technical Specs & Details Side */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[11px] font-extrabold tracking-widest text-brand-orange uppercase">
                  {currentItem.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {currentItem.title}
                </h3>
              </div>

              {/* Specs Table */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                {currentItem.specs.map((spec, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{spec.label}</p>
                    <p className="text-xs font-extrabold text-slate-200">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Key Features List */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Engineering Highlights:</p>
                {currentItem.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA Row */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-orange-950/50 transition cursor-pointer text-xs uppercase tracking-wider"
                >
                  <HardHat size={16} />
                  <span>Get Foundation Quote</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 3 Grid Showcase Cards below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {foundationItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -6 }}
              className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                item.id === activeTab
                  ? 'bg-slate-900 border-brand-orange/60 shadow-xl shadow-orange-950/30'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <div className="h-44 rounded-2xl overflow-hidden mb-4 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 left-3 text-[10px] font-bold text-amber-400 bg-slate-950/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-slate-800">
                  {item.badge}
                </span>
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {item.summary}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-brand-orange font-bold">
                <span>View Engineering Specs</span>
                <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {modalImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 overflow-hidden shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setModalImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950 text-white hover:bg-brand-orange transition cursor-pointer"
              >
                <X size={20} />
              </button>
              <img
                src={modalImage.image}
                alt={modalImage.title}
                className="w-full h-[60vh] object-cover rounded-2xl"
              />
              <div className="mt-4 text-left">
                <h3 className="text-xl font-bold text-white">{modalImage.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{modalImage.summary}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FoundationShowcase;
