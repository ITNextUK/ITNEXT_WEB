import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Lock, Mail, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAuth();

  // If already authenticated, redirect straight to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      window.location.hash = '#/admin/dashboard';
    }
  }, [isAuthenticated, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      
      if (!success) {
        setError('Invalid email or password');
      }
      // Navigation is handled by the useEffect below once isAuthenticated becomes true
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-brand-accent rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-brand-dark rounded-full blur-[150px] opacity-10"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <Logo className="h-10" />
          </div>
          <h1 className="text-3xl font-black text-brand-dark mb-3 tracking-tight uppercase">
            Admin Access
          </h1>
          <p className="text-zinc-500 text-sm font-medium">
            Secure authentication portal for ITNEXT platform administration
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[3rem] border border-zinc-200 shadow-2xl shadow-zinc-900/5 p-12 relative overflow-hidden">
          {/* Card Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-accent to-brand-dark"></div>
          
          {/* Lock Icon */}
          <div className="flex justify-center mb-10">
            <div className="w-20 h-20 bg-brand-accentLight rounded-3xl flex items-center justify-center border border-brand-accent/10">
              <Lock className="text-brand-accent" size={32} />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start space-x-3 animate-in fade-in duration-300">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-sm font-bold text-red-900">{error}</p>
                <p className="text-xs text-red-600 mt-1">Please verify your credentials and try again.</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@itnext.uk"
                  required
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all font-medium text-zinc-700"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all font-medium text-zinc-700"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-dark text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-accent transition-all duration-300 shadow-xl shadow-brand-dark/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 mt-8"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={16} />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  <span>Access Admin Console</span>
                </>
              )}
            </button>
          </form>

          {/* Development Credentials Notice */}
          <div className="mt-8 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
            <p className="text-[9px] text-zinc-400 uppercase tracking-widest text-center font-bold">
              Development Mode Credentials
            </p>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-zinc-500 text-center font-medium">
                Email: <span className="font-black text-brand-accent">admin@itnext.uk</span>
              </p>
              <p className="text-xs text-zinc-500 text-center font-medium">
                Password: <span className="font-black text-brand-accent">admin123</span>
              </p>
            </div>
            <p className="text-[9px] text-zinc-400 mt-3 text-center italic">
              Replace with backend authentication in production
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-zinc-400 hover:text-brand-accent transition-colors font-bold uppercase tracking-widest"
          >
            ← Return to Main Site
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-zinc-200">
          <div className="flex items-start space-x-3">
            <Lock className="text-brand-accent flex-shrink-0 mt-0.5" size={16} />
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-2">
                Secure Access Protocol
              </p>
              <p className="text-xs text-zinc-500 leading-relaxed">
                This administrative portal is protected by enterprise-grade authentication. 
                All sessions are encrypted and monitored for security compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
