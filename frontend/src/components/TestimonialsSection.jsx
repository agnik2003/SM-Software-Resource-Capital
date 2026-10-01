import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rohit Sharma',
    role: 'CEO, TechNova Solutions',
    text: 'SM Software Resource Capital completely transformed our digital infrastructure. The team delivered a scalable, blazing-fast platform that exceeded every expectation. Truly world-class.',
    rating: 5,
    initials: 'RS',
    color: '#22c55e',
  },
  {
    name: 'Priya Nair',
    role: 'Founder, GreenLeaf E-Commerce',
    text: 'Working with SM Software felt like having a dedicated tech co-founder. They built our entire e-commerce platform from scratch — on time and on budget. Sales are up 3x!',
    rating: 5,
    initials: 'PN',
    color: '#10b981',
  },
  {
    name: 'Arjun Mehta',
    role: 'CTO, FinEdge Capital',
    text: 'The mobile app they delivered is slick, secure, and our users love it. Their attention to detail and post-launch support is unlike anything I have experienced before.',
    rating: 5,
    initials: 'AM',
    color: '#34d399',
  },
  {
    name: 'Sneha Kapoor',
    role: 'Marketing Head, BrightSpark Agency',
    text: 'Their digital marketing team took us from nearly zero online presence to 50,000 monthly visitors in 6 months. The ROI has been phenomenal — we could not be happier.',
    rating: 5,
    initials: 'SK',
    color: '#6ee7b7',
  },
  {
    name: 'Vikram Bose',
    role: 'Director, LogiCore Systems',
    text: 'We hired SM Software for a complex custom ERP integration and they nailed it. Communication was transparent throughout, and the final product runs flawlessly.',
    rating: 5,
    initials: 'VB',
    color: '#22c55e',
  },
];

/* Star rating */
const Stars = ({ rating, color }) => (
  <div className="flex gap-1 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className="text-lg"
        style={{ color: i < rating ? color : '#374151', textShadow: i < rating ? `0 0 8px ${color}90` : 'none' }}
      >
        ★
      </span>
    ))}
  </div>
);

/* Avatar circle */
const Avatar = ({ initials, color }) => (
  <div
    className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-black text-white flex-shrink-0"
    style={{
      background: `linear-gradient(135deg, ${color}40, ${color}15)`,
      border: `2px solid ${color}60`,
      boxShadow: `0 0 16px ${color}40`,
    }}
  >
    {initials}
  </div>
);

/* Single testimonial card */
const TestimonialCard = ({ testimonial, isActive, isAdjacent }) => {
  const { name, role, text, rating, initials, color } = testimonial;

  return (
    <div
      className={`testimonial-card relative flex flex-col p-8 rounded-2xl border transition-all duration-700
        ${isActive
          ? 'bg-[#0a0a0a] border-green-800/60 shadow-[0_20px_60px_rgba(34,197,94,0.12)] scale-100 opacity-100'
          : isAdjacent
            ? 'bg-[#070707] border-gray-800/40 scale-95 opacity-50'
            : 'bg-[#070707] border-gray-800/20 scale-90 opacity-20'
        }
      `}
    >
      {/* Glow top border */}
      {isActive && (
        <div
          className="absolute top-0 left-6 right-6 h-[1px] rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }}
        />
      )}

      {/* Quote icon */}
      <div
        className="absolute top-6 right-6 opacity-20"
        style={{ color }}
      >
        <Quote size={36} strokeWidth={1} />
      </div>

      {/* Stars */}
      <Stars rating={rating} color={color} />

      {/* Text */}
      <p className="text-gray-300 text-base leading-relaxed flex-grow mb-6 italic">
        "{text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-800/60">
        <Avatar initials={initials} color={color} />
        <div>
          <p className="text-white font-bold text-sm">{name}</p>
          <p className="text-gray-500 text-xs mt-0.5">{role}</p>
        </div>
      </div>

      {/* Bottom glow when active */}
      {isActive && (
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 blur-3xl opacity-20 pointer-events-none rounded-full"
          style={{ background: color }}
        />
      )}
    </div>
  );
};

/* Dot indicator */
const Dot = ({ active, color, onClick }) => (
  <button
    onClick={onClick}
    className={`rounded-full transition-all duration-400 ${active ? 'w-8 h-2' : 'w-2 h-2 bg-gray-700 hover:bg-gray-500'}`}
    style={active ? { background: color, boxShadow: `0 0 8px ${color}80` } : {}}
  />
);

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);

  const goTo = (idx) => {
    setActive((idx + testimonials.length) % testimonials.length);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => goTo(active + 1), 5000);
    return () => clearInterval(intervalRef.current);
  }, [active]);

  const prev = () => { clearInterval(intervalRef.current); goTo(active - 1); };
  const next = () => { clearInterval(intervalRef.current); goTo(active + 1); };

  const activeColor = testimonials[active].color;

  return (
    <section id="testimonials-section" className="relative py-28 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e05_1px,transparent_1px),linear-gradient(to_bottom,#22c55e05_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-green-600 opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-5 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold tracking-[0.2em] mb-5 backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.1)]">
            CLIENT STORIES
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            What Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.3)]">
              Clients Say
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Real results, real people. Hear directly from businesses that trusted us to deliver.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-600 mx-auto mt-6 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Cards — 3-up desktop, single mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {[-1, 0, 1].map((offset) => {
              const idx = (active + offset + testimonials.length) % testimonials.length;
              return (
                <TestimonialCard
                  key={idx}
                  testimonial={testimonials[idx]}
                  isActive={offset === 0}
                  isAdjacent={offset !== 0}
                />
              );
            })}
          </div>

          {/* Nav arrows */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                       bg-[#111] border border-gray-700 flex items-center justify-center
                       hover:border-green-500 hover:text-green-400 text-gray-400
                       transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.25)]
                       hidden md:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                       bg-[#111] border border-gray-700 flex items-center justify-center
                       hover:border-green-500 hover:text-green-400 text-gray-400
                       transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.25)]
                       hidden md:flex"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Mobile nav + dots */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="md:hidden w-10 h-10 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center text-gray-400 hover:border-green-500 hover:text-green-400 transition-all"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <Dot
                key={i}
                active={i === active}
                color={activeColor}
                onClick={() => { clearInterval(intervalRef.current); setActive(i); }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="md:hidden w-10 h-10 rounded-full bg-[#111] border border-gray-700 flex items-center justify-center text-gray-400 hover:border-green-500 hover:text-green-400 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
