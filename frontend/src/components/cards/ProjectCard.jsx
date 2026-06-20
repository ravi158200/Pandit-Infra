import React from 'react';
import { MapPin, User, ChevronRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, onViewDetails }) => {
  const { title, description, category, status, progress, location, client, images } = project;

  // Determine status styling
  const statusStyles = {
    Completed: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
    Ongoing: 'bg-blue-500/10 border-blue-500/30 text-brand-blue dark:text-blue-400',
    Live: 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400',
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="flex flex-col h-full overflow-hidden rounded-2xl bg-white dark:bg-brand-cardDark border border-slate-100 dark:border-slate-800 shadow-premium hover:shadow-premium-hover transition-all duration-300 group font-sans"
    >
      {/* Project Image Banner */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={images?.[0] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Category Label */}
        <span className="absolute top-4 left-4 text-[10px] font-extrabold uppercase tracking-widest bg-slate-900/80 text-white px-2.5 py-1 rounded-md backdrop-blur-sm">
          {category}
        </span>

        {/* Status Badge */}
        <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-sm ${statusStyles[status] || 'bg-slate-500/20 text-slate-700'}`}>
          {status}
        </span>
      </div>

      {/* Project Details */}
      <div className="flex flex-col flex-1 p-6">
        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-brand-blue transition">
          {title}
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {description}
        </p>

        {/* Location & Client Metadata */}
        <div className="space-y-2 mb-6 border-t border-slate-100 dark:border-slate-850 pt-4 text-xs font-semibold text-slate-400 dark:text-slate-500">
          {location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-brand-orange" />
              <span>{location}</span>
            </div>
          )}
          {client && (
            <div className="flex items-center gap-2">
              <User size={14} className="text-brand-blue" />
              <span>Client: {client}</span>
            </div>
          )}
        </div>

        {/* Progress Bar (Visible for Ongoing or Live) */}
        {status !== 'Completed' && (
          <div className="space-y-1.5 mb-6 bg-slate-50 dark:bg-brand-dark/20 p-3 rounded-xl border border-slate-100/50 dark:border-slate-800/50">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                <Activity size={12} className="text-brand-orange animate-pulse" />
                Live Construction Progress
              </span>
              <span className="text-brand-blue">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-brand-orange to-amber-500 rounded-full"
              />
            </div>
          </div>
        )}

        {/* View Timelines */}
        <div className="mt-auto pt-2">
          <button
            onClick={() => onViewDetails(project)}
            className="w-full flex items-center justify-center gap-1 bg-slate-50 hover:bg-slate-100 dark:bg-brand-dark/30 dark:hover:bg-brand-dark/50 text-slate-700 dark:text-slate-300 font-bold py-2.5 rounded-xl border border-slate-150 dark:border-slate-800 text-sm transition"
          >
            Track Status Timeline
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
