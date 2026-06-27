import React, { useState, useEffect } from 'react';
import { Sparkles, X, MapPin, User, Calendar, CheckCircle, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../../components/cards/ProjectCard';
import BeforeAfterSlider from '../../components/common/BeforeAfterSlider';
import API from '../../utils/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('All'); // 'All', 'Completed', 'Ongoing'
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Residential', 'Commercial', 'Infrastructure', 'Industrial', 'Renovation'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.warn('Could not fetch projects, displaying placeholders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    let result = [...projects];

    // Filter by Category
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // Filter by Status Tab
    if (activeTab === 'Completed') {
      result = result.filter(p => p.status === 'Completed');
    } else if (activeTab === 'Ongoing') {
      result = result.filter(p => p.status === 'Ongoing' || p.status === 'Live');
    }

    setFilteredProjects(result);
  }, [projects, activeCategory, activeTab]);

  return (
    <div className="bg-slate-50 dark:bg-brand-dark transition-colors duration-300 font-sans pb-20">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-slate-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            Our Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1">
            Civil Work Registries
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Real construction status maps, milestones, and live structural updates from our active job sites.
          </p>
        </div>
      </section>

      {/* Filter and Tab Section */}
      <section className="py-8 bg-white dark:bg-brand-cardDark border-b border-slate-150 dark:border-slate-850 transition">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Status Tabs */}
          <div className="flex bg-slate-100 dark:bg-brand-dark p-1 rounded-xl">
            {['All', 'Completed', 'Ongoing'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-white dark:bg-brand-cardDark text-brand-blue shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab === 'Ongoing' ? 'Ongoing & Live' : `${tab} Projects`}
              </button>
            ))}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-blue border-brand-blue text-white shadow-md'
                    : 'bg-transparent border-slate-200 dark:border-slate-850 text-slate-500 hover:border-slate-400 dark:hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 w-full animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-brand-cardDark rounded-2xl border border-slate-150 dark:border-slate-850 shadow-sm max-w-md mx-auto">
              <Sparkles className="mx-auto text-slate-300 dark:text-slate-700 w-12 h-12 mb-3" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">No Projects Found</h4>
              <p className="text-xs text-slate-450 dark:text-slate-500 mt-1">
                We haven't uploaded projects under this filter combination yet. Please check other sections!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id || project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                    onViewDetails={(p) => setSelectedProject(p)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Live Timeline Tracker Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white dark:bg-brand-cardDark rounded-2xl overflow-hidden shadow-2xl z-10 border border-slate-100 dark:border-slate-800 max-h-[90vh] flex flex-col"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition z-20"
              >
                <X size={18} />
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto p-6 md:p-8 space-y-6">
                
                {/* Meta details */}
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-brand-orange/15 text-brand-orange px-2.5 py-1 rounded-md">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-3">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Info Row */}
                <div className="grid grid-cols-2 gap-4 border-y border-slate-100 dark:border-slate-800 py-4 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-brand-orange" />
                    <div>
                      <span className="block text-[10px] text-slate-450 uppercase">Location</span>
                      <span className="text-slate-800 dark:text-slate-200">{selectedProject.location || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-brand-blue" />
                    <div>
                      <span className="block text-[10px] text-slate-450 uppercase">Client / Owner</span>
                      <span className="text-slate-800 dark:text-slate-200">{selectedProject.client || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                {selectedProject.status !== 'Completed' && (
                  <div className="space-y-1 bg-slate-50 dark:bg-brand-dark/30 p-4 rounded-xl border border-slate-150/50 dark:border-slate-800/50">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-350">
                        <Activity size={12} className="text-brand-orange animate-pulse" />
                        Live Piling & Foundation Progress
                      </span>
                      <span className="text-brand-blue">{selectedProject.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-orange to-amber-500 rounded-full" style={{ width: `${selectedProject.progress}%` }} />
                    </div>
                  </div>
                )}

                {/* Before / After Site Images Slider */}
                {(selectedProject.beforeImage || selectedProject.afterImage) && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-brand-orange" />
                      Site Transformation — Before &amp; After
                    </h4>
                    <BeforeAfterSlider
                      beforeImage={selectedProject.beforeImage}
                      afterImage={selectedProject.afterImage}
                    />
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-semibold">
                      Drag the handle left or right to compare site images
                    </p>
                  </div>
                )}

                {/* Timeline status track */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Construction Timeline Logs
                  </h4>
                  
                  <div className="relative border-l border-slate-150 dark:border-slate-800 ml-3 space-y-6">
                    {selectedProject.timeline && selectedProject.timeline.length > 0 ? (
                      selectedProject.timeline.map((log, index) => (
                        <div key={index} className="relative pl-6">
                          
                          {/* Dot Icon */}
                          <div className={`absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-white dark:ring-brand-cardDark ${
                            index === 0 ? 'bg-brand-orange animate-ping' : 'bg-slate-400'
                          }`} />
                          
                          <div className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-orange ring-4 ring-white dark:ring-brand-cardDark" />

                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-450">
                            <Calendar size={10} />
                            <span>{new Date(log.date).toLocaleDateString()}</span>
                            <span className="uppercase text-brand-blue border border-brand-blue/30 px-1.5 py-0.5 rounded text-[8px] tracking-wider bg-brand-blue/5">
                              {log.status}
                            </span>
                          </div>
                          
                          <p className="text-xs text-slate-650 dark:text-slate-350 mt-1 leading-relaxed">
                            {log.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 pl-4">No timelines recorded yet.</p>
                    )}
                  </div>
                </div>

                {/* Close Button Bottom */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="bg-slate-100 hover:bg-slate-200 dark:bg-brand-dark dark:hover:bg-slate-800 border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold px-6 py-2.5 rounded-xl text-xs transition"
                  >
                    Close Tracker
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Projects;
