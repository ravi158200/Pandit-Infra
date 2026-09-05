import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Lock, User, ShieldCheck, Eye, EyeOff, ArrowLeft, 
  KeyRound, Sparkles, AlertTriangle, X, Mail, Briefcase, 
  Send, Headphones, CheckCircle2, HelpCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Failed login attempts state (persisted in localStorage)
  const [failedAttempts, setFailedAttempts] = useState(() => {
    const saved = localStorage.getItem('admin_login_attempts');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Forgot Password Modal state
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [fpName, setFpName] = useState('');
  const [fpDesignation, setFpDesignation] = useState('');
  const [fpEmail, setFpEmail] = useState('');
  const [fpLoading, setFpLoading] = useState(false);
  const [fpError, setFpError] = useState('');
  const [fpSuccess, setFpSuccess] = useState(false);

  const { login, user, requestForgotPassword } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (failedAttempts >= 5) {
      setError('5 failed login attempts reached. Please connect to admin for assistance.');
      return;
    }

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await login(username, password);
      if (res.success) {
        // Reset failed attempts on successful login
        localStorage.removeItem('admin_login_attempts');
        setFailedAttempts(0);
        navigate('/admin/dashboard');
      } else {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        localStorage.setItem('admin_login_attempts', newAttempts.toString());

        if (newAttempts >= 5) {
          setError('5 failed login attempts reached. Account access paused. Please connect to admin.');
        } else {
          setError(`${res.message || 'Invalid administrative credentials.'} (${5 - newAttempts} attempt${5 - newAttempts > 1 ? 's' : ''} remaining)`);
        }
        setLoading(false);
      }
    } catch (err) {
      setError('Connection failure. Unable to contact authentication server.');
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    if (failedAttempts >= 5) return;
    setUsername('admin');
    setPassword('admin123');
    setError('');
  };

  const openForgotModal = () => {
    setFpName('');
    setFpDesignation('');
    setFpEmail('');
    setFpError('');
    setFpSuccess(false);
    setIsForgotModalOpen(true);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    if (!fpName.trim() || !fpDesignation.trim()) {
      setFpError('Please enter both your Name and Designation.');
      return;
    }

    setFpLoading(true);
    setFpError('');

    try {
      const res = await requestForgotPassword(fpName.trim(), fpDesignation.trim(), fpEmail.trim());
      if (res.success) {
        setFpSuccess(true);
      } else {
        setFpError(res.message || 'Failed to send password reset request.');
      }
    } catch (err) {
      setFpError('Failed to send reset email. Please try again or contact support.');
    } finally {
      setFpLoading(false);
    }
  };

  const handleResetAttempts = () => {
    localStorage.removeItem('admin_login_attempts');
    setFailedAttempts(0);
    setError('');
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-slate-950 px-4 sm:px-6 lg:px-8 py-12 font-sans overflow-hidden select-none">
      
      {/* Dynamic Background Blueprint Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/15 rounded-full filter blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/20 rounded-full filter blur-[120px] pointer-events-none animate-pulse" />

      {/* Main Glassmorphism Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-lg bg-slate-900/90 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-slate-800/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden z-10"
      >
        {/* Top Accent Gradient Border */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-amber-400 to-brand-blue" />

        {/* Top Navigation & Status */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-slate-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={15} className="text-brand-orange" />
            <span>Public Site</span>
          </Link>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800/80 text-[11px] font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>SSL SECURED</span>
          </div>
        </div>

        {/* Brand Logo & Header Info */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link to="/" className="mb-5 block group transform transition-transform duration-300 hover:scale-105">
            <img
              src="/images/logo.svg"
              alt="Pandit Infra Logo"
              className="h-16 w-auto object-contain filter drop-shadow-md"
            />
          </Link>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Admin Console
          </h1>
          <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
            Enter authorized site credentials to manage project tenders, heavy machinery fleet & client ledgers.
          </p>
        </div>

        {/* Alert Banner for 5 Failed Attempts or Errors */}
        <AnimatePresence>
          {failedAttempts >= 5 ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-700/80 text-red-200 text-xs shadow-inner"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-2">
                  <div className="font-bold text-red-100 text-sm">
                    5 Failed Login Attempts Reached
                  </div>
                  <p className="text-red-300 leading-relaxed">
                    Maximum allowed login attempts exceeded. Please connect to admin for assistance or submit a password reset request.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={openForgotModal}
                      className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow"
                    >
                      <Headphones size={14} />
                      <span>Connect to Admin</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetAttempts}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition cursor-pointer"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-xs flex items-start gap-3 shadow-inner"
            >
              <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{error}</div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              Superintendent Username
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 group-focus-within:text-brand-orange transition-colors">
                <User size={18} />
              </span>
              <input
                type="text"
                required
                disabled={failedAttempts >= 5}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username (e.g. admin)"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950/80 text-white placeholder-slate-600 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Security Password
              </label>
              <button
                type="button"
                onClick={openForgotModal}
                className="text-xs text-brand-orange hover:text-orange-400 font-semibold cursor-pointer transition hover:underline flex items-center gap-1"
              >
                <HelpCircle size={13} />
                <span>Forgot Password?</span>
              </button>
            </div>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 group-focus-within:text-brand-orange transition-colors">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                disabled={failedAttempts >= 5}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-slate-800 bg-slate-950/80 text-white placeholder-slate-600 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                disabled={failedAttempts >= 5}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-200 cursor-pointer transition-colors disabled:opacity-50"
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Options Row */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-brand-orange focus:ring-brand-orange focus:ring-offset-slate-950 cursor-pointer accent-brand-orange"
              />
              <span>Keep workstation authorized</span>
            </label>

            <button
              type="button"
              onClick={openForgotModal}
              className="text-slate-400 hover:text-brand-orange text-xs cursor-pointer transition"
            >
              Connect to Admin
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || failedAttempts >= 5}
            className="relative w-full overflow-hidden flex items-center justify-center gap-2.5 bg-gradient-to-r from-brand-orange via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-950/50 hover:shadow-orange-900/60 transition-all duration-300 transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
          >
            {loading ? (
              <div className="flex items-center gap-2.5">
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authenticating Console...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="stroke-[2.5]" />
                <span className="tracking-wide text-sm">AUTHENTICATE & ACCESS</span>
              </div>
            )}
          </button>
        </form>

        {/* Quick Fill / Convenience Card */}
        <div className="mt-8 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <KeyRound size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">Default Super-User Account</p>
              <p className="text-[11px] text-slate-500 font-mono">admin / admin123</p>
            </div>
          </div>

          <button
            type="button"
            disabled={failedAttempts >= 5}
            onClick={handleQuickFill}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={13} />
            <span>Auto-fill</span>
          </button>
        </div>

        {/* Compliance Footer */}
        <div className="mt-6 text-center text-[10px] text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Pandit Infra Engineering. Unauthorized access attempts are monitored and logged.</p>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {isForgotModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange to-amber-500" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition cursor-pointer"
              >
                <X size={20} />
              </button>

              {!fpSuccess ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0">
                      <Headphones size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Forgot Password</h2>
                      <p className="text-xs text-slate-400">Request password reset assistance from Admin</p>
                    </div>
                  </div>

                  {fpError && (
                    <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-start gap-2">
                      <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
                      <span>{fpError}</span>
                    </div>
                  )}

                  <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Full Name <span className="text-brand-orange">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                          <User size={16} />
                        </span>
                        <input
                          type="text"
                          required
                          value={fpName}
                          onChange={(e) => setFpName(e.target.value)}
                          placeholder="e.g. Rajesh Kumar"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-brand-orange text-xs font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Designation <span className="text-brand-orange">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                          <Briefcase size={16} />
                        </span>
                        <input
                          type="text"
                          required
                          value={fpDesignation}
                          onChange={(e) => setFpDesignation(e.target.value)}
                          placeholder="e.g. Senior Site Engineer"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-brand-orange text-xs font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Email Address <span className="text-slate-600 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                          <Mail size={16} />
                        </span>
                        <input
                          type="email"
                          value={fpEmail}
                          onChange={(e) => setFpEmail(e.target.value)}
                          placeholder="e.g. employee@panditinfra.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:outline-none focus:border-brand-orange text-xs font-medium"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsForgotModalOpen(false)}
                        className="px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={fpLoading}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
                      >
                        {fpLoading ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending Email...</span>
                          </>
                        ) : (
                          <>
                            <span>Next</span>
                            <Send size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>

                  <h3 className="text-lg font-extrabold text-white">Reset Email Sent Successfully</h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                    Your password recovery details for <strong className="text-white">{fpName}</strong> ({fpDesignation}) have been transmitted via email to the Site Administrator.
                  </p>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                    The administrator will verify your credentials and reach out to reset your access.
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotModalOpen(false);
                      if (failedAttempts >= 5) {
                        handleResetAttempts();
                      }
                    }}
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
                  >
                    Return to Login
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLogin;
