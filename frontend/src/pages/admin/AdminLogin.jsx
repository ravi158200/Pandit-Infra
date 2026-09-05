import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ShieldCheck, Eye, EyeOff, ArrowLeft, KeyRound, Sparkles, Building2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await login(username, password);
      if (res.success) {
        navigate('/admin/dashboard');
      } else {
        setError(res.message || 'Invalid administrative credentials provided.');
        setLoading(false);
      }
    } catch (err) {
      setError('Connection failure. Unable to contact authentication server.');
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('admin123');
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

        {/* Alert Banner for Errors */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-xs flex items-start gap-3 shadow-inner"
            >
              <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{error}</div>
            </motion.div>
          )}
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username (e.g. admin)"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950/80 text-white placeholder-slate-600 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange text-sm font-medium transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Security Password
              </label>
            </div>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 group-focus-within:text-brand-orange transition-colors">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-slate-800 bg-slate-950/80 text-white placeholder-slate-600 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange text-sm font-medium transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-200 cursor-pointer transition-colors"
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="relative w-full overflow-hidden flex items-center justify-center gap-2.5 bg-gradient-to-r from-brand-orange via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-950/50 hover:shadow-orange-900/60 transition-all duration-300 transform active:scale-[0.99] disabled:opacity-50 cursor-pointer mt-2"
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
            onClick={handleQuickFill}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0"
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
    </div>
  );
};

export default AdminLogin;
