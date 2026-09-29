import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Terminal, ChevronRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleComingSoon = (e) => {
    e.preventDefault();
    alert("Official page coming soon. Stay tuned!");
  };

  return (
    <footer className="bg-[#050505] border-t border-gray-800 pt-16 pb-8 relative overflow-hidden">
      
      {/* Subtle Background Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-green-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand & Mission */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/30 group-hover:border-green-400 transition-colors duration-300">
                <Terminal className="w-5 h-5 text-green-500 group-hover:text-green-400" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-lg md:text-xl tracking-tight text-white leading-none mb-1">
                  SM <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">SOFTWARE</span>
                </span>
                <span className="text-[0.55rem] font-bold text-gray-400 tracking-[0.25em] leading-none uppercase">
                  Resource Capital
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Architecting the digital future. We build scalable, high-performance web and mobile applications for enterprise clients and ambitious startups.
            </p>
            
            {/* Social Links (Using Raw SVGs) */}
            <div className="flex space-x-4 pt-2">
              
              {/* LinkedIn: Live Link */}
              <a 
                href="https://www.linkedin.com/company/sm-coretech-solutions-grp/?viewAsMember=true" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded bg-[#111] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>

              {/* Facebook: Coming Soon */}
              <a 
                href="#" 
                onClick={handleComingSoon}
                className="w-9 h-9 rounded bg-[#111] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              {/* Twitter: Coming Soon */}
              <a 
                href="#" 
                onClick={handleComingSoon}
                className="w-9 h-9 rounded bg-[#111] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>

            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'Projects', 'Blog', 'Careers', 'Contact'].map((item) => {
                const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
                return (
                  <li key={item}>
                    <Link to={path} className="text-gray-400 hover:text-green-400 transition-colors text-sm flex items-center group">
                      <ChevronRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-green-500" />
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Core Capabilities */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Capabilities</h4>
            <ul className="space-y-3">
              {['Web Development', 'Mobile App Dev', 'Custom Software', 'Cloud Architecture', 'System Maintenance'].map((item) => (
                <li key={item}>
                  <Link to="/services" className="text-gray-400 hover:text-green-400 transition-colors text-sm flex items-center group">
                    <ChevronRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-green-500" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info (FIXED LAYOUT) */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Headquarters</h4>
            <ul className="space-y-5">
              <li className="flex items-start text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">SM Software Resource Capital<br />Kolkata, West Bengal<br />India</span>
              </li>
              <li>
                <a href="tel:+918017014804" className="flex items-start text-gray-400 hover:text-green-400 transition-colors text-sm group">
                  <Phone className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0 group-hover:animate-pulse" />
                  <span className="font-mono mt-0.5">+91 80170 14804</span>
                </a>
              </li>
              <li>
                <a href="mailto:smsoftwareresourcecapital@gmail.com" className="flex items-start text-gray-400 hover:text-green-400 transition-colors text-sm group">
                  <Mail className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0 group-hover:animate-pulse" />
                  {/* break-all ensures the long email wraps cleanly to the next line */}
                  <span className="font-mono break-all leading-relaxed mt-0.5">smsoftwareresourcecapital@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-mono">
            &copy; {currentYear} SM Software Resource Capital. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-gray-500 font-mono">
            <Link to="#" className="hover:text-green-400 transition-colors">Privacy_Policy</Link>
            <Link to="#" className="hover:text-green-400 transition-colors">Terms_Of_Service</Link>
            <Link to="#" className="hover:text-green-400 transition-colors">Security_Protocol</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}