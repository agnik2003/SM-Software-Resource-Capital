import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Form, Step 2: OTP
  const [status, setStatus] = useState({ loading: false, error: null, success: null });
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [otp, setOtp] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle Initial Registration (Sends OTP)
  const handleSignup = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: null });

    if (formData.password !== formData.confirmPassword) {
      setStatus({ loading: false, error: "Passwords do not match.", success: null });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed.');

      setStatus({ loading: false, error: null, success: "Verification code sent to your email!" });
      setStep(2); // Move to OTP verification screen

    } catch (error) {
      setStatus({ loading: false, error: error.message, success: null });
    }
  };

  // Handle OTP Verification
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: null });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Invalid OTP.');

      localStorage.setItem('token', data.token);
      navigate('/'); // Success! Send to home

    } catch (error) {
      setStatus({ loading: false, error: error.message, success: null });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#22c55e05_1px,transparent_1px),linear-gradient(to_bottom,#22c55e05_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md px-4 sm:px-6">
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-green-400 opacity-80"></div>

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
              <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Create an Account</h1>
              <p className="text-gray-400 text-sm">SM Software Resource Capital</p>
            </div>

            {status.error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-md flex items-center text-sm">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                <p>{status.error}</p>
              </div>
            )}

            {status.success && (
              <div className="mb-6 bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-md flex items-center text-sm">
                <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" />
                <p>{status.success}</p>
              </div>
            )}

            {/* STEP 1: REGISTRATION FORM */}
            {step === 1 && (
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-4 w-4 text-gray-500" /></div>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full bg-[#111] border border-gray-800 rounded-md pl-10 pr-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm placeholder-gray-700" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-4 w-4 text-gray-500" /></div>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" className="w-full bg-[#111] border border-gray-800 rounded-md pl-10 pr-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm placeholder-gray-700" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-4 w-4 text-gray-500" /></div>
                    <input required type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-[#111] border border-gray-800 rounded-md pl-10 pr-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm placeholder-gray-700" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-4 w-4 text-gray-500" /></div>
                    <input required type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="w-full bg-[#111] border border-gray-800 rounded-md pl-10 pr-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm placeholder-gray-700" />
                  </div>
                </div>

                <button disabled={status.loading} type="submit" className="w-full bg-green-500 text-black font-extrabold py-3.5 rounded-md flex items-center justify-center gap-2 hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 uppercase tracking-widest text-sm mt-4 disabled:opacity-50">
                  {status.loading ? 'Processing...' : 'Create Account'}
                  {!status.loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            )}

            {/* STEP 2: OTP VERIFICATION */}
            {step === 2 && (
              <form onSubmit={handleVerifyOTP} className="space-y-5 text-center">
                <p className="text-gray-400 text-sm mb-4">Please enter the 6-digit code sent to <br /><strong className="text-white">{formData.email}</strong></p>

                <input
                  required
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} // Only allow numbers
                  placeholder="000000"
                  className="w-full text-center tracking-[1em] font-mono text-2xl bg-[#111] border border-gray-800 rounded-md py-4 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                />

                <button disabled={status.loading || otp.length < 6} type="submit" className="w-full bg-green-500 text-black font-extrabold py-3.5 rounded-md flex items-center justify-center gap-2 hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 uppercase tracking-widest text-sm mt-4 disabled:opacity-50">
                  {status.loading ? 'Verifying...' : 'Verify Email'}
                </button>
                <button type="button" onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-white mt-4">Change Email</button>
              </form>
            )}

            {step === 1 && (
              <div className="mt-8 text-center border-t border-gray-800 pt-6">
                <p className="text-sm text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="text-green-500 font-bold hover:text-green-400 transition-colors">Log In Here</Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}