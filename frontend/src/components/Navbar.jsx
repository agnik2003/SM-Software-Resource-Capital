import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userName, setUserName] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // 1. Scroll Effect (Enhanced Glassmorphism)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Auth Session Check
  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUserName(null);
        return;
      }

      // Silently sync with backend to get latest data
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            setUserName(data.user.name.split(' ')[0]);
          }
        } else {
          // Token invalid or expired
          handleLogout();
        }
      } catch (error) {
        console.error("Session sync failed:", error);
      }
    };

    checkSession();
  }, [location.pathname]);

  // 3. Secure Logout Protocol
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserName(null);
    setIsOpen(false);
    navigate('/login');
  };

  const navLinks = ['Home', 'About Us', 'Services', 'Projects', 'Blog', 'Careers', 'Contact'];

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}} />

      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#050505]/70 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-[#050505]/50 backdrop-blur-md border-b border-transparent py-4'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* LOGO */}
            <Link to="/" className="flex items-center" aria-label="SM Software Resource Capital - Go to Home">
              <img
                src={logo}
                alt="SM Software Resource Capital"
                className="h-16 md:h-24 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((item) => {
                const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
                const isActive = location.pathname === path;

                return (
                  <Link
                    key={item}
                    to={path}
                    className={`px-4 py-2 rounded-md text-xs font-bold tracking-widest uppercase transition-all duration-300 ${isActive
                        ? 'text-green-400 bg-green-500/10'
                        : 'text-gray-300 hover:text-green-400 hover:bg-white/5'
                      }`}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center space-x-6">
              {userName ? (
                <>
                  <div className="flex items-center px-3 py-1.5 bg-white/5 border border-white/10 backdrop-blur-md rounded-md shadow-sm">
                    <User className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-300 text-sm font-bold tracking-wider">Hi, <span className="text-white">{userName}</span></span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-500 hover:text-red-400 transition-colors text-sm font-bold tracking-wider group"
                  >
                    <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-green-400 transition-colors text-sm font-bold tracking-wider">
                    LOG IN
                  </Link>
                  <Link to="/signup" className="px-6 py-2.5 bg-green-500/10 border border-green-500/50 text-green-400 rounded-md shadow-[0_0_15px_rgba(34,197,94,0.1)] hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] hover:bg-green-500 hover:text-black hover:border-green-500 transition-all duration-300 text-sm font-bold tracking-widest backdrop-blur-sm">
                    INITIALIZE
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-green-400 p-2 focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="lg:hidden bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 absolute w-full shadow-2xl">
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">

              {userName && (
                <div className="flex items-center px-3 py-4 mb-2 bg-white/5 rounded-md border border-white/10 backdrop-blur-md">
                  <User className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-300 text-sm font-bold tracking-wider uppercase">Active Session: <span className="text-white">{userName}</span></span>
                </div>
              )}

              {navLinks.map((item) => {
                const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
                return (
                  <Link
                    key={item}
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-3 text-sm font-bold tracking-wider uppercase text-gray-300 hover:text-green-400 hover:bg-white/5 rounded-md transition-colors"
                  >
                    {item}
                  </Link>
                );
              })}

              <div className="w-full h-px bg-white/10 my-4"></div>

              {userName ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full mt-2 px-5 py-3 border border-red-500/50 bg-red-500/5 text-red-400 font-bold tracking-widest rounded-md hover:bg-red-500 hover:text-black transition-all"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  TERMINATE SESSION
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-sm font-bold tracking-wider text-gray-300 hover:text-green-400">LOG IN</Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="block mt-2 w-full text-center px-5 py-3 border border-green-500 text-green-400 font-bold tracking-widest rounded-md hover:bg-green-500 hover:text-black transition-all">
                    INITIALIZE
                  </Link>
                </>
              )}

            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;