import React, { useState } from 'react';
import { X, Send, CheckCircle2, ArrowRight, ArrowLeft, Building2, HardHat, Sparkles, Phone, Mail, User, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../../utils/api';

const SERVICE_OPTIONS = [
  { id: 'Road Construction', title: 'Road & Highway Paving', icon: '🛣️', desc: 'Asphalt paving, GSB sub-base & IRC code roads' },
  { id: 'Building Construction', title: 'RCC Building & Foundations', icon: '🏗️', desc: 'Commercial RCC structures & deep foundations' },
  { id: 'Industrial Projects', title: 'PEB Industrial Steel Sheds', icon: '🏭', desc: 'Pre-engineered steel clear-span buildings' },
  { id: 'Earthwork Excavation', title: 'Heavy Land Excavation', icon: '🚜', desc: 'Site grading, rock cutting & trenching' },
  { id: 'Bridge & Drainage', title: 'Bridge & Box Culverts', icon: '🌉', desc: 'Stormwater retention & concrete abutments' },
  { id: 'Other Civil Work', title: 'Turn-key Engineering', icon: '⚡', desc: 'Custom civil infrastructure & land development' },
];

const TIMELINE_OPTIONS = [
  'Immediate (< 1 Month)',
  '1 to 3 Months',
  '3 to 6 Months',
  '6+ Months Planning Phase'
];

const QuoteModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'Road Construction',
    projectScope: '5000 sq ft',
    timeline: '1 to 3 Months',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setError('');
    if (step === 1 && !formData.serviceType) {
      setError('Please select a service category');
      return;
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formattedMessage = `[Scope: ${formData.projectScope} | Timeline: ${formData.timeline}] ${formData.message}`;

    try {
      await API.post('/queries', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceType: formData.serviceType,
        message: formattedMessage,
      });

      const randomTicket = `PI-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(randomTicket);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setStep(1);
    setSuccess(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceType: 'Road Construction',
      projectScope: '5000 sq ft',
      timeline: '1 to 3 Months',
      message: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetAndClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white p-6 sm:p-8 shadow-2xl z-10"
          >
            {/* Ambient Background Aura */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleResetAndClose}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X size={20} />
            </button>

            {success ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400"
                >
                  <CheckCircle2 size={42} />
                </motion.div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    Quote Request Received
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                    Estimation Request Logged!
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 max-w-md">
                    Reference ID: <strong className="text-amber-400 font-mono">{ticketId}</strong>. Our senior civil engineering team is reviewing your project requirements and will respond within 4 hours.
                  </p>
                </div>

                <button
                  onClick={handleResetAndClose}
                  className="mt-4 px-8 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 transition cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            ) : (
              <div>
                {/* Header & Step Indicator */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-orange-400 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={14} /> Interactive Quote Wizard
                    </span>
                    <span className="text-slate-400 font-mono">Step {step} of 3</span>
                  </div>

                  <h3 className="text-2xl font-black text-white">
                    {step === 1 && 'Select Infrastructure Service'}
                    {step === 2 && 'Define Scope & Project Timeline'}
                    {step === 3 && 'Contact & Site Specification'}
                  </h3>

                  {/* Step Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
                    <motion.div
                      animate={{ width: `${(step / 3) * 100}%` }}
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Form Steps */}
                <form onSubmit={handleSubmit}>
                  
                  {/* Step 1: Service Category */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
                        {SERVICE_OPTIONS.map((opt) => {
                          const isSelected = formData.serviceType === opt.id;
                          return (
                            <button
                              type="button"
                              key={opt.id}
                              onClick={() => setFormData({ ...formData, serviceType: opt.id })}
                              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-orange-500/15 border-orange-500 text-white shadow-md'
                                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{opt.icon}</span>
                                <div>
                                  <p className={`text-xs font-extrabold ${isSelected ? 'text-orange-400' : 'text-white'}`}>
                                    {opt.title}
                                  </p>
                                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                                    {opt.desc}
                                  </p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={handleNext}
                          className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
                        >
                          Next Step
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Dimensions & Timeline */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                          Approximate Area / Scope (e.g. 5,000 sq ft or 2 km)
                        </label>
                        <input
                          type="text"
                          name="projectScope"
                          value={formData.projectScope}
                          onChange={handleChange}
                          placeholder="e.g. 10,000 sq ft or 5 km highway"
                          className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                          Expected Timeline Requirement
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {TIMELINE_OPTIONS.map((timeOpt) => {
                            const isSelected = formData.timeline === timeOpt;
                            return (
                              <button
                                type="button"
                                key={timeOpt}
                                onClick={() => setFormData({ ...formData, timeline: timeOpt })}
                                className={`p-3 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-orange-500 text-slate-950 border-orange-400 font-extrabold'
                                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                                }`}
                              >
                                {timeOpt}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-2 cursor-pointer"
                        >
                          <ArrowLeft size={16} />
                          Back
                        </button>

                        <button
                          type="button"
                          onClick={handleNext}
                          className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
                        >
                          Next Step
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact & Submit */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Rajesh Sharma"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="rajesh@company.com"
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-orange-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
                            <input
                              type="tel"
                              name="phone"
                              required
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+91 9876543210"
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-orange-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                          Site Location & Additional Project Notes
                        </label>
                        <textarea
                          name="message"
                          rows="2"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Specify site location (e.g. Surat Industrial Area) or structural requirements..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-orange-500 resize-none"
                        />
                      </div>

                      {error && <p className="text-red-400 text-xs font-bold">{error}</p>}

                      <div className="pt-3 flex justify-between">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-2 cursor-pointer"
                        >
                          <ArrowLeft size={16} />
                          Back
                        </button>

                        <button
                          type="submit"
                          disabled={loading}
                          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-orange-500/25 cursor-pointer disabled:opacity-50"
                        >
                          {loading ? (
                            <div className="h-5 w-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <Send size={16} />
                              Submit Formal Quote Request
                            </>
                          )}
                        </button>
                      </div>

                    </motion.div>
                  )}

                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
