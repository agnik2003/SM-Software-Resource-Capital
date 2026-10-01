import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartPulse, Landmark, ShoppingCart, GraduationCap, Building2,
  Truck, Cpu, Plane, Leaf, Clapperboard, ShoppingBag, Factory,
  BarChart3, Utensils, Home, ArrowUpRight, MessageSquare,
} from 'lucide-react';

/* ── Industry data with real image paths ───────────────────── */
const industries = [
  {
    title: 'Healthcare',
    sub: 'Hospitals · Clinics · MedTech',
    icon: HeartPulse,
    image: '/industries/industry_healthcare_1790845275364.webp',
    accent: '#f43f5e',
    query: 'Healthcare',
  },
  {
    title: 'Finance & Banking',
    sub: 'FinTech · Insurance · Trading',
    icon: Landmark,
    image: '/industries/industry_finance_1790845293044.webp',
    accent: '#f59e0b',
    query: 'Finance',
  },
  {
    title: 'E-Commerce & Retail',
    sub: 'D2C · Marketplaces · Stores',
    icon: ShoppingCart,
    image: '/industries/industry_ecommerce_1790845330093.webp',
    accent: '#8b5cf6',
    query: 'ECommerce',
  },
  {
    title: 'Education',
    sub: 'EdTech · Schools · Coaching',
    icon: GraduationCap,
    image: '/industries/industry_education_1790845343640.webp',
    accent: '#0ea5e9',
    query: 'Education',
  },
  {
    title: 'Real Estate',
    sub: 'Developers · PropTech · Realtors',
    icon: Building2,
    image: '/industries/industry_realestate_1790845356179.webp',
    accent: '#f97316',
    query: 'RealEstate',
  },
  {
    title: 'Logistics & Supply',
    sub: 'Fleet · WMS · Last-mile',
    icon: Truck,
    image: '/industries/industry_logistics_1790845369172.webp',
    accent: '#14b8a6',
    query: 'Logistics',
  },
  {
    title: 'Manufacturing',
    sub: 'ERP · Industrial · Exports',
    icon: Factory,
    image: '/industries/industry_manufacturing_1790845449425.webp',
    accent: '#a1a1aa',
    query: 'Manufacturing',
  },
  {
    title: 'SaaS & Tech',
    sub: 'Startups · Platforms · APIs',
    icon: Cpu,
    image: '/industries/industry_saas_tech_1790845461622.webp',
    accent: '#22c55e',
    query: 'SaaS',
  },
  {
    title: 'Travel & Tourism',
    sub: 'OTA · Agencies · Hospitality',
    icon: Plane,
    image: '/industries/industry_travel_1790845495122.webp',
    accent: '#06b6d4',
    query: 'Travel',
  },
  {
    title: 'Food & Restaurant',
    sub: 'POS · Ordering · Cloud Kitchen',
    icon: Utensils,
    image: '/industries/industry_food_1790845511135.webp',
    accent: '#ef4444',
    query: 'Food',
  },
  {
    title: 'Agriculture',
    sub: 'AgriTech · Farming · Supply',
    icon: Leaf,
    image: '/industries/industry_agriculture_1790845523023.webp',
    accent: '#84cc16',
    query: 'Agriculture',
  },
  {
    title: 'Media & Entertainment',
    sub: 'OTT · Studios · Live Events',
    icon: Clapperboard,
    image: '/industries/industry_media_1790845539198.webp',
    accent: '#d946ef',
    query: 'Media',
  },
  {
    title: 'Fashion & Apparel',
    sub: 'Boutiques · Labels · D2C',
    icon: ShoppingBag,
    image: '/industries/industry_fashion_1790845553452.jpg',
    accent: '#ec4899',
    query: 'Fashion',
  },
  {
    title: 'Analytics & BI',
    sub: 'Dashboards · Reports · AI',
    icon: BarChart3,
    image: null,  // will use gradient fallback
    accent: '#6366f1',
    query: 'Analytics',
    fallbackGrad: 'from-indigo-900 via-indigo-800 to-[#090909]',
  },
  {
    title: 'PropTech',
    sub: 'Portals · CRM · Listings',
    icon: Home,
    image: null,
    accent: '#10b981',
    query: 'PropTech',
    fallbackGrad: 'from-emerald-900 via-emerald-800 to-[#090909]',
  },
  {
    title: 'Social & Community',
    sub: 'Platforms · Forums · Apps',
    icon: MessageSquare,
    image: null,
    accent: '#3b82f6',
    query: 'Social',
    fallbackGrad: 'from-blue-900 via-blue-800 to-[#090909]',
  },
];

/* ── Single card ────────────────────────────────────────────── */
const IndustryCard = ({ industry, visible, index }) => {
  const { title, sub, icon: Icon, image, accent, query, fallbackGrad } = industry;

  return (
    <Link
      to={`/contact?industry=${query}`}
      className={`industry-card group relative rounded-2xl overflow-hidden
                  block cursor-pointer
                  transition-all duration-500 ease-out
                  hover:-translate-y-3
                  hover:shadow-[0_28px_56px_rgba(0,0,0,0.7),0_0_0_1px_var(--accent)]
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{
        transitionDelay: visible ? `${(index % 6) * 70}ms` : '0ms',
        '--accent': `${accent}50`,
        border: `1px solid ${accent}25`,
        aspectRatio: '3/4',
      }}
      aria-label={`Explore ${title} software solutions`}
    >
      {/* — Background image or gradient fallback — */}
      {image ? (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGrad || 'from-gray-900 to-[#090909]'}`} />
      )}

      {/* — Multi-layer dark overlay for readability — */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/20" />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(to top, ${accent}55 0%, ${accent}10 50%, transparent 100%)` }}
      />

      {/* — Animated accent top bar — */}
      <div
        className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-600 rounded-b-full"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />

      {/* — Content — */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-5">
        {/* Icon badge */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${accent}25`,
            border: `1px solid ${accent}50`,
            boxShadow: `0 0 14px ${accent}30`,
          }}
        >
          <Icon size={20} style={{ color: accent }} strokeWidth={1.5} />
        </div>

        <h3 className="text-white font-extrabold text-sm leading-tight mb-1" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
          {title}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-3">{sub}</p>

        {/* Explore button */}
        <div
          className="flex items-center gap-1.5 text-xs font-bold
                     transition-all duration-300
                     -translate-y-1 opacity-0
                     group-hover:opacity-100 group-hover:translate-y-0"
          style={{ color: accent }}
        >
          <span>Explore</span>
          <ArrowUpRight size={14} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform duration-200" />
        </div>
      </div>

      {/* — Corner glow dot — */}
      <div
        className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-[2] transition-all duration-300"
        style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
      />
    </Link>
  );
};

/* ── Main Section ───────────────────────────────────────────── */
export default function IndustriesSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="industries-section" className="relative py-28 overflow-hidden">

      {/* Faint grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e05_1px,transparent_1px),linear-gradient(to_bottom,#22c55e05_1px,transparent_1px)] bg-[size:50px_50px]" />
      {/* Top ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-green-600 opacity-[0.025] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div className="max-w-xl">
            <div className="inline-block px-5 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold tracking-[0.2em] mb-5 backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.1)]">
              INDUSTRY EXPERTISE
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Industries{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.3)]">
                We Serve
              </span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              2+ years of deep domain expertise across{' '}
              <span className="text-green-400 font-semibold">16+ industries</span>.
              Each sector has its own challenges — we build technology that speaks your language.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-600 mt-6 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
          </div>

          <div className="flex-shrink-0">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-xl font-extrabold text-sm tracking-widest uppercase
                         bg-green-500 text-black
                         hover:bg-green-400
                         hover:shadow-[0_0_40px_rgba(34,197,94,0.5)]
                         transition-all duration-300
                         transform hover:-translate-y-1"
            >
              Book a Consultation
              <ArrowUpRight size={18} strokeWidth={3} className="group-hover:rotate-45 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {industries.map((industry, i) => (
            <IndustryCard key={i} industry={industry} visible={visible} index={i} />
          ))}
        </div>

        {/* ── Footer note ── */}
        <div
          className={`mt-10 text-center text-gray-500 text-sm transition-all duration-700 delay-700
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          Don&apos;t see your industry?{' '}
          <span className="font-semibold text-gray-400">We work across 40+</span> —{' '}
          <Link
            to="/contact"
            className="text-green-400 font-semibold hover:text-green-300 underline underline-offset-2 transition-colors duration-200"
          >
            talk to us
          </Link>
          .
        </div>
      </div>
    </section>
  );
}