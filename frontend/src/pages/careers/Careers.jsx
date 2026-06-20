import React, { useState } from 'react';
import { Briefcase, MapPin, Calendar, Clock, X, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../../utils/api';

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    resumeLink: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const jobOpenings = [
    {
      title: 'Civil Site Engineer',
      department: 'Projects & Execution',
      location: 'Pune Highway Site',
      type: 'Full-time',
      exp: '3-5 Years',
      details: 'Supervising asphalt layer layings, concrete mixes pouring, site logistics management, and drafting daily project progress logs.',
      requirements: ['B.E. / B.Tech in Civil Engineering', 'Experience supervising road/highway projects', 'Proficient in site scheduling & material quality checks']
    },
    {
      title: 'Junior AutoCAD Architect',
      department: 'Design & Estimations',
      location: 'Corporate HQ (Thane)',
      type: 'Full-time',
      exp: '1-3 Years',
      details: 'Drafting 2D blueprints, modeling structural framing models, checking elevations, and collaborating with estimation teams on material quantities.',
      requirements: ['Degree / Diploma in Architecture or Civil Drafting', 'Exemplary proficiency in AutoCAD 2D/3D and Revit', 'Attention to structural details and elevations']
    },
    {
      title: 'Site Quality Supervisor (RCC)',
      department: 'Quality Assurance',
      location: 'Mumbai Residential Tower Site',
      type: 'Full-time',
      exp: '5+ Years',
      details: 'Inspecting TMT steel reinforcings, checking concrete grade pouring consistency, core sample testing, and enforcing strict safety guidelines.',
      requirements: ['Diploma in Civil Engineering or equivalent', 'Expert knowledge of IS codes for RCC structures', 'Experience managing safety audits at high-rise sites']
    }
  ];

  const handleOpenApply = (job) => {
    setSelectedJob(job);
    setFormData({ ...formData, position: job.title });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await API.post('/careers', formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        message: '',
        resumeLink: '',
      });
      setTimeout(() => {
        setSuccess(false);
        setSelectedJob(null);
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-brand-dark transition-colors duration-300 font-sans pb-20">
      
      {/* Header Banner */}
      <section className="relative py-20 bg-slate-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
            Join Our Team
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1">
            Build Your Career with Us
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Explore rewarding positions on site or in our structural drafting studios. We build career paths, not just structures.
          </p>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] font-black tracking-widest text-brand-blue uppercase">Openings</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">Active Site Openings</h3>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-brand-cardDark p-6 rounded-2xl border border-slate-150 dark:border-slate-850 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-6 hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{job.title}</h4>
                    <span className="text-[10px] font-bold text-brand-blue bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                      {job.department}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 dark:text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-brand-orange" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-brand-blue" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-brand-yellow" />
                      <span>Exp: {job.exp}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                    {job.details}
                  </p>

                  <div className="pt-2">
                    <h5 className="text-xs font-bold text-slate-700 dark:text-slate-350 mb-1.5">Key Qualifications:</h5>
                    <ul className="text-xs space-y-1 list-disc pl-4 text-slate-500 dark:text-slate-400 font-medium">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="shrink-0 self-end md:self-start pt-2">
                  <button
                    onClick={() => handleOpenApply(job)}
                    className="bg-brand-orange hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition text-xs"
                  >
                    Apply for Role
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Application Popup Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-brand-cardDark rounded-2xl p-6 shadow-2xl z-10 border border-slate-100 dark:border-slate-800"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X size={18} />
              </button>

              {success ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle2 className="text-emerald-500 w-16 h-16 mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-sans">Application Received!</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xs text-sm">
                    Thank you for applying. Our HR recruitment team will evaluate your credentials and reach out for technical testing.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Apply for Position
                  </h3>
                  <p className="text-brand-blue font-bold text-xs mt-1 uppercase tracking-wider mb-5">
                    {selectedJob.title}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-550 dark:text-slate-450 uppercase tracking-wider mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Amit Sen"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-550 dark:text-slate-450 uppercase tracking-wider mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="amit@gmail.com"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-550 dark:text-slate-450 uppercase tracking-wider mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="9876543210"
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-550 dark:text-slate-450 uppercase tracking-wider mb-1">
                        Resume Link (Drive/Dropbox URL)
                      </label>
                      <input
                        type="url"
                        name="resumeLink"
                        required
                        value={formData.resumeLink}
                        onChange={handleChange}
                        placeholder="https://drive.google.com/.../my-cv.pdf"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-550 dark:text-slate-450 uppercase tracking-wider mb-1">
                        Cover Note / Message
                      </label>
                      <textarea
                        name="message"
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your civil project management experience..."
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none"
                      />
                    </div>

                    {error && <p className="text-red-500 text-xs font-medium">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-650 hover:to-blue-750 text-white font-bold py-3 rounded-lg shadow-md transition"
                    >
                      {loading ? (
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={16} />
                          Submit Application
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Careers;
