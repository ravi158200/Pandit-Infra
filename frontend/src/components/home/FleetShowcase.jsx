import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, ShieldCheck, Gauge, Wrench, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

const FLEET_ITEMS = [
  {
    id: 'excavator-cat',
    name: 'CAT 336 Heavy Hydraulic Excavator',
    category: 'Earthworks & Trenching',
    operatingWeight: '37,200 kg',
    bucketCapacity: '2.4 m³',
    enginePower: '302 HP (225 kW)',
    status: 'Operational',
    statusBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    image: 'https://images.unsplash.com/photo-1579412690850-bd41cd0af397?auto=format&fit=crop&w=800&q=80',
    specs: ['Laser GPS Grading System', 'Heavy Rock Breaker Attachment', 'Stage V Low Emission Engine']
  },
  {
    id: 'paver-vogele',
    name: 'Vögele Super 2100 Asphalt Paver',
    category: 'Highway Bituminous Paving',
    pavingWidth: '13.0 meters',
    laydownRate: '1,100 tonnes/hr',
    screedHeating: 'Electric Auto-Heat',
    status: 'Deployed On-Site',
    statusBg: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80',
    specs: ['3D Sonic Sensor Grade Control', 'High-Compaction Pressure Bar', 'Continuous Feeder Shuttle']
  },
  {
    id: 'pump-schwing',
    name: 'Schwing Stetter 43m Boom Concrete Pump',
    category: 'RCC Structural Pouring',
    reach: '42.5 meters vertical',
    outputRate: '160 m³/hour',
    pipeline: '125 mm Twin-Wall',
    status: 'Operational',
    statusBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    specs: ['Vector Control Monitoring', 'Super Outrigger Stability System', 'Eco-Pumping Fuel Saver']
  },
  {
    id: 'roller-hamm',
    name: 'Hamm HD+ 110i Vibratory Tandem Roller',
    category: 'Sub-base & Asphalt Compaction',
    drumWidth: '1,680 mm',
    vibrationFreq: '50 Hz / 4,200 vpm',
    compactionForce: '128 kN',
    status: 'Operational',
    statusBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    specs: ['Hamm Compaction Meter (HCM)', 'Edge Pressing & Cutting Unit', 'Oscillation Compaction Tech']
  }
];

const FleetShowcase = ({ onOpenQuote }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden" id="equipment-fleet">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Truck size={14} className="text-orange-400" />
              Heavy Machinery Infrastructure Fleet
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              State-of-the-Art <span className="shimmer-text">Machinery Fleet</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Pandit Infra operates an in-house fleet of precision heavy machinery equipped with 3D GPS laser grading, high-output concrete boom pumps, and heavy compaction machinery.
            </p>
          </div>

          <button
            onClick={onOpenQuote}
            className="self-start md:self-auto px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Inquire Machinery Hire / Turn-key</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Fleet Machinery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FLEET_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-orange-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Status Badge */}
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider backdrop-blur-md ${item.statusBg}`}>
                    {item.status}
                  </span>
                </div>

                {/* Info Container */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-orange-400">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-orange-400 transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  {/* Primary Tech Spec */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Operating Capacity:</span>
                      <span className="font-bold text-amber-400">{item.operatingWeight || item.laydownRate || item.reach || item.compactionForce}</span>
                    </div>
                  </div>

                  {/* Feature Checkmarks */}
                  <div className="space-y-1">
                    {item.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 size={12} className="text-orange-400 shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={onOpenQuote}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-orange-500 hover:text-slate-950 font-extrabold text-xs text-slate-200 transition-all cursor-pointer"
                >
                  Deploy Equipment
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FleetShowcase;
