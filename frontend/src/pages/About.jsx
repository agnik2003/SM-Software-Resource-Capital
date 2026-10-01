import { Users, Target, ShieldCheck, Zap, ArrowRight, Code, Cpu, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// Reusing some of our premium generated images for the About page
const images = {
  mission: '/industries/industry_saas_tech_1790845461622.webp',
  security: '/industries/industry_finance_1790845293044.webp',
  scale: '/industries/industry_ecommerce_1790845330093.webp',
};

const AdvantageCard = ({ title, description, icon: Icon, image, delay }) => (
  <div 
    className="group relative rounded-2xl overflow-hidden border border-gray-800 bg-[#0a0a0a] transition-all duration-500 hover:border-green-500/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(34,197,94,0.15)] animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0 h-48 overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
    </div>

    {/* Content */}
    <div className="relative z-10 p-8 pt-32">
      <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(34,197,94,0.2)] group-hover:scale-110 group-hover:bg-green-500/20 transition-all duration-300">
        <Icon className="w-6 h-6 text-green-400" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm md:text-base">{description}</p>
    </div>

    {/* Bottom Glow */}
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500/0 via-green-500/50 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>
);

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-green-500/30 selection:text-green-200">
      
      {/* ── Background Elements ── */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#22c55e05_1px,transparent_1px),linear-gradient(to_bottom,#22c55e05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 right-0 z-0 w-[800px] h-[800px] bg-green-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] left-[-10%] z-0 w-[600px] h-[600px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* ── Hero Section ── */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold tracking-[0.2em] mb-6 backdrop-blur-md animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            BEYOND DEVELOPMENT
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            We Build The Engines <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500 drop-shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              That Drive Business
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            SM Software Resource Capital isn't just a coding shop. We are your technical co-founders, digital architects, and growth partners. 
          </p>
        </div>
      </section>

      {/* ── The Vision (Visual Block) ── */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="relative rounded-3xl overflow-hidden border border-gray-800 bg-black animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <img 
            src={images.mission} 
            alt="Our Engineering Team" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          
          <div className="relative z-10 p-10 md:p-16 lg:p-24 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Technology should solve problems, <br />
              <span className="text-green-400">not create them.</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              We've seen too many businesses held back by sluggish legacy systems, poorly planned architectures, and generic off-the-shelf software. We exist to change that. By combining deep business acumen with elite engineering, we deliver bespoke solutions that scale effortlessly, perform flawlessly, and give you a definitive competitive edge.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-gray-800/60">
              <div>
                <div className="text-3xl font-black text-white mb-1">100%</div>
                <div className="text-sm text-green-400 font-bold uppercase tracking-wider">In-House Code</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">&lt; 1s</div>
                <div className="text-sm text-green-400 font-bold uppercase tracking-wider">Load Times</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">24/7</div>
                <div className="text-sm text-green-400 font-bold uppercase tracking-wider">System Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The SMSRC Advantage (Cards) ── */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The SMSRC Advantage</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-600 mx-auto rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)] mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Why industry leaders choose us to architect their most critical digital infrastructure.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <AdvantageCard 
            title="Rapid Agile Deployment"
            description="We utilize aggressive sprint cycles to ensure your software goes to market faster. Get working features in weeks, not months, without sacrificing code quality."
            icon={Zap}
            image={images.mission}
            delay={100}
          />
          <AdvantageCard 
            title="Enterprise-Grade Security"
            description="Built from the ground up with bank-grade encryption, penetration testing, and robust compliance protocols to protect your business and user data."
            icon={ShieldCheck}
            image={images.security}
            delay={200}
          />
          <AdvantageCard 
            title="Infinite Scalability"
            description="Our cloud-native microservices architectures are engineered to handle explosive growth seamlessly—from your first 100 users to your first million."
            icon={LineChart}
            image={images.scale}
            delay={300}
          />
        </div>
      </section>

      {/* ── Our Philosophy (Text/Icon grid) ── */}
      <section className="relative z-10 bg-[#080808] border-y border-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">We Speak Business <br /><span className="text-green-400">&amp; Write Code</span></h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Most agencies ask you what to build. We ask you what you want to achieve. We dive deep into your operations, understand your revenue models, and identify bottlenecks before writing a single line of code.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                The result? Software that doesn't just look good, but actively reduces costs, automates workflows, and drives revenue.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-green-400 font-bold hover:text-green-300 transition-colors">
                Discuss Your Project <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-black border border-gray-800 p-6 rounded-xl">
                <Code className="w-8 h-8 text-green-500 mb-4" />
                <h4 className="text-xl font-bold mb-2">Clean Architecture</h4>
                <p className="text-gray-500 text-sm">Maintainable, well-documented codebases that future developers will love.</p>
              </div>
              <div className="bg-black border border-gray-800 p-6 rounded-xl mt-0 sm:mt-8">
                <Cpu className="w-8 h-8 text-green-500 mb-4" />
                <h4 className="text-xl font-bold mb-2">Modern Stack</h4>
                <p className="text-gray-500 text-sm">Leveraging the latest in React, Node, cloud infrastructure, and AI integration.</p>
              </div>
              <div className="bg-black border border-gray-800 p-6 rounded-xl">
                <Users className="w-8 h-8 text-green-500 mb-4" />
                <h4 className="text-xl font-bold mb-2">Dedicated Teams</h4>
                <p className="text-gray-500 text-sm">Direct access to the engineers building your product. No middle-men.</p>
              </div>
              <div className="bg-black border border-gray-800 p-6 rounded-xl mt-0 sm:mt-8">
                <Target className="w-8 h-8 text-green-500 mb-4" />
                <h4 className="text-xl font-bold mb-2">ROI Focused</h4>
                <p className="text-gray-500 text-sm">Every feature is measured against its potential to generate value for your business.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative z-10 py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/10 to-transparent pointer-events-none" />
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 relative z-10">Stop settling for average software.</h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">
          Partner with SM Software Resource Capital and build the digital infrastructure your business deserves.
        </p>
        <Link 
          to="/contact" 
          className="relative z-10 inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-black bg-green-500 rounded-lg hover:bg-green-400 hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] transition-all duration-300 transform hover:-translate-y-1"
        >
          Book a Free Strategy Call
        </Link>
      </section>

    </div>
  );
}