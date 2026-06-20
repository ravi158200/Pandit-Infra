import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Building2, TowerControl, Hammer } from 'lucide-react';

const clients = [
  { name: 'L&T', description: 'Larsen & Toubro', icon: <TowerControl size={24} /> },
  { name: 'Adani', description: 'Adani Group', icon: <Building2 size={24} /> },
  { name: 'AMNS', description: 'ArcelorMittal Nippon Steel', icon: <Factory size={24} /> },
  { name: 'Reliance', description: 'Ambani Group', icon: <Hammer size={24} /> },
];

const ClientsSection = () => {
  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[11px] font-black tracking-widest text-brand-orange uppercase bg-orange-100 border border-orange-200 px-4 py-1.5 rounded-full mb-4"
          >
            Trusted Partners
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Executing Civil Works For <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">
              Industry Leaders
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="w-16 h-16 bg-slate-50 group-hover:bg-orange-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-brand-orange mb-6 transition-colors duration-300 shadow-sm border border-slate-100">
                {client.icon}
              </div>
              
              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-1 group-hover:text-brand-orange transition-colors">
                {client.name}
              </h3>
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                {client.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
