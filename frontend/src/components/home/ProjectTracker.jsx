import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, CheckCircle2, Clock, MapPin, Calendar, Building2, ArrowRight } from 'lucide-react';

const TRACKED_PROJECTS = [
  {
    id: 'proj-1',
    name: 'Surat Ring Road 6-Lane Asphalt Corridor',
    location: 'Surat, Gujarat',
    category: 'Heavy Road Infrastructure',
    completionPct: 78,
    targetDate: 'Dec 2026',
    milestones: [
      { step: 1, title: 'Land Survey & Soil CBR Testing', status: 'Completed', date: 'Jan 2026' },
      { step: 2, title: 'Sub-grade Excavation & Compaction', status: 'Completed', date: 'Mar 2026' },
      { step: 3, title: 'Granular Sub-Base (GSB) Layering', status: 'Completed', date: 'May 2026' },
      { step: 4, title: 'Dense Bituminous Macadam (DBM)', status: 'In Progress', date: 'Current Phase' },
      { step: 5, title: 'SMA Asphalt Wear Course & Markings', status: 'Upcoming', date: 'Nov 2026' }
    ]
  },
  {
    id: 'proj-2',
    name: 'Hazira Heavy Industrial PEB Logistics Hub',
    location: 'Hazira Industrial Zone',
    category: 'PEB Steel Engineering',
    completionPct: 92,
    targetDate: 'Oct 2026',
    milestones: [
      { step: 1, title: 'Topographical Survey & Geotech', status: 'Completed', date: 'Nov 2025' },
      { step: 2, title: 'RCC Pedestal & Raft Foundation', status: 'Completed', date: 'Jan 2026' },
      { step: 3, title: 'Primary PEB Column & Frame Erection', status: 'Completed', date: 'Apr 2026' },
      { step: 4, title: 'Standing Seam Roof Panel Fitting', status: 'Completed', date: 'Jul 2026' },
      { step: 5, title: 'Flooring Hardener & Final Handover', status: 'In Progress', date: 'Current Phase' }
    ]
  },
  {
    id: 'proj-3',
    name: 'Tapi River Heavy Concrete Box Culvert',
    location: 'Olpad-Surat Sector',
    category: 'Civil Bridge Structure',
    completionPct: 55,
    targetDate: 'Mar 2027',
    milestones: [
      { step: 1, title: 'Hydrological Flow Modeling', status: 'Completed', date: 'Feb 2026' },
      { step: 2, title: 'Cofferdam Water Diversion', status: 'Completed', date: 'May 2026' },
      { step: 3, title: 'RCC Pile Foundation & Abutments', status: 'In Progress', date: 'Current Phase' },
      { step: 4, title: 'Precast Concrete Box Girders', status: 'Upcoming', date: 'Dec 2026' },
      { step: 5, title: 'Bridge Deck Paving & Barrier Rails', status: 'Upcoming', date: 'Feb 2027' }
    ]
  }
];

const ProjectTracker = ({ onOpenQuote }) => {
  const [selectedProject, setSelectedProject] = useState(TRACKED_PROJECTS[0]);

  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden" id="live-project-tracker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 border border-orange-200 text-xs font-extrabold uppercase tracking-wider">
              <Activity size={14} className="text-orange-500 animate-pulse" />
              Live Project Milestone Tracker
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
              Real-Time Project <span className="text-orange-600">Progress Tracker</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Track live construction milestones, engineering status, and target handover dates across active Pandit Infra civil project sites.
            </p>
          </div>

          {/* Project Selector Tabs */}
          <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            {TRACKED_PROJECTS.map((proj) => {
              const isActive = selectedProject.id === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white font-black shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {proj.name.split(' ')[0]} {proj.name.split(' ')[1]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Project Details & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-lg">
          
          {/* Left Metadata Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-extrabold text-[11px] uppercase tracking-wider">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-3 leading-tight">
                {selectedProject.name}
              </h3>
              <p className="text-xs font-bold text-slate-500 mt-2 flex items-center gap-1.5">
                <MapPin size={14} className="text-orange-500" />
                {selectedProject.location}
              </p>
            </div>

            {/* Completion Meter */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-600">Total Project Completion</span>
                <span className="text-orange-600 font-extrabold text-lg">{selectedProject.completionPct}%</span>
              </div>

              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedProject.completionPct}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                />
              </div>

              <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Calendar size={12} className="text-orange-500" /> Target Completion: <strong className="text-slate-800">{selectedProject.targetDate}</strong>
                </span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 size={12} /> On Schedule
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Partner on Next Infrastructure Project</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>

          {/* Right Timeline Milestones */}
          <div className="lg:col-span-7 space-y-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Engineering Phase Milestones</h4>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {selectedProject.milestones.map((m) => {
                const isDone = m.status === 'Completed';
                const isCurrent = m.status === 'In Progress';
                return (
                  <motion.div
                    key={m.step}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: m.step * 0.08 }}
                    className="relative flex items-start gap-4"
                  >
                    {/* Node Circle */}
                    <span className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center font-black text-[10px] border-2 transition-all ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                        : isCurrent
                        ? 'bg-orange-500 border-orange-500 text-white ring-4 ring-orange-100 animate-pulse'
                        : 'bg-white border-slate-300 text-slate-400'
                    }`}>
                      {isDone ? <CheckCircle2 size={12} /> : m.step}
                    </span>

                    {/* Content Card */}
                    <div className={`w-full p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-white border-orange-300 shadow-md ring-1 ring-orange-200'
                        : 'bg-white/60 border-slate-200'
                    }`}>
                      <div className="flex justify-between items-start">
                        <h5 className={`text-sm font-bold ${isCurrent ? 'text-orange-600 font-extrabold' : 'text-slate-800'}`}>
                          {m.title}
                        </h5>
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          isDone
                            ? 'bg-emerald-100 text-emerald-800'
                            : isCurrent
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {m.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Timeline Target: {m.date}</p>
                    </div>

                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ProjectTracker;
