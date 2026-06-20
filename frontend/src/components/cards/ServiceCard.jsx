import React from 'react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceCard = ({ service, onLearnMore }) => {
  const { title, icon, description, image } = service;
  
  // Resolve Lucide Icon dynamically
  const IconComponent = Icons[icon] || Icons.Hammer;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="flex flex-col h-full overflow-hidden rounded-2xl bg-white dark:bg-brand-cardDark border border-slate-100 dark:border-slate-800 shadow-premium hover:shadow-premium-hover transition-all duration-300 group font-sans"
    >
      {/* Service Image banner */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Absolute Floating Icon */}
        <div className="absolute bottom-4 left-4 h-12 w-12 rounded-xl bg-brand-orange text-white flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 opacity-90 transition duration-300">
          <IconComponent size={24} className="stroke-[2.2]" />
        </div>
      </div>

      {/* Card Details */}
      <div className="flex flex-col flex-1 p-6 pt-8">
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-brand-blue transition">
          {title}
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-6">
          {description}
        </p>
        
        {/* Read More Call-To-Action */}
        <div className="mt-auto">
          <button
            onClick={() => onLearnMore(service)}
            className="text-sm font-bold text-brand-blue dark:text-blue-400 hover:text-brand-orange dark:hover:text-brand-orange transition flex items-center gap-1 group/btn"
          >
            Detailed Specifications
            <Icons.ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
