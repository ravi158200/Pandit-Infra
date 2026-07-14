import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setError('');

    const res = await login(username, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message || 'Invalid username or password.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 dark:bg-brand-dark px-4 sm:px-6 lg:px-8 transition font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white dark:bg-brand-cardDark p-8 rounded-2xl border border-slate-150 dark:border-slate-850 shadow-premium"
      >
        {/* Header Icon */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue mb-4">
            <ShieldCheck size={28} className="stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Admin Console Gate
          </h2>
          <p className="text-xs text-slate-450 dark:text-slate-500 mt-1 font-semibold">
            Provide valid credentials to access the infrastructure lead ledger.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-450 mb-1.5">
              Username / Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <User size={18} />
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin or email@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-450 mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-650 dark:hover:text-slate-250 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-brand-blue dark:hover:bg-blue-600 text-white font-bold py-3.5 rounded-lg shadow-md transition disabled:opacity-50"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Access Dashboard'
            )}
          </button>
        </form>

        {/* Help Tip */}
        <div className="mt-6 text-center border-t border-slate-100 dark:border-slate-800/80 pt-4 text-[10px] font-semibold text-slate-400 dark:text-slate-550 leading-relaxed">
          <p>This panel is restricted to authorized site superintendents only.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
