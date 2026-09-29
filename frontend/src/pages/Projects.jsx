import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2, ArrowRight, ChevronRight,
  Activity, ShoppingBag, Package, Briefcase,
  Filter
} from 'lucide-react';

import imgHealthcare from '../assets/proj-healthcare.jpg';
import imgRestaurant from '../assets/proj-restaurant.jpg';
import imgB2B from '../assets/proj-b2b.jpg';
import imgProfessional from '../assets/proj-professional.jpg';

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────
const CATEGORIES = ['All', 'Healthcare', 'Food & Restaurant', 'B2B Commerce', 'Professional Services'];

const projects = [
  {
    id: 'healthcare',
    category: 'Healthcare',
    categoryLabel: 'Healthcare Technology',
    title: 'Healthcare Management & Patient Platform',
    description:
      'A complete healthcare management platform designed to digitize clinic and healthcare operations while creating a smoother experience for both staff and patients.',
    image: imgHealthcare,
    imageAlt: 'Healthcare management dashboard showing patient list, appointment calendar, token queue and prescription module',
    tags: [
      'Patient management', 'Appointment management', 'OPD / check-in workflows',
      'Multi-clinic management', 'Digital medical records', 'Prescription management',
      'Lab test management', 'Billing & reconciliation', 'Live token / queue management',
      'Administrative dashboards', 'Real-time updates',
    ],
    impacts: [
      'Reduces manual administrative work',
      'Makes patient handling more organised',
      'Helps clinics manage more patients efficiently',
      'Creates a better digital experience for patients',
      'Centralises operational information',
      'Makes it easier to track appointments, billing and patient activity',
      'Creates opportunities for online patient acquisition through a professional digital presence',
    ],
    flowSteps: ['Better Operations', 'Better Patient Experience', 'More Efficient Clinic Management'],
    flowLabel: 'Business Value',
  },
  {
    id: 'restaurant',
    category: 'Food & Restaurant',
    categoryLabel: 'Food & Restaurant Technology',
    title: 'Restaurant Ordering & Operations Platform',
    description:
      'A complete digital ecosystem developed for a restaurant business, covering online ordering, customer interaction, delivery operations and administration.',
    image: imgRestaurant,
    imageAlt: 'Restaurant platform showing food menu, order tracking, delivery map and admin dashboard',
    tags: [
      'Customer ordering platform', 'Online food ordering', 'Delivery partner application',
      'Restaurant admin dashboard', 'Order management', 'Online payments',
      'Cash-on-delivery workflow', 'OTP authentication', 'Real-time order status',
      'Delivery management', 'Inventory management', 'Notifications', 'Customer management',
    ],
    impacts: [
      'Generates direct online orders',
      'Creates an additional sales channel beyond walk-in customers',
      'Makes it easier for customers to discover and order products',
      'Helps reduce manual order handling and improves order visibility',
      'Supports digital payment collection',
      'Helps restaurants manage delivery operations',
      'Provides a centralised system for managing customers, orders and inventory',
    ],
    flowSteps: ['Customer Discovery', 'Online Order', 'Payment', 'Delivery', 'Repeat Customer'],
    flowLabel: 'Revenue Opportunity',
  },
  {
    id: 'b2b',
    category: 'B2B Commerce',
    categoryLabel: 'B2B E-commerce',
    title: 'B2B Product & Business Commerce Platform',
    description:
      'A digital platform developed for a B2B business to showcase products online, improve customer discovery and make it easier for potential buyers to enquire about products and services.',
    image: imgB2B,
    imageAlt: 'B2B product catalogue platform showing product grid, categories, specifications and enquiry form',
    tags: [
      'Product catalogue', 'Product categories', 'Business information',
      'Product discovery', 'Customer enquiry system', 'Responsive website',
      'Mobile-friendly interface', 'Business-focused user experience',
    ],
    impacts: [
      'Gives the business a professional online presence',
      'Helps potential customers discover products online',
      'Generates product enquiries',
      'Makes product information accessible 24/7',
      'Helps sales teams receive and manage inbound enquiries',
      'Expands the company\'s reach beyond its existing local network',
      'Creates an additional channel for acquiring B2B customers',
    ],
    flowSteps: ['Google / Social / Direct', 'Website', 'Product Discovery', 'Enquiry', 'Sales Conversation', 'Customer'],
    flowLabel: 'Business Funnel',
  },
  {
    id: 'professional',
    category: 'Professional Services',
    categoryLabel: 'Professional Services',
    title: 'Professional Business & Service Website',
    description:
      'A modern professional website developed to establish a strong digital presence and make it easier for potential customers to discover the business, understand its services and get in touch.',
    image: imgProfessional,
    imageAlt: 'Professional services website mockup showing hero section, service cards, about section and contact form',
    tags: [
      'Professional website', 'Service pages', 'Business information',
      'Contact / enquiry functionality', 'Mobile responsive design',
      'Clear calls-to-action', 'SEO-friendly structure', 'Customer-focused interface',
    ],
    impacts: [
      'Builds credibility online',
      'Helps customers discover the business through search',
      'Clearly communicates services',
      'Generates enquiries',
      'Provides customers with an easy way to contact the business',
      'Creates a digital channel for acquiring new customers',
      'Keeps the business accessible 24/7',
    ],
    flowSteps: ['Search', 'Website', 'Services', 'Trust', 'Enquiry', 'Customer'],
    flowLabel: 'Customer Journey',
  },
];

// ─────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────

function CategoryBadge({ label }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full border border-green-500/40 bg-green-500/10 text-green-400 text-xs font-bold tracking-widest uppercase">
      {label}
    </span>
  );
}

function FeatureTag({ text }) {
  return (
    <span className="inline-block px-3 py-1.5 bg-[#111] border border-gray-700 text-gray-300 text-xs font-medium rounded hover:border-green-500/50 hover:text-green-400 transition-colors duration-300 cursor-default">
      {text}
    </span>
  );
}

function ImpactItem({ text }) {
  return (
    <li className="flex items-start gap-2.5 text-gray-300 text-sm leading-relaxed">
      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
      <span>{text}</span>
    </li>
  );
}

function GrowthFlow({ steps, label }) {
  return (
    <div className="mt-6">
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{label}</p>
      <div className="overflow-x-auto pb-2 -mx-1">
        <div className="flex items-center gap-0 min-w-max px-1">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <div className="px-3 py-1.5 rounded-md bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold whitespace-nowrap">
                {step}
              </div>
              {i < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-green-600 flex-shrink-0 mx-0.5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="group bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden hover:border-green-500/50 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)] transition-all duration-500">
      {/* Top green accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-green-400 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Header */}
      <div className="px-6 pt-6 pb-4 sm:px-8 sm:pt-8">
        <div className="mb-4">
          <CategoryBadge label={project.categoryLabel} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300 leading-snug">
          {project.title}
        </h2>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Project Image */}
      <div className="relative mx-6 sm:mx-8 rounded-xl border border-gray-800 bg-[#050505] overflow-hidden">
        <img
          src={project.image}
          alt={project.imageAlt}
          className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent pointer-events-none" />
      </div>

      {/* Body */}
      <div className="px-6 pt-6 pb-8 sm:px-8 sm:pb-10 space-y-6">

        {/* What We Built */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
            What We Built
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <FeatureTag key={i} text={tag} />
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-gray-800" />

        {/* How It Helps */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
            How This Helps the Business
          </h3>
          <ul className="space-y-2">
            {project.impacts.map((item, i) => (
              <ImpactItem key={i} text={item} />
            ))}
          </ul>
        </div>

        <div className="w-full h-px bg-gray-800" />

        {/* Growth Flow */}
        <GrowthFlow steps={project.flowSteps} label={project.flowLabel} />
      </div>
    </article>
  );
}

// ─────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 relative overflow-hidden">

      {/* Background cyber-grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#22c55e05_1px,transparent_1px),linear-gradient(to_bottom,#22c55e05_1px,transparent_1px)] bg-[size:30px_30px]" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-500 opacity-[0.04] blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO */}
        <div className="text-center mb-16 sm:mb-20 animate-fade-in-up">
          <div className="inline-block px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs sm:text-sm font-bold tracking-widest mb-6 uppercase">
            Our Projects
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
            Projects{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              We've Built
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 font-medium mb-4">
            Real solutions. Real business use cases.
          </p>
          <p className="text-sm sm:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">
            We've designed and developed digital products for businesses across healthcare, food &amp; restaurant,
            B2B commerce and professional services. Each solution is built around a specific business
            requirement — from acquiring customers online to managing orders, operations and day-to-day workflows.
          </p>
        </div>

        {/* CORE MESSAGE STRIP */}
        <div className="mb-14 bg-[#0a0a0a] border border-gray-800 rounded-xl p-5 sm:p-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest mb-3 font-bold">
            How our solutions support your business
          </p>
          <div className="overflow-x-auto pb-1">
            <div className="flex items-center justify-start sm:justify-center gap-0 min-w-max mx-auto">
              {['Get Discovered', 'Generate Enquiries', 'Acquire Customers', 'Accept Orders & Payments', 'Manage Operations', 'Grow'].map((step, i, arr) => (
                <div key={i} className="flex items-center">
                  <span className="px-2.5 py-1.5 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold whitespace-nowrap">
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-green-700 mx-0.5 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3 text-xs text-gray-500 font-bold uppercase tracking-widest">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter by industry</span>
          </div>
          <div className="overflow-x-auto pb-2 -mx-4 sm:mx-0">
            <div className="flex gap-2 px-4 sm:px-0 min-w-max sm:min-w-0 sm:flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  aria-pressed={activeFilter === cat}
                  className={`px-4 py-2 rounded-md text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-500 ${
                    activeFilter === cat
                      ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                      : 'bg-[#0a0a0a] border border-gray-700 text-gray-300 hover:border-green-500/50 hover:text-green-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PROJECT CARDS */}
        <div className="space-y-10 sm:space-y-14">
          {filtered.length > 0 ? (
            filtered.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p className="text-center text-gray-500 py-20">No projects found for this category.</p>
          )}
        </div>

        {/* CTA */}
        <div className="mt-20 sm:mt-24 bg-gradient-to-r from-green-900/40 to-[#0a0a0a] border border-green-500/30 rounded-2xl p-8 sm:p-12 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-snug">
              Want a Similar Solution for Your Business?
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed">
              Whether you need a simple business website, an e-commerce platform, a customer portal or a complete
              business management system, we build solutions around your actual business requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-7 py-3.5 bg-green-500 text-black font-bold rounded-md hover:bg-green-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Start Your Project
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-7 py-3.5 border-2 border-gray-700 text-white font-bold rounded-md hover:border-green-400 hover:text-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all duration-300 text-center"
              >
                Get a Free Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* CLOSING STATEMENT */}
        <div className="mt-16 sm:mt-20 text-center max-w-3xl mx-auto">
          <p className="text-lg sm:text-xl font-bold text-white mb-3">
            We don't just build websites.
          </p>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            We build digital systems that help businesses{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 font-semibold">
              get discovered, generate enquiries, acquire customers, accept orders and payments, manage operations and grow.
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}
