import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, AlertCircle, User, Briefcase } from 'lucide-react';

// Step 1: Import your photo asset
import agnikPhoto from '../assets/Agnik Photo.jpeg';

export default function Contact() {
    // State for managing form data and submission status
    const [status, setStatus] = useState({ loading: false, error: null, success: false });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        if (data.success && data.user) {
                            setFormData(prev => ({
                                ...prev,
                                name: data.user.name || prev.name,
                                email: data.user.email || prev.email,
                            }));
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            }
        };
        fetchUserData();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null, success: false });

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Transmission failed.');
            }

            setStatus({ loading: false, error: null, success: true });
            // Clear form after successful send, but keep pre-filled data
            setFormData(prev => ({ 
                ...prev,
                subject: '', 
                message: '' 
            }));

            // Hide success message after 5 seconds
            setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
        } catch (error) {
            setStatus({ loading: false, error: error.message, success: false });
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 relative overflow-hidden">

            {/* Background Cyber-Grid & Glow */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#22c55e05_1px,transparent_1px),linear-gradient(to_bottom,#22c55e05_1px,transparent_1px)] bg-[size:30px_30px]"></div>
            <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-bold tracking-widest mb-6 uppercase">
                        Initialize Communication
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Touch</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Whether you are looking to build a scalable enterprise application or need a dedicated engineering team, we are ready to architect your solution.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-12 items-start">

                    {/* LEFT COLUMN: Contact Details & CEO Profile */}
                    <div className="lg:col-span-2 space-y-8 animate-fade-in-left">

                        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 relative overflow-hidden group hover:border-green-500/50 transition-colors duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="flex flex-col items-center text-center">
                                
                                {/* Step 2: New Layered Photo Container with Cool Continuous Animation */}
                                <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
                                    
                                    {/* Animation Layer 1: Outer glowing pulsing border */}
                                    <div className="absolute -inset-2 rounded-full border-2 border-green-500/20 group-hover:border-green-500/50 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] animate-[pulse_3s_ease-in-out_infinite] group-hover:scale-105 transition-all duration-500"></div>
                                    
                                    {/* Animation Layer 2: Rotating Segmented holographic Ring */}
                                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-green-500/60 opacity-70 animate-[spin_15s_linear_infinite] group-hover:animate-[spin_10s_linear_infinite] group-hover:opacity-100 group-hover:border-green-400 transition-all duration-500"></div>

                                    {/* Animation Layer 3: Inner pulse glow directly behind photo */}
                                    <div className="absolute inset-2 rounded-full bg-green-500 opacity-20 blur-xl animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite] group-hover:opacity-40 transition-opacity"></div>
                                    
                                    {/* The Photo with imported asset */}
                                    <img
                                        src={agnikPhoto}
                                        alt="Agnik Mondal"
                                        className="w-28 h-28 rounded-full object-cover border-4 border-[#050505] p-0.5 z-10 relative bg-black transition-all group-hover:border-black group-hover:shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                                        onError={(e) => {
                                            // Enhanced fallback for missing photo to match tech theme
                                            e.target.onerror = null;
                                            e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22150%22%20height%3D%22150%22%20viewBox%3D%220%200%20150%20150%22%3E%3Crect%20fill%3D%22%23111111%22%20width%3D%22150%22%20height%3D%22150%22%2F%3E%3Ctext%20fill%3D%22%2322c55e%22%20font-family%3D%22sans-serif%22%20font-size%3D%2230%22%20dy%3D%2210.5%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3ECEO%3C%2Ftext%3E%3C%2Fsvg%3E";
                                        }}
                                    />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-1">Agnik Mondal</h3>
                                <div className="flex items-center text-green-400 font-medium tracking-wide text-xs mb-6 uppercase gap-1.5">
                                  <Briefcase size={12}/> CEO & Software Developer
                                </div>

                                <div className="w-full space-y-4 text-left border-t border-gray-800 pt-6">
                                    <a href="tel:+918017014804" className="flex items-center text-gray-300 hover:text-green-400 transition-colors group/link">
                                        <div className="w-10 h-10 rounded bg-[#111] border border-gray-800 flex items-center justify-center mr-4 group-hover/link:border-green-500/50 group-hover/link:bg-green-500/10 transition-colors">
                                            <Phone className="w-4 h-4 text-green-500" />
                                        </div>
                                        <span className="font-mono text-sm group-hover/link:tracking-wider transition-all">+91 80170 14804</span>
                                    </a>

                                    <a href="mailto:info@smsrc.in" className="flex items-center text-gray-300 hover:text-green-400 transition-colors group/link">
                                        <div className="w-10 h-10 rounded bg-[#111] border border-gray-800 flex items-center justify-center mr-4 group-hover/link:border-green-500/50 group-hover/link:bg-green-500/10 transition-colors">
                                            <Mail className="w-4 h-4 text-green-500" />
                                        </div>
                                        <span className="font-mono text-xs md:text-sm group-hover/link:tracking-wider transition-all break-all">info@smsrc.in</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                                <MapPin className="w-5 h-5 text-green-500 mr-3" />
                                Global Headquarters
                            </h4>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                SM Software Resource Capital<br />
                                Kolkata, West Bengal<br />
                                India
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Interactive Contact Form */}
                    <div className="lg:col-span-3 bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 md:p-10 relative shadow-[0_0_20px_rgba(0,0,0,0.5)] animate-fade-in-right">
                        <div className="flex items-center mb-8">
                            <MessageSquare className="w-6 h-6 text-green-500 mr-3" />
                            <h2 className="text-2xl font-bold text-white">Send a Transmission</h2>
                        </div>

                        {/* Status Messages */}
                        {status.success && (
                            <div className="mb-6 bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-md flex items-center">
                                <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0" />
                                <p>Transmission successful. We will respond shortly.</p>
                            </div>
                        )}

                        {status.error && (
                            <div className="mb-6 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-md flex items-center">
                                <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                                <p>{status.error}</p>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name *</label>
                                    <div className="relative">
                                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"/>
                                      <input
                                          required
                                          type="text"
                                          name="name"
                                          value={formData.name}
                                          onChange={handleChange}
                                          placeholder="Enter your name"
                                          className="w-full bg-[#111] border border-gray-800 rounded-md pl-11 pr-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-mono text-sm placeholder-gray-600"
                                      />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address *</label>
                                    <div className="relative">
                                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"/>
                                      <input
                                          required
                                          type="email"
                                          name="email"
                                          value={formData.email}
                                          onChange={handleChange}
                                          placeholder="Enter your email"
                                          className="w-full bg-[#111] border border-gray-800 rounded-md pl-11 pr-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-mono text-sm placeholder-gray-600"
                                      />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subject *</label>
                                <input
                                    required
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Project inquiry, consultation, etc."
                                    className="w-full bg-[#111] border border-gray-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-mono text-sm placeholder-gray-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message Payload *</label>
                                <textarea
                                    required
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Tell us about your project requirements..."
                                    className="w-full bg-[#111] border border-gray-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-mono text-sm placeholder-gray-600 resize-none"
                                ></textarea>
                            </div>

                            <button
                                disabled={status.loading}
                                type="submit"
                                className="w-full bg-green-500 text-black font-bold py-4 rounded-md flex items-center justify-center gap-2 hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status.loading ? 'Transmitting...' : 'Transmit Message'}
                                {!status.loading && <Send className="w-4 h-4" />}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}