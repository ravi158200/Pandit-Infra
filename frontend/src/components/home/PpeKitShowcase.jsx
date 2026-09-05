import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, HardHat, Eye, ShieldAlert, Footprints, Flame, Ear, Award, CheckCircle2, Info } from 'lucide-react';

const ppeItems = [
  {
    id: 'helmet',
    name: 'Safety Hard Hat Helmet',
    code: 'IS 2925 / EN 397 Certified',
    icon: HardHat,
    category: 'HEAD PROTECTION',
    badge: 'MANDATORY ON SITE',
    description: 'High-density ABS impact-resistant helmet with 4-point textile suspension harness, chin strap, and sweatband. Protects against falling objects and structural impacts.',
    specs: ['Impact Energy: 100 Joules', 'Electrical Insulation: up to 440V', 'Chin Strap: 4-Point adjustable', 'UV & Heat Resistant Shell']
  },
  {
    id: 'vest',
    name: 'Hi-Vis Reflective Safety Vest',
    code: 'IS 15809 / EN ISO 20471 Class 3',
    icon: ShieldCheck,
    category: 'BODY VISIBILITY',
    badge: '3M REFLECTIVE TAPE',
    description: 'Fluorescent orange/yellow high-visibility waistcoat with 50mm 3M Scotchlite reflective stripes. Ensures 360° visibility during night paving and heavy equipment operations.',
    specs: ['Retro-reflective Coefficient: >330 cd/lx/m²', 'Fabric: 100% Polyester Breathable Mesh', 'Pockets: ID card holder & radio loop', 'Closure: Heavy-duty front zipper']
  },
  {
    id: 'boots',
    name: 'Steel-Toe Safety Boots',
    code: 'IS 15298 / EN ISO 20345 S3',
    icon: Footprints,
    category: 'FOOT & SOLE PROTECTION',
    badge: '200 JOULES IMPACT CAP',
    description: 'Water-resistant full grain leather safety boots equipped with 200J steel toe caps and anti-puncture steel midsoles to prevent nail/rebar penetration.',
    specs: ['Toe Protection: 200J Steel Cap', 'Midsole: Anti-perforation steel plate', 'Outsole: Dual density PU/Rubber slip-resistant', 'Insulation: Electric Hazard (EH) Rated']
  },
  {
    id: 'gloves',
    name: 'Heavy-Duty Cut & Impact Gloves',
    code: 'EN 388 Level 5 Cut Resistance',
    icon: Flame,
    category: 'HAND PROTECTION',
    badge: 'REBAR & MASONRY GRIP',
    description: 'Nitrile-coated Kevlar/HPPE woven gloves with TPR impact bumpers on knuckles. Designed for handling sharp steel rebars, rough concrete blocks, and timber formwork.',
    specs: ['Cut Level: ANSI A5 / EN 388 Level 5', 'Grip Coating: Sandy Nitrile Palm', 'Impact Protection: TPR Back-of-hand bumpers', 'Thermal Resistance: Up to 100°C contact']
  },
  {
    id: 'harness',
    name: 'Full Body Fall Arrest Harness',
    code: 'IS 3521 / EN 361 Standard',
    icon: ShieldAlert,
    category: 'HEIGHT SAFETY & SCAFFOLDING',
    badge: 'DOUBLE LANYARD WITH HOOKS',
    description: 'Heavy-duty fall protection harness with dorsal D-ring, adjustable thigh straps, and a 1.8m twin lanyard with energy shock absorber and scaffold snap hooks.',
    specs: ['Max User Weight: 140 kg', 'Lanyard: Twin webbing with shock absorber', 'Hooks: 55mm opening scaffold hooks', 'Webbing Material: 44mm High-Tenacity Polyester']
  },
  {
    id: 'goggles',
    name: 'Impact & Chemical Safety Goggles',
    code: 'IS 5983 / EN 166 Grade B',
    icon: Eye,
    category: 'EYE & FACE PROTECTION',
    badge: 'ANTI-FOG & UV FILTER',
    description: 'Direct-ventilation polycarbonate safety glasses with anti-scratch coating. Shields eyes from concrete dust, grinding sparks, flying stone chips, and chemical splashes.',
    specs: ['Lens Material: High-Impact Polycarbonate', 'Coating: Anti-fog & Scratch-resistant', 'UV Protection: 99.9% UV400 Rating', 'Frame: Flexible PVC contour seal']
  },
  {
    id: 'respirator',
    name: 'Dust & Fume Respirator Mask',
    code: 'IS 9473 / N95 / FFP2',
    icon: Info,
    category: 'RESPIRATORY HEALTH',
    badge: 'SILICA DUST FILTRATION',
    description: 'Multi-layer particulate respirator mask with cool-flow exhalation valve. Filters out fine crystalline silica dust, cement powder, sandblasting debris, and demolition smoke.',
    specs: ['Filtration Efficiency: ≥ 95% at 0.3 micron', 'Exhalation Valve: Reduces heat & moisture build-up', 'Nose Clip: Adjustable aluminum contour strip', 'Straps: Dual elastic headband']
  },
  {
    id: 'earmuffs',
    name: 'Noise Reduction Earmuffs',
    code: 'IS 9167 / EN 352-1 (NRR 30dB)',
    icon: Ear,
    category: 'HEARING CONSERVATION',
    badge: 'HEAVY MACHINERY ZONE',
    description: 'High-attenuation ear protectors with soft foam cushions and adjustable headband. Protects workers against prolonged high-decibel noise from jackhammers, crushers, and pile drivers.',
    specs: ['Noise Reduction Rating (NRR): 30 dB', 'SNR Value: 33 dB High Protection', 'Cushions: Ultra-soft acoustic foam', 'Headband: Padded stainless steel wire']
  }
];

const PpeKitShowcase = () => {
  const [selectedPpe, setSelectedPpe] = useState(ppeItems[0]);

  return (
    <section id="safety-ppe" className="relative py-24 bg-slate-950 text-white overflow-hidden">
      {/* Background blueprint grid pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black tracking-widest uppercase mb-4"
          >
            <Award size={14} />
            <span>Zero Hazard Site Protocol</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white"
          >
            Mandatory Personal Protective Equipment <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-400 to-emerald-400">
              (PPE) Kit for Civil Works
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed"
          >
            At Pandit Infra Engineering, 100% adherence to Bureau of Indian Standards (BIS) and OSHA Personal Protective Equipment standards is strictly enforced across all active civil construction, excavation, and structural sites.
          </motion.p>
        </div>

        {/* Top Featured Images Showcase Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group"
          >
            <img
              src="/images/ppe/ppe_full_kit.jpg"
              alt="Complete Civil Engineering PPE Kit"
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
              <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase bg-emerald-500/20 px-2.5 py-1 rounded-md mb-2 inline-block">
                BIS & OSHA COMPLIANT
              </span>
              <h3 className="text-xl font-bold text-white">Complete Civil Work PPE Gear Kit</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Every engineer, technician, and site laborer is equipped with high-impact helmets, steel-toe boots, hi-vis vests, cut-resistant gloves, and fall arrest harnesses.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group"
          >
            <img
              src="/images/ppe/ppe_worker_site.jpg"
              alt="Civil Engineer in full PPE site gear"
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
              <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase bg-amber-500/20 px-2.5 py-1 rounded-md mb-2 inline-block">
                SAFETY FIRST CULTURE
              </span>
              <h3 className="text-xl font-bold text-white">Full On-Site Deployment & Inspection</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Daily safety toolbox talks and mandatory equipment checks ensure zero accidents across heavy excavation, concrete pours, and high-altitude steel erection.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Interactive 8 PPE Kit Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ppeItems.map((item, index) => {
            const IconComponent = item.icon;
            const isSelected = selectedPpe.id === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedPpe(item)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-brand-orange shadow-xl shadow-orange-950/40 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
                      isSelected ? 'bg-brand-orange text-white shadow-lg' : 'bg-slate-800 text-brand-orange'
                    }`}>
                      <IconComponent size={24} />
                    </div>
                    <span className="text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-amber-400">
                      {item.badge}
                    </span>
                  </div>

                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{item.category}</p>
                  <h4 className="text-lg font-bold text-white mb-2">{item.name}</h4>
                  <p className="text-[11px] font-mono text-emerald-400 mb-3">{item.code}</p>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <div className="space-y-1.5">
                    {item.specs.slice(0, 2).map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Equipment Modal / Detail Box */}
        <AnimatePresence mode="wait">
          {selectedPpe && (
            <motion.div
              key={selectedPpe.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="mt-12 p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-4 flex flex-col items-center text-center p-6 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="h-20 w-20 rounded-3xl bg-brand-orange/15 text-brand-orange flex items-center justify-center mb-4">
                  {React.createElement(selectedPpe.icon, { size: 40 })}
                </div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">{selectedPpe.category}</span>
                <h3 className="text-2xl font-black text-white">{selectedPpe.name}</h3>
                <p className="text-xs font-mono text-emerald-400 mt-1 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  {selectedPpe.code}
                </p>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Civil Engineering Application & Purpose</h4>
                  <p className="text-sm text-slate-200 mt-1 leading-relaxed">{selectedPpe.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Technical Standards & Specifications</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedPpe.specs.map((spec, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        <span className="font-medium">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default PpeKitShowcase;
