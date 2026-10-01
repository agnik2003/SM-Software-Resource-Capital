import { useEffect, useRef, useState } from 'react';
import { Users, FolderKanban, Star, Clock } from 'lucide-react';

/* ── Count-up hook ────────────────────────────────────────── */
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ── Single stat card ─────────────────────────────────────── */
const StatCard = ({ icon: Icon, value, suffix, label, color, delay, started, isDecimal }) => {
  const raw = useCountUp(isDecimal ? Math.round(value * 10) : value, 2000, started);
  const displayed = isDecimal ? (raw / 10).toFixed(1) : raw;

  return (
    <div
      className="stat-card-wrapper group"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* 3-D tilt container */}
      <div className="stat-card relative flex flex-col items-center justify-center p-8 rounded-2xl overflow-hidden
                      bg-[#080808] border border-gray-800
                      transition-all duration-500
                      group-hover:border-opacity-80
                      group-hover:-translate-y-3
                      group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)]">

        {/* Animated gradient top-border */}
        <div
          className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />

        {/* Corner glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
          style={{ background: `radial-gradient(ellipse at 50% 100%, ${color}18 0%, transparent 65%)` }}
        />

        {/* Icon ring with pulse */}
        <div
          className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-5 stat-icon-ring"
          style={{
            background: `${color}12`,
            border: `1px solid ${color}50`,
            boxShadow: `0 0 20px ${color}25, inset 0 0 20px ${color}08`,
          }}
        >
          <Icon size={28} style={{ color }} strokeWidth={1.5} />
        </div>

        {/* Counter */}
        <div className="relative z-10 flex items-end gap-0.5 mb-2">
          <span
            className="text-5xl md:text-6xl font-black tabular-nums leading-none"
            style={{ color, textShadow: `0 0 40px ${color}70, 0 0 80px ${color}30` }}
          >
            {displayed}
          </span>
          <span
            className="text-3xl font-black mb-1 leading-none"
            style={{ color, textShadow: `0 0 20px ${color}80` }}
          >
            {suffix}
          </span>
        </div>

        {/* Label */}
        <p className="relative z-10 text-gray-400 text-xs font-bold tracking-[0.15em] uppercase text-center mt-1">
          {label}
        </p>

        {/* Bottom-right orb */}
        <div
          className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
          style={{ background: color }}
        />
      </div>
    </div>
  );
};

/* ── Orbital ring decoration ──────────────────────────────── */
const OrbitalRing = ({ size, borderColor, duration, style }) => (
  <div
    className="absolute rounded-full pointer-events-none orbital-spin"
    style={{
      width: size,
      height: size,
      border: `1px solid ${borderColor}`,
      animationDuration: duration,
      ...style,
    }}
  />
);

/* ── Main component ───────────────────────────────────────── */
export default function StatsSection() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: FolderKanban, value: 150, suffix: '+', label: 'Projects Completed', color: '#22c55e', delay: 0 },
    { icon: Users,        value: 80,  suffix: '+', label: 'Happy Clients',      color: '#10b981', delay: 150 },
    { icon: Clock,        value: 2,   suffix: '+', label: 'Years of Experience',color: '#34d399', delay: 300 },
    { icon: Star,         value: 5,   suffix: '★', label: 'Client Rating',      color: '#6ee7b7', delay: 450, isDecimal: false },
  ];

  return (
    <section ref={sectionRef} id="stats-section" className="relative py-28 overflow-hidden">

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e06_1px,transparent_1px),linear-gradient(to_bottom,#22c55e06_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Ambient blobs */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-600 opacity-[0.04] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-400 opacity-[0.04] blur-[100px] rounded-full pointer-events-none" />

      {/* Orbital decorations */}
      <OrbitalRing size="320px" borderColor="#22c55e20" duration="14s" style={{ top: '-100px', left: '-80px' }} />
      <OrbitalRing size="220px" borderColor="#10b98128" duration="20s" style={{ top: '55%', left: '3%' }} />
      <OrbitalRing size="260px" borderColor="#34d39920" duration="17s" style={{ top: '5%', left: '78%' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-5 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold tracking-[0.2em] mb-5 backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.1)]">
            OUR IMPACT
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Numbers That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.3)]">
              Speak
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Every metric is a story — of trust built, problems solved, and businesses transformed.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-600 mx-auto mt-6 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
