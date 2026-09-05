import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

const SERVICE_TYPES = [
  {
    id: 'road',
    name: 'Road & Highway Paving',
    unitLabel: 'Square Meters',
    baseRateSqM: 1450, // ₹ per sq meter
    defaultArea: 2500,
    minArea: 200,
    maxArea: 50000,
    stepArea: 100,
    icon: '🛣️',
    description: 'Bituminous asphalt, sub-base compaction & heavy road paving.'
  },
  {
    id: 'rcc',
    name: 'RCC Civil Foundation & Structural',
    unitLabel: 'Square Feet',
    baseRateSqM: 1950, // ₹ per sq ft
    defaultArea: 5000,
    minArea: 500,
    maxArea: 100000,
    stepArea: 500,
    icon: '🏗️',
    description: 'Reinforced cement concrete framing, footings & multi-story slabs.'
  },
  {
    id: 'peb',
    name: 'Industrial PEB Steel Sheds',
    unitLabel: 'Square Feet',
    baseRateSqM: 1250, // ₹ per sq ft
    defaultArea: 8000,
    minArea: 1000,
    maxArea: 150000,
    stepArea: 1000,
    icon: '🏭',
    description: 'Pre-engineered steel structures, clear span trusses & roofing.'
  },
  {
    id: 'earthwork',
    name: 'Earthwork & Land Excavation',
    unitLabel: 'Cubic Meters',
    baseRateSqM: 450, // ₹ per cu m
    defaultArea: 4000,
    minArea: 500,
    maxArea: 80000,
    stepArea: 500,
    icon: '🚜',
    description: 'Heavy site grading, rock cutting & deep foundation excavation.'
  },
  {
    id: 'drainage',
    name: 'Bridge & Box Culvert Drainage',
    unitLabel: 'Linear Meters',
    baseRateSqM: 18500, // ₹ per meter
    defaultArea: 150,
    minArea: 20,
    maxArea: 3000,
    stepArea: 10,
    icon: '🌉',
    description: 'Stormwater retention, concrete culverts & bridge abutments.'
  }
];

const QUALITY_TIERS = [
  { id: 'standard', name: 'Standard Commercial', multiplier: 1.0, badge: 'IS Standard Specs' },
  { id: 'heavy', name: 'Heavy-Duty Industrial', multiplier: 1.25, badge: 'High Load Specs' },
  { id: 'premium', name: 'Ultra Premium Infrastructure', multiplier: 1.5, badge: 'IS/IRC Seismic Specs' }
];

const CostEstimator = ({ onOpenQuote }) => {
  const [selectedType, setSelectedType] = useState(SERVICE_TYPES[0]);
  const [area, setArea] = useState(SERVICE_TYPES[0].defaultArea);
  const [tier, setTier] = useState(QUALITY_TIERS[1]);
  const [isFastTrack, setIsFastTrack] = useState(false);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setArea(type.defaultArea);
  };

  // Cost calculation logic
  const rawBaseCost = area * selectedType.baseRateSqM * tier.multiplier;
  const fastTrackCost = isFastTrack ? rawBaseCost * 0.12 : 0;
  const totalEstimatedCost = Math.round(rawBaseCost + fastTrackCost);

  const materialCost = Math.round(totalEstimatedCost * 0.58);
  const machineryLaborCost = Math.round(totalEstimatedCost * 0.32);
  const engineeringQACost = Math.round(totalEstimatedCost * 0.10);

  const formatINR = (val) => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(2)} Lakhs`;
    }
    return `₹ ${val.toLocaleString('en-IN')}`;
  };

  return (
    <section className="relative py-24 bg-slate-950 text-white overflow-hidden" id="cost-estimator">
      {/* Background Ambient Lights & Blueprint Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-orange-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-extrabold uppercase tracking-wider backdrop-blur-md"
          >
            <Calculator size={14} className="text-orange-400" />
            Interactive Budget Planner
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-white"
          >
            Instant Civil Infrastructure <span className="shimmer-text">Cost Estimator</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            Select your civil project type, specify dimensions, and choose engineering quality tiers to generate an instant estimate breakdown.
          </motion.p>
        </div>

        {/* Main Grid: Inputs on Left, Real-Time Calculation Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8"
          >
            {/* Step 1: Service Type Selector */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-500 text-slate-950 text-[10px] font-black flex items-center justify-center">1</span>
                Select Construction Category
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_TYPES.map((type) => {
                  const isSelected = selectedType.id === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => handleTypeChange(type)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
                        isSelected
                          ? 'bg-gradient-to-br from-orange-500/20 to-amber-500/10 border-orange-500/60 shadow-lg shadow-orange-500/10'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                      )}
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{type.icon}</span>
                        <div>
                          <p className={`text-xs font-bold ${isSelected ? 'text-orange-400' : 'text-white'}`}>
                            {type.name}
                          </p>
                          <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Slider for Dimensions */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-500 text-slate-950 text-[10px] font-black flex items-center justify-center">2</span>
                  Project Area / Volume ({selectedType.unitLabel})
                </label>
                <span className="text-sm font-extrabold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-xl">
                  {area.toLocaleString()} {selectedType.unitLabel}
                </span>
              </div>

              <input
                type="range"
                min={selectedType.minArea}
                max={selectedType.maxArea}
                step={selectedType.stepArea}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />

              <div className="flex justify-between text-[11px] font-bold text-slate-500 mt-2">
                <span>{selectedType.minArea.toLocaleString()} {selectedType.unitLabel}</span>
                <span>{((selectedType.minArea + selectedType.maxArea) / 2).toLocaleString()}</span>
                <span>{selectedType.maxArea.toLocaleString()} {selectedType.unitLabel}</span>
              </div>
            </div>

            {/* Step 3: Quality Tier Selector */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-500 text-slate-950 text-[10px] font-black flex items-center justify-center">3</span>
                Engineering Quality Tier
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {QUALITY_TIERS.map((t) => {
                  const isSelected = tier.id === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTier(t)}
                      className={`p-3.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-orange-500 text-slate-950 font-extrabold border-orange-400 shadow-md shadow-orange-500/20'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <p className="text-xs font-bold">{t.name}</p>
                      <span className={`inline-block text-[9px] mt-1 px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-slate-950/20 text-slate-950 font-extrabold' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {t.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fast-Track Toggle Option */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="text-orange-400" size={18} />
                <div>
                  <p className="text-xs font-bold text-white">Fast-Track Accelerated Completion</p>
                  <p className="text-[10px] text-slate-400">Deploy double shifts & heavy equipment fleets (+12%)</p>
                </div>
              </div>

              <button
                onClick={() => setIsFastTrack(!isFastTrack)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                  isFastTrack ? 'bg-orange-500' : 'bg-slate-800'
                }`}
              >
                <motion.div
                  animate={{ x: isFastTrack ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-4 h-4 rounded-full bg-slate-950 shadow-md"
                />
              </button>
            </div>

          </motion.div>

          {/* Real-time Result Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 sticky top-24"
          >
            <div className="relative rounded-3xl p-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
              
              {/* Highlight Aura */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/20 blur-3xl pointer-events-none rounded-full" />

              <div className="flex items-center justify-between border-b border-slate-800/80 pb-6 mb-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Estimated Investment</span>
                  <h3 className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">
                    {formatINR(totalEstimatedCost)}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-xl">
                  {selectedType.icon}
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-4 mb-8">
                <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Cost Breakdown Overview</p>

                <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800/50">
                  <span className="text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    High-Grade Materials (58%)
                  </span>
                  <span className="font-bold text-slate-200">{formatINR(materialCost)}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800/50">
                  <span className="text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    Heavy Machinery & Labor (32%)
                  </span>
                  <span className="font-bold text-slate-200">{formatINR(machineryLaborCost)}</span>
                </div>

                <div className="flex items-center justify-between text-xs py-2 border-b border-slate-800/50">
                  <span className="text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    QA, Testing & Engineering (10%)
                  </span>
                  <span className="font-bold text-slate-200">{formatINR(engineeringQACost)}</span>
                </div>
              </div>

              {/* Quality Badges */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-8 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 size={15} />
                  Includes IS 456 & IRC Code Compliance
                </div>
                <p className="text-[11px] text-slate-400">
                  *This estimate is generated dynamically based on standard material indices and current machinery operating costs.
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={onOpenQuote}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-orange-500/25 flex items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Request Formal Quote with Estimate</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default CostEstimator;
