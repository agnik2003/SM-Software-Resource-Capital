import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [status, setStatus] = useState({ loading: false, error: null });
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Invalid credentials.');

      localStorage.setItem('token', data.token);
      setStatus({ loading: false, error: null });
      navigate('/');

    } catch (error) {
      setStatus({ loading: false, error: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#22c55e05_1px,transparent_1px),linear-gradient(to_bottom,#22c55e05_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md px-4 sm:px-6">
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600 opacity-80"></div>

          <div className="p-8 md:p-10">
            {/* Proper Company Geometric Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
              <p className="text-gray-400 text-sm">Sign in to your account</p>
            </div>

            {status.error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-md flex items-center text-sm">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                <p>{status.error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-4 w-4 text-gray-500" /></div>
                  <input required type="email" name="email" value={credentials.email} onChange={handleChange} placeholder="john@company.com" className="w-full bg-[#111] border border-gray-800 rounded-md pl-10 pr-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm placeholder-gray-700" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                  <Link to="#" className="text-xs text-green-500 hover:text-green-400 transition-colors">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-4 w-4 text-gray-500" /></div>
                  <input required type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-[#111] border border-gray-800 rounded-md pl-10 pr-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm placeholder-gray-700" />
                </div>
              </div>

              <button disabled={status.loading} type="submit" className="w-full bg-green-500 text-black font-extrabold py-3.5 rounded-md flex items-center justify-center gap-2 hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 uppercase tracking-widest text-sm mt-4 disabled:opacity-50">
                {status.loading ? 'Signing In...' : 'Sign In'}
                {!status.loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-gray-800 pt-6">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-green-500 font-bold hover:text-green-400 transition-colors">Create Account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}