import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, MonitorPlay, Code, Wrench, ArrowRight, Megaphone, Target, Share2, Plus } from 'lucide-react';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import IndustriesSection from '../components/IndustriesSection';

// --- CUSTOM PARTICLE NETWORK BACKGROUND ---
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Setup Canvas Size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle Configuration
    const particleCount = Math.min(window.innerWidth / 15, 80); // Responsive count
    const connectionDistance = 150;
    const speed = 0.5;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 197, 94, 0.5)'; // Tailwind green-500
        ctx.fill();
      }
    }

    // Initialize Particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Opacity fades as they get further apart
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(34, 197, 94, ${opacity * 0.2})`; 
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};
// --- END PARTICLE COMPONENT ---


export default function Home() {
  const services = [
    {
      title: "Web Development",
      description: "High-performance, scalable web applications built with modern architectures like React and Node.js.",
      icon: <MonitorPlay className="w-10 h-10 text-green-400 mb-4" />
    },
    {
      title: "Mobile App Dev",
      description: "Native and cross-platform mobile experiences designed for speed, security, and user retention.",
      icon: <Smartphone className="w-10 h-10 text-green-400 mb-4" />
    },
    {
      title: "Custom Software",
      description: "Bespoke software platforms engineered from the ground up to solve your unique business challenges.",
      icon: <Code className="w-10 h-10 text-green-400 mb-4" />
    },
    {
      title: "System Maintenance",
      description: "24/7 technical support, infrastructure scaling, and legacy system modernization.",
      icon: <Wrench className="w-10 h-10 text-green-400 mb-4" />
    }
  ];

  const otherServices = [
    {
      title: "Digital Marketing",
      description: "Build your brand, increase visibility and get more customers.",
      icon: <Megaphone className="w-10 h-10 text-green-400 mb-4" />
    },
    {
      title: "Meta & Google Ads",
      description: "Targeted ad campaigns to get better reach, leads and sales.",
      icon: <Target className="w-10 h-10 text-green-400 mb-4" />
    },
    {
      title: "Social Media Page Handling",
      description: "Create, grow and manage your social media presence professionally.",
      icon: <Share2 className="w-10 h-10 text-green-400 mb-4" />
    },
    {
      title: "And More",
      description: "UI/UX Design, E-commerce, SEO, Branding, IT Consulting and more...",
      icon: <Plus className="w-10 h-10 text-green-400 mb-4" />
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050505]">
      
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#22c55e08_1px,transparent_1px),linear-gradient(to_bottom,#22c55e08_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* The Dynamic Canvas Network */}
      <ParticleBackground />

      {/* Glowing Center Orb */}
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500 opacity-10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-4xl mx-auto space-y-8 mt-10">
          
          <div className="inline-block px-5 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs md:text-sm font-bold tracking-[0.2em] mb-4 shadow-[0_0_15px_rgba(34,197,94,0.1)] backdrop-blur-sm animate-fade-in-up">
            SYSTEMS ONLINE • ENTERPRISE READY
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Architecting the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 drop-shadow-[0_0_15px_rgba(74,222,128,0.2)]">
              Digital Future
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mt-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            SM Software Resource Capital delivers cutting-edge mobile, web, and custom application development. We build scalable systems that power tomorrow's businesses.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/services" className="w-full sm:w-auto px-8 py-4 bg-green-500 text-black font-extrabold text-lg rounded-md hover:bg-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1">
              Explore Our Services
              <ArrowRight size={20} strokeWidth={3} />
            </Link>
            
            <Link to="/careers" className="w-full sm:w-auto px-8 py-4 border-2 border-gray-700 text-white font-bold text-lg rounded-md hover:border-green-400 hover:text-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all duration-300 bg-black/40 backdrop-blur-md transform hover:-translate-y-1">
              Join The Team
            </Link>
          </div>
        </div>

        {/* SERVICES GRID SECTION */}
        <div className="mt-40 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core Infrastructure</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-20">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group p-8 rounded-xl bg-[#0a0a0a]/80 backdrop-blur-sm border border-gray-800 hover:border-green-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] transition-all duration-500 relative overflow-hidden transform hover:-translate-y-2"
              >
                {/* Top Glowing Edge on Hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                <div className="relative z-10">
                  {service.icon}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
                
                {/* Bottom Right Hexagon Accent */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-green-500/5 rotate-45 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* OTHER SERVICES SECTION */}
        <div className="mt-20 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Other Services</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-20">
            {otherServices.map((service, index) => (
              <div
                key={index}
                className="group p-8 rounded-xl bg-[#0a0a0a]/80 backdrop-blur-sm border border-gray-800 hover:border-green-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] transition-all duration-500 relative overflow-hidden transform hover:-translate-y-2"
              >
                {/* Top Glowing Edge on Hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                <div className="relative z-10">
                  {service.icon}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Right Hexagon Accent */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-green-500/5 rotate-45 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Industries We Serve ── */}
      <IndustriesSection />

      {/* ── Stats Section ── */}
      <StatsSection />

      {/* ── Testimonials Section ── */}
      <TestimonialsSection />

    </div>
  );
}