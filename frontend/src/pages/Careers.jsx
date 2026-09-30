import { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, MapPin, Send, Plus, Trash2, CheckCircle2, AlertCircle, X, ChevronRight } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function Careers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: null, success: false });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    education: [{ institution: '', degree: '', year: '' }],
    workExperience: '',
    resume: null,
    termsAccepted: false
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (isModalOpen && token) {
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
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({ ...prev, phone: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
    }
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData(prev => ({ ...prev, education: newEducation }));
  };

  const addEducation = () => {
    if (formData.education.length < 3) {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, { institution: '', degree: '', year: '' }]
      }));
    }
  };

  const removeEducation = (index) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, education: newEducation }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('location', formData.location);
      submitData.append('education', JSON.stringify(formData.education));
      submitData.append('workExperience', formData.workExperience);
      submitData.append('termsAccepted', formData.termsAccepted);
      if (formData.resume) {
        submitData.append('resume', formData.resume);
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/careers/apply`, {
        method: 'POST',
        body: submitData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application.');
      }

      setStatus({ loading: false, error: null, success: true });
      setFormData(prev => ({
        ...prev,
        phone: '', location: '',
        education: [{ institution: '', degree: '', year: '' }],
        workExperience: '', resume: null, termsAccepted: false
      }));
      
      // Close modal automatically after 3 seconds on success
      setTimeout(() => {
        setIsModalOpen(false);
        setStatus({ loading: false, error: null, success: false });
      }, 3000);
      
    } catch (error) {
      setStatus({ loading: false, error: error.message, success: false });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 relative overflow-hidden">
      
      {/* Background Cyber-Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#22c55e05_1px,transparent_1px),linear-gradient(to_bottom,#22c55e05_1px,transparent_1px)] bg-[size:30px_30px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-bold tracking-widest mb-6 uppercase">
            Join The Matrix
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Build The <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Future</span> With Us
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We are looking for driven, innovative minds to help us scale. If you are ready to make a high-impact contribution, initialize your application below.
          </p>
        </div>

        {/* Centered Job Listings Layout */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center space-x-4 mb-6">
            <h2 className="text-2xl font-bold text-white">Open Positions</h2>
            <div className="flex-grow h-px bg-gradient-to-r from-gray-800 to-transparent"></div>
          </div>
          
          {/* Business Development Intern Card */}
          <div className="bg-[#0a0a0a] border border-gray-800 hover:border-green-500/50 rounded-2xl p-8 md:p-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.8)] transition-all"></div>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
              <div>
                <div className="inline-block bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1 rounded border border-green-500/20 uppercase tracking-wider mb-4">
                  Actively Hiring
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Business Development Intern</h3>
                <div className="flex flex-wrap gap-6 text-sm text-gray-400 font-mono">
                  <span className="flex items-center"><Briefcase className="w-4 h-4 mr-2 text-green-500" /> Sales & Marketing</span>
                  <span className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-green-500" /> Remote / Kolkata</span>
                </div>
              </div>
              
              {/* Trigger Modal Button */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-auto px-8 py-3 bg-green-500 text-black font-extrabold rounded-md hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 uppercase tracking-widest text-sm flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Apply Now
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
              We are seeking a highly motivated intern to lead our client acquisition efforts. Your primary mission will be identifying potential clients, pitching our software development services, and bringing in high-value projects.
            </p>
            
            <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Requirements & Qualifications:</h4>
              <ul className="text-gray-400 space-y-3">
                <li className="flex items-start">
                  <GraduationCap className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Targeting <strong>2027 Passouts</strong> (Currently in 3rd year or higher).</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Pursuing <strong>BBA</strong> or a relevant Bachelor's degree in business or marketing.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Strong understanding of B2B sales, lead generation, and digital marketing strategies.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          
          {/* Modal Container */}
          <div className="bg-[#050505] border border-green-500/30 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.8)] relative">
            
            {/* Modal Header (Sticky) */}
            <div className="sticky top-0 bg-[#050505] border-b border-gray-800 p-6 flex justify-between items-center z-20">
              <div>
                <h2 className="text-2xl font-bold text-white">Submit Application</h2>
                <p className="text-sm text-green-400 font-mono mt-1">Role: Business Development Intern</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white bg-[#111] hover:bg-gray-800 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 md:p-8 overflow-y-auto">
              
              {status.success && (
                <div className="mb-8 bg-green-500/10 border border-green-500 text-green-400 px-4 py-4 rounded-md flex items-center">
                  <CheckCircle2 className="w-6 h-6 mr-3 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Application successfully transmitted!</p>
                    <p className="text-sm mt-1">Check your email for confirmation. This window will close shortly.</p>
                  </div>
                </div>
              )}

              {status.error && (
                <div className="mb-8 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-md flex items-center">
                  <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <p>{status.error}</p>
                </div>
              )}

              {!status.success && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name *</label>
                      <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#111] border border-gray-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-mono text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address *</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#111] border border-gray-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-mono text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number *</label>
                      <PhoneInput
                        international
                        defaultCountry="IN"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="w-full bg-[#111] border border-gray-800 rounded-md px-4 py-3 text-white focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 transition-all font-mono text-sm phone-input-dark"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location (City, State) *</label>
                      <input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-[#111] border border-gray-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-mono text-sm" />
                    </div>
                  </div>

                  {/* Education Matrix (Dynamic) */}
                  <div className="pt-6 border-t border-gray-800">
                    <div className="flex justify-between items-center mb-4">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Education History (Max 3) *</label>
                      {formData.education.length < 3 && (
                        <button type="button" onClick={addEducation} className="text-xs text-green-400 hover:text-green-300 flex items-center bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded transition-colors">
                          <Plus className="w-3 h-3 mr-1" /> Add Degree
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      {formData.education.map((edu, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#0a0a0a] p-4 rounded-md border border-gray-800 relative">
                          <div className="md:col-span-5">
                            <input required type="text" placeholder="Institution Name" value={edu.institution} onChange={(e) => handleEducationChange(index, 'institution', e.target.value)} className="w-full bg-transparent border-b border-gray-700 pb-1 text-white focus:outline-none focus:border-green-500 text-sm font-mono" />
                          </div>
                          <div className="md:col-span-4">
                            <input required type="text" placeholder="Degree (e.g., BBA)" value={edu.degree} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} className="w-full bg-transparent border-b border-gray-700 pb-1 text-white focus:outline-none focus:border-green-500 text-sm font-mono" />
                          </div>
                          <div className="md:col-span-2">
                            <input required type="text" placeholder="Passout Year" value={edu.year} onChange={(e) => handleEducationChange(index, 'year', e.target.value)} className="w-full bg-transparent border-b border-gray-700 pb-1 text-white focus:outline-none focus:border-green-500 text-sm font-mono" />
                          </div>
                          <div className="md:col-span-1 flex justify-end">
                            {formData.education.length > 1 && (
                              <button type="button" onClick={() => removeEducation(index)} className="text-red-500 hover:text-red-400 bg-red-500/10 p-2 rounded">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Work Experience & Resume */}
                  <div className="space-y-2 pt-6 border-t border-gray-800">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Work Experience / Marketing Skills *</label>
                    <textarea required name="workExperience" value={formData.workExperience} onChange={handleChange} rows="3" placeholder="Tell us about projects you've acquired, campaigns you've run, or sales experience..." className="w-full bg-[#111] border border-gray-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-mono text-sm resize-none"></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Resume (PDF, DOC, DOCX) *</label>
                    <input required type="file" accept=".pdf,.doc,.docx" name="resume" onChange={handleFileChange} className="w-full bg-[#111] border border-gray-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-mono text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-green-500/10 file:text-green-500 hover:file:bg-green-500/20" />
                  </div>

                  {/* Terms and Submission */}
                  <div className="pt-6 flex flex-col space-y-6 border-t border-gray-800">
                    <label className="flex items-start cursor-pointer group">
                      <input required type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="mt-1 w-4 h-4 bg-[#111] border-gray-800 rounded text-green-500 focus:ring-green-500" />
                      <span className="ml-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                        I confirm that the information provided is accurate and I accept the <span className="text-green-500 underline">terms and conditions</span> of the application process. *
                      </span>
                    </label>

                    <button disabled={status.loading} type="submit" className="w-full bg-green-500 text-black font-extrabold py-4 rounded-md flex items-center justify-center gap-2 hover:bg-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                      {status.loading ? 'Transmitting Data...' : 'Submit Application'}
                      {!status.loading && <Send className="w-4 h-4" />}
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}