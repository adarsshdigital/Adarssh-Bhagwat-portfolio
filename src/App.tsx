/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  GraduationCap,
  Linkedin,
  Mail,
  Phone,
  Printer,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import {
  PROFILE_DATA,
  CASE_STUDIES,
  TESTIMONIALS,
  EXPERIENCE_TIMELINE,
  STRATEGY_ECOSYSTEM_TOOLS,
  CORE_SKILL_CATEGORIES,
  CERTIFICATIONS,
  EDUCATION,
  PORTRAIT_IMAGE,
  CaseStudyItem,
  TestimonialItem,
} from './data/portfolioData';
import { downloadStandalonePortfolioHtml } from './utils/exportStandaloneHtml';
import { InstagramShowcase } from './components/InstagramShowcase';

const STORAGE_KEY_CASES = 'adarssh_portfolio_case_studies_v4';

export default function App() {
  const [portraitError, setPortraitError] = useState(false);

  // Case Studies state - reconciles images from canonical CASE_STUDIES to prevent stale /src/ cache
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CASES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: CaseStudyItem) => {
            const canonical = CASE_STUDIES.find((cs) => cs.id === item.id);
            if (!canonical) return item;
            const isStalePath =
              typeof item.image === 'string' &&
              (item.image.startsWith('/src/') || item.image.includes('17916'));
            return {
              ...item,
              image: isStalePath || !item.image ? canonical.image : item.image,
              caseStudyUrl: item.caseStudyUrl || canonical.caseStudyUrl,
            };
          });
        }
      }
    } catch {
      // ignore
    }
    return CASE_STUDIES;
  });

  // Track per-card thumbnail image errors so we never show broken image icons
  const [cardImageErrors, setCardImageErrors] = useState<Record<string, boolean>>({});

  // Carousel & All-Cases Toggle
  const [carouselStartIndex, setCarouselStartIndex] = useState(0);
  const [showAllCases, setShowAllCases] = useState(false);
  const [caseAgencyFilter, setCaseAgencyFilter] = useState<'all' | 'dentsu' | 'ikf'>('all');

  // Modals & Dropdowns
  const [activeCaseModal, setActiveCaseModal] = useState<CaseStudyItem | null>(null);
  const [activeTestimonialModal, setActiveTestimonialModal] = useState<TestimonialItem | null>(
    null
  );
  const [isLinkManagerOpen, setIsLinkManagerOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isResumeMenuOpen, setIsResumeMenuOpen] = useState(false);
  const [showCredentialsSection, setShowCredentialsSection] = useState(true);

  // Clipboard feedback
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Contact Form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCaseModal(null);
        setActiveTestimonialModal(null);
        setIsLinkManagerOpen(false);
        setIsContactModalOpen(false);
        setIsResumeMenuOpen(false);
      }
    };
    try {
      localStorage.removeItem('adarssh_portfolio_custom_portrait_v1');
    } catch {
      // ignore
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => {
      setCopiedField((prev) => (prev === label ? null : prev));
    }, 2000);
  };

  const handleUpdateCaseUrl = (id: string, newUrl: string) => {
    const updated = caseStudies.map((cs) => (cs.id === id ? { ...cs, caseStudyUrl: newUrl } : cs));
    setCaseStudies(updated);
    try {
      localStorage.setItem(STORAGE_KEY_CASES, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleNextSlide = () => {
    setCarouselStartIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const handlePrevSlide = () => {
    setCarouselStartIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const visibleCarouselCards = [
    caseStudies[carouselStartIndex % caseStudies.length],
    caseStudies[(carouselStartIndex + 1) % caseStudies.length],
    caseStudies[(carouselStartIndex + 2) % caseStudies.length],
  ];

  const filteredAllCases = caseStudies.filter((c) => {
    if (caseAgencyFilter === 'all') return true;
    if (caseAgencyFilter === 'dentsu') return c.agency.includes('Dentsu');
    if (caseAgencyFilter === 'ikf') return c.agency.includes('IKF');
    return true;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formState.name.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!formState.message.trim()) {
      setFormError('Please include a short message.');
      return;
    }
    setFormSubmitted(true);
  };

  const portraitSrc = PORTRAIT_IMAGE;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col relative overflow-x-hidden selection:bg-indigo-600 selection:text-white">
      {/* TOP NAVIGATION BAR WITH DIRECT CONTACT DETAILS */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 no-print">
        <div className="max-w-[1240px] mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Left: Italic Editorial Signature */}
          <a
            href="#home"
            className="font-editorial italic text-xl md:text-2xl font-semibold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Adarssh Bhagwat
          </a>

          {/* Center: Clean Nav Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-6 text-xs md:text-sm font-medium text-slate-600"
          >
            <a
              href="#home"
              className="text-slate-950 font-semibold border-b-2 border-blue-600 pb-1 whitespace-nowrap shrink-0"
            >
              Home
            </a>
            <a
              href="#work"
              className="hover:text-slate-950 transition-colors pb-1 whitespace-nowrap shrink-0"
            >
              Work
            </a>
            <a
              href="#experience"
              className="hover:text-slate-950 transition-colors pb-1 whitespace-nowrap shrink-0"
            >
              Experience
            </a>
            <a
              href="#about"
              className="hover:text-slate-950 transition-colors pb-1 whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:text-slate-950 transition-colors pb-1 whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Right: Direct Contact Details + Download Resume Button */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 shrink-0">
            <div className="hidden sm:flex items-center gap-3 text-xs font-medium text-slate-700 pr-2 border-r border-slate-200">
              <a
                href={`tel:${PROFILE_DATA.phoneRaw}`}
                className="hover:text-blue-700 transition-colors inline-flex items-center gap-1.5 font-mono-tabular whitespace-nowrap"
                title="Call Adarssh Bhagwat"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{PROFILE_DATA.phone}</span>
              </a>
              <span className="text-slate-300" aria-hidden="true">
                |
              </span>
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="hover:text-blue-700 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
                title="Email Adarssh Bhagwat"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{PROFILE_DATA.email}</span>
              </a>
              <span className="text-slate-300" aria-hidden="true">
                |
              </span>
              <a
                href={PROFILE_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 transition-colors inline-flex items-center gap-1 whitespace-nowrap"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="hidden xl:inline">LinkedIn</span>
              </a>
            </div>

            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setIsResumeMenuOpen((prev) => !prev)}
                className="px-4 py-2 text-xs font-semibold text-amber-950 bg-[#FDF8EC] hover:bg-[#FAF0D7] border border-amber-300/80 rounded-full shadow-2xs transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-700" />
                <span>Download Resume</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-700" />
              </button>

              {isResumeMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setIsResumeMenuOpen(false);
                      downloadStandalonePortfolioHtml(caseStudies, PORTRAIT_IMAGE);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>Download Single-File HTML</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsResumeMenuOpen(false);
                      window.print();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Print / Save as PDF</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* =====================================================================
            SECTION 1: HERO SECTION (Matches Reference Image Layout & Creatives)
           ===================================================================== */}
        <section
          id="home"
          className="relative overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9] border-b border-slate-200/80 pt-10 pb-12 md:pt-14 md:pb-16"
        >
          {/* Decorative Left & Right Edge Prism / Geometric Brush Accents */}
          <svg
            aria-hidden="true"
            className="hidden lg:block absolute left-0 bottom-8 w-16 h-48 pointer-events-none opacity-85"
            viewBox="0 0 80 220"
            fill="none"
          >
            <path d="M-10 200 L55 90 L30 220 Z" fill="url(#prismBlue)" />
            <path d="M-15 160 L45 60 L10 190 Z" fill="url(#prismPurple)" opacity="0.7" />
            <line x1="0" y1="140" x2="65" y2="30" stroke="#38BDF8" strokeWidth="2" />
            <line x1="10" y1="180" x2="70" y2="80" stroke="#A855F7" strokeWidth="1.5" />
            <defs>
              <linearGradient id="prismBlue" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="prismPurple" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7E22CE" />
                <stop offset="100%" stopColor="#F472B6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          <div className="max-w-[1240px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
              {/* Left Column: Headline, Copy, CTAs & Specialty Strip */}
              <div className="lg:col-span-6 xl:col-span-6">
                {/* Mobile-Only Contact Details (Moved to top of page, directly above 'DIGITAL GROWTH STRATEGIST') */}
                <div className="flex md:hidden flex-wrap items-center gap-2 mb-4">
                  <a
                    href="tel:+917776903811"
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300/90 rounded-xl shadow-2xs transition-all active:scale-95"
                    title="Call Adarssh Bhagwat"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>+91 7776903811</span>
                  </a>
                  <a
                    href="mailto:adarsshbhagwat142@gmail.com"
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300/90 rounded-xl shadow-2xs transition-all active:scale-95"
                    title="Email Adarssh Bhagwat"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>adarsshbhagwat142@gmail.com</span>
                  </a>
                </div>

                <div className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-3">
                  {PROFILE_DATA.kicker}
                </div>

                <h1
                  className="font-extrabold tracking-tight text-slate-950 leading-[1.06] mb-6"
                  style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}
                >
                  I don’t just drive
                  <br />
                  traffic, I build
                  <br />
                  <span className="bg-gradient-to-r from-[#1E6091] via-[#4361EE] to-[#7209B7] bg-clip-text text-transparent">
                    growth engines.
                  </span>
                </h1>

                <p className="text-sm md:text-base text-slate-800 leading-relaxed mb-3 max-w-[54ch]">
                  I’m <strong className="font-bold text-slate-950">Adarssh Bhagwat</strong>, a
                  Digital Marketing Manager specializing in{' '}
                  <strong className="font-bold text-slate-950">
                    SEO, PPC, and performance-led growth.
                  </strong>
                </p>

                <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-8 max-w-[56ch]">
                  I connect search intent, paid acquisition, data analytics, and conversion
                  optimization to help brands scale visibility, acquire high-intent leads more
                  efficiently, and turn marketing into measurable business outcomes.
                </p>

                {/* CTA Buttons Matching Reference */}
                <div className="flex flex-wrap items-center gap-3.5 mb-10">
                  <a
                    href="#work"
                    className="group relative inline-flex items-center gap-3 px-6 py-3 text-xs md:text-sm font-semibold text-white bg-[#0F172A] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all whitespace-nowrap shrink-0"
                  >
                    <span className="relative z-10">Explore My Work</span>
                    <span className="relative z-10 inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-xs">
                      ›
                    </span>
                    <span className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-fuchsia-500/40 to-transparent pointer-events-none" />
                  </a>

                  <a
                    href="#contact"
                    className="px-6 py-3 text-xs md:text-sm font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300/90 rounded-xl shadow-2xs transition-colors whitespace-nowrap shrink-0"
                  >
                    Let’s Connect
                  </a>
                </div>

                {/* Bottom Specialty Dot Strip */}
                <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs md:text-sm font-semibold text-slate-700">
                  {PROFILE_DATA.heroSpecialties.map((spec, idx) => (
                    <React.Fragment key={spec}>
                      <span>{spec}</span>
                      {idx < PROFILE_DATA.heroSpecialties.length - 1 && (
                        <span className="text-slate-400" aria-hidden="true">
                          •
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Right Column: Network Globe Halo + Portrait + Handwritten Note + Sketch Card */}
              <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center min-h-[380px] md:min-h-[450px]">
                {/* Circular Dotted Network Globe SVG Behind Portrait */}
                <svg
                  aria-hidden="true"
                  className="absolute w-[340px] h-[340px] md:w-[430px] md:h-[430px] pointer-events-none"
                  viewBox="0 0 440 440"
                  fill="none"
                >
                  {/* Outer Dashed Orbit */}
                  <circle
                    cx="210"
                    cy="220"
                    r="175"
                    stroke="#CBD5E1"
                    strokeWidth="1.2"
                    strokeDasharray="4 6"
                  />
                  <circle
                    cx="210"
                    cy="220"
                    r="142"
                    stroke="#94A3B8"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                    opacity="0.7"
                  />
                  {/* Network Constellation Lines (Left & Right of Portrait) */}
                  <g stroke="#94A3B8" strokeWidth="1" opacity="0.65">
                    <line x1="45" y1="150" x2="90" y2="120" />
                    <line x1="90" y1="120" x2="75" y2="185" />
                    <line x1="45" y1="150" x2="75" y2="185" />
                    <line x1="75" y1="185" x2="50" y2="245" />
                    <line x1="50" y1="245" x2="95" y2="265" />
                    <line x1="75" y1="185" x2="95" y2="265" />

                    <line x1="335" y1="120" x2="375" y2="155" />
                    <line x1="335" y1="120" x2="325" y2="180" />
                    <line x1="375" y1="155" x2="325" y2="180" />
                    <line x1="375" y1="155" x2="385" y2="220" />
                    <line x1="325" y1="180" x2="360" y2="250" />
                    <line x1="385" y1="220" x2="360" y2="250" />
                  </g>
                  {/* Colored Network Nodes */}
                  <circle cx="45" cy="150" r="4" fill="#38BDF8" />
                  <circle cx="90" cy="120" r="5" fill="#6366F1" />
                  <circle cx="75" cy="185" r="4.5" fill="#0EA5E9" />
                  <circle cx="50" cy="245" r="5.5" fill="#3B82F6" />
                  <circle cx="95" cy="265" r="4" fill="#8B5CF6" />

                  <circle cx="335" cy="120" r="4.5" fill="#F59E0B" />
                  <circle cx="375" cy="155" r="6" fill="#A855F7" />
                  <circle cx="325" cy="180" r="4" fill="#10B981" />
                  <circle cx="385" cy="220" r="5" fill="#3B82F6" />
                  <circle cx="360" cy="250" r="4" fill="#EC4899" />
                </svg>

                {/* Central Executive Portrait Frame */}
                <div className="relative z-10 w-[260px] h-[310px] sm:w-[300px] sm:h-[355px] rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-900">
                  {!portraitError ? (
                    <img
                      src={portraitSrc}
                      alt="Adarssh Bhagwat — Digital Growth Strategist"
                      referrerPolicy="no-referrer"
                      onError={() => setPortraitError(true)}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center text-white text-3xl font-bold">
                      AB
                    </div>
                  )}
                </div>

                {/* Top-Right Handwritten Annotation: "Better Strategy Bigger Impact" */}
                <div className="hidden sm:flex flex-col items-start absolute top-2 right-2 md:right-4 z-20 rotate-[-4deg] select-none">
                  <div className="font-handwritten text-xl md:text-2xl leading-[1.05] text-amber-700/90 font-semibold">
                    <div>Better</div>
                    <div>Strategy</div>
                    <div>Bigger</div>
                    <div>Impact</div>
                  </div>
                  {/* Curved Hand-Drawn Arrow */}
                  <svg
                    className="w-12 h-12 text-purple-500/80 ml-4 mt-1"
                    viewBox="0 0 60 60"
                    fill="none"
                  >
                    <path
                      d="M35 5 C48 20, 42 42, 15 48"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M22 43 L14 48 L21 53"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Bottom-Right Tilted Sketch Notepad Card: "Search + Paid + Conversion = Growth" */}
                <div className="absolute -bottom-3 right-1 sm:right-3 md:right-6 z-20 rotate-[-5deg] bg-white/95 backdrop-blur-md border-2 border-sky-200/90 rounded-2xl px-4 py-3 shadow-lg">
                  <div className="border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-center font-handwritten text-base md:text-lg leading-tight text-slate-800 font-semibold">
                    <div>Search</div>
                    <div className="text-sky-600 text-xs leading-none">+</div>
                    <div>Paid</div>
                    <div className="text-sky-600 text-xs leading-none">+</div>
                    <div>Conversion</div>
                    <div className="text-purple-600 text-xs leading-none">=</div>
                    <div className="text-indigo-700 font-bold">Growth</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 2: IMPACT AT A GLANCE (4 Metric Cards + Rising 3D Chart)
           ===================================================================== */}
        <section
          id="about"
          className="relative overflow-hidden py-14 md:py-20 bg-[#F8FAFC] border-b border-slate-200/80"
        >
          {/* Perspective 3D Wireframe Grid SVG at Bottom */}
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 w-full h-36 pointer-events-none opacity-35"
            viewBox="0 0 1440 160"
            fill="none"
            preserveAspectRatio="none"
          >
            <g stroke="#94A3B8" strokeWidth="0.8">
              <path d="M0 40 Q 720 100 1440 20" />
              <path d="M0 75 Q 720 125 1440 55" />
              <path d="M0 110 Q 720 145 1440 90" />
              <path d="M0 145 Q 720 165 1440 125" />
              <line x1="180" y1="30" x2="80" y2="160" />
              <line x1="360" y1="45" x2="290" y2="160" />
              <line x1="540" y1="55" x2="500" y2="160" />
              <line x1="720" y1="60" x2="720" y2="160" />
              <line x1="900" y1="55" x2="940" y2="160" />
              <line x1="1080" y1="45" x2="1150" y2="160" />
              <line x1="1260" y1="30" x2="1360" y2="160" />
            </g>
          </svg>

          <div className="max-w-[1240px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Narrative */}
              <div className="lg:col-span-4">
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-slate-500 mb-2">
                  IMPACT AT A GLANCE
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 leading-tight mb-4">
                  Growth is the goal.
                  <br />
                  The numbers tell the story.
                </h2>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-3">
                  Across agency leadership at IKF and enterprise mandates at Dentsu, my focus has
                  remained consistent: turning search visibility, paid media, CRO, and AI-enabled
                  analytics into measurable commercial outcomes.
                </p>
                <p className="text-xs md:text-sm font-bold text-slate-900 mb-5">
                  What changes for the business?
                </p>
                <a
                  href="#work"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 border-b border-slate-900 pb-0.5 hover:text-blue-700 hover:border-blue-700 transition-colors"
                >
                  <span>View full outcomes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Center Column: 2x2 Frosted Metric Cards */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROFILE_DATA.impactCards.map((card, i) => (
                  <div
                    key={i}
                    className="p-5 bg-white/90 backdrop-blur-xs border border-slate-200/90 rounded-2xl shadow-xs hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl md:text-4xl font-extrabold font-mono-tabular bg-gradient-to-r from-[#1E6091] to-[#3B82F6] bg-clip-text text-transparent mb-1.5">
                      {card.value}
                    </div>
                    <div className="text-xs md:text-sm font-bold text-slate-900 mb-1">
                      {card.title}
                    </div>
                    <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed">
                      {card.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right Column: Rising Bar Chart & Trend Arrow Creative */}
              <div className="lg:col-span-3 flex items-center justify-center">
                <div className="w-full max-w-[290px] p-4">
                  <svg
                    viewBox="0 0 280 210"
                    className="w-full h-auto drop-shadow-xs"
                    fill="none"
                  >
                    {/* Subtle Background Grid */}
                    <g stroke="#E2E8F0" strokeWidth="1">
                      <line x1="20" y1="30" x2="260" y2="30" />
                      <line x1="20" y1="70" x2="260" y2="70" />
                      <line x1="20" y1="110" x2="260" y2="110" />
                      <line x1="20" y1="150" x2="260" y2="150" />
                      <line x1="20" y1="185" x2="260" y2="185" />
                    </g>

                    {/* 7 Rising Translucent Bars */}
                    <rect
                      x="30"
                      y="155"
                      width="20"
                      height="30"
                      rx="3"
                      fill="url(#barGrad1)"
                    />
                    <rect
                      x="62"
                      y="142"
                      width="20"
                      height="43"
                      rx="3"
                      fill="url(#barGrad1)"
                    />
                    <rect
                      x="94"
                      y="126"
                      width="20"
                      height="59"
                      rx="3"
                      fill="url(#barGrad1)"
                    />
                    <rect
                      x="126"
                      y="110"
                      width="20"
                      height="75"
                      rx="3"
                      fill="url(#barGrad2)"
                    />
                    <rect
                      x="158"
                      y="88"
                      width="20"
                      height="97"
                      rx="3"
                      fill="url(#barGrad2)"
                    />
                    <rect
                      x="190"
                      y="62"
                      width="20"
                      height="123"
                      rx="3"
                      fill="url(#barGrad3)"
                    />
                    <rect
                      x="222"
                      y="32"
                      width="22"
                      height="153"
                      rx="3"
                      fill="url(#barGrad3)"
                    />

                    {/* Smooth Glowing Upward Curve Arrow */}
                    <path
                      d="M 28 148 Q 135 125 232 20"
                      stroke="url(#arrowGrad)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 218 20 L 234 18 L 236 34"
                      stroke="#7E22CE"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <defs>
                      <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
                      </linearGradient>
                      <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366F1" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.45" />
                      </linearGradient>
                      <linearGradient id="barGrad3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#0D9488" stopOpacity="0.55" />
                      </linearGradient>
                      <linearGradient id="arrowGrad" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="50%" stopColor="#6366F1" />
                        <stop offset="100%" stopColor="#9333EA" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 3: FEATURED WORK (3-Card Showcase Carousel + All 13 Case Studies)
           ===================================================================== */}
        <section
          id="work"
          className="relative overflow-hidden py-14 md:py-20 bg-white border-b border-slate-200/80"
        >
          <div className="max-w-[1240px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Featured Work Heading */}
              <div className="lg:col-span-4">
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-slate-500 mb-2">
                  FEATURED WORK
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 leading-tight mb-3">
                  Different challenges.
                  <br />
                  One common goal:
                  <br />
                  <span className="font-editorial italic font-normal text-3xl md:text-4xl bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                    meaningful growth.
                  </span>
                </h2>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-5">
                  From hyperlocal SEO and fintech organic scale to B2B industrial testing, real
                  estate CPL reduction, and higher education — every campaign was executed under my
                  direct account and department leadership at{' '}
                  <strong className="text-slate-900">IKF</strong> and{' '}
                  <strong className="text-slate-900">Dentsu</strong>.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAllCases((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 border-b border-slate-900 pb-0.5 hover:text-blue-700 hover:border-blue-700 transition-colors cursor-pointer"
                  >
                    <span>
                      {showAllCases
                        ? 'Hide full case study directory'
                        : `View all ${caseStudies.length} case studies`}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: 3-Card Horizontal Showcase + Next/Prev Carousel Controls */}
              <div className="lg:col-span-8 relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {visibleCarouselCards.map((card) => (
                    <article
                      key={card.id}
                      className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Card Thumbnail */}
                        <div className="h-36 bg-slate-900 overflow-hidden relative">
                          {card.image && !cardImageErrors[card.id] ? (
                            <img
                              src={card.image}
                              alt={card.client}
                              referrerPolicy="no-referrer"
                              onError={() =>
                                setCardImageErrors((prev) => ({ ...prev, [card.id]: true }))
                              }
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col justify-end p-4 border-b border-slate-700/50">
                              <span className="text-[10px] font-bold text-sky-300 tracking-wider uppercase mb-0.5">
                                {card.industry}
                              </span>
                              <span className="text-sm font-extrabold text-white truncate">
                                {card.client}
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Card Body */}
                        <div className="p-5">
                          <div className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 mb-1.5 truncate">
                            {card.tagsLine}
                          </div>
                          <h3 className="text-base font-bold text-slate-950 mb-2 truncate">
                            {card.client}
                          </h3>

                          <div className="text-3xl font-extrabold font-mono-tabular text-[#1E6091] leading-none mb-1">
                            {card.bigMetric}
                          </div>
                          <div className="text-xs font-medium text-slate-600 mb-3">
                            {card.metricSubtitle}
                          </div>
                        </div>
                      </div>

                      <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveCaseModal(card)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-700 transition-colors cursor-pointer"
                        >
                          <span>View case study</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <a
                          href={card.caseStudyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open published link"
                          className="text-slate-400 hover:text-blue-700 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Carousel Navigation Pill Buttons */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    Showing 3 of {caseStudies.length} agency-backed mandates (use arrows or expand
                    all)
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrevSlide}
                      aria-label="Previous case study"
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextSlide}
                      aria-label="Next case study"
                      className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* EXPANDABLE FULL 13-CASE STUDY DIRECTORY (All Resume Achievements + Public Links) */}
            {showAllCases && (
              <div className="mt-12 pt-10 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">
                      Complete Track Record ({caseStudies.length} Verified Agency Mandates)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Every result below corresponds directly to published agency case studies
                      managed during my tenure at IKF and Dentsu (Merkle Sokrati).
                    </p>
                  </div>

                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start">
                    {[
                      { id: 'all', label: `All (${caseStudies.length})` },
                      { id: 'ikf', label: 'IKF (11)' },
                      { id: 'dentsu', label: 'Dentsu (2)' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setCaseAgencyFilter(tab.id as any)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                          caseAgencyFilter === tab.id
                            ? 'bg-white text-slate-950 shadow-2xs font-semibold'
                            : 'text-slate-600 hover:text-slate-950'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAllCases.map((cs) => (
                    <div
                      key={cs.id}
                      className="p-5 bg-[#F8FAFC] border border-slate-200/90 rounded-xl flex flex-col justify-between hover:border-slate-300 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 text-[10px] font-semibold tracking-wider uppercase text-slate-400 mb-1">
                          <span>{cs.agency}</span>
                          <span>{cs.industry}</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-950 mb-0.5">{cs.client}</h4>
                        <div className="text-[11px] font-medium text-blue-700 mb-2">
                          {cs.roleAttribution}
                        </div>
                        <div className="text-xl font-extrabold font-mono-tabular text-[#1E6091] mb-1">
                          {cs.bigMetric}{' '}
                          <span className="text-xs font-normal text-slate-600">
                            {cs.metricSubtitle}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">
                          {cs.outcomeSummary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs font-semibold">
                        <button
                          type="button"
                          onClick={() => setActiveCaseModal(cs)}
                          className="text-slate-700 hover:text-slate-950 cursor-pointer"
                        >
                          Inspect Metrics
                        </button>
                        <a
                          href={cs.caseStudyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:underline inline-flex items-center gap-1"
                        >
                          <span>Public Case Link</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =====================================================================
            SECTION 3.5: BEYOND SEO & PPC (INTERACTIVE INSTAGRAM CONTENT SHOWCASE)
           ===================================================================== */}
        <InstagramShowcase />

        {/* =====================================================================
            SECTION 4: TESTIMONIALS (VIDA by Hero MotoCorp & Amazon Business)
           ===================================================================== */}
        <section className="relative overflow-hidden py-14 md:py-20 bg-gradient-to-b from-[#EEF2F6] to-[#E2E8F0]/70 border-b border-slate-200/80">
          {/* Subtle Low-Poly Faceted Geometric Background SVG */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none opacity-35"
            viewBox="0 0 1440 400"
            fill="none"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 320,0 180,220" fill="#FFFFFF" opacity="0.6" />
            <polygon points="320,0 680,0 480,280 180,220" fill="#CBD5E1" opacity="0.3" />
            <polygon points="0,220 180,220 340,400 0,400" fill="#94A3B8" opacity="0.2" />
            <polygon points="1100,0 1440,0 1440,260 980,180" fill="#FFFFFF" opacity="0.5" />
          </svg>

          <div className="max-w-[1240px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Heading + Hand-Drawn Arrow */}
              <div className="lg:col-span-3">
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-slate-500 mb-2">
                  TESTIMONIALS
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 leading-tight mb-2">
                  Real feedback.
                  <br />
                  <span className="font-editorial italic font-normal text-3xl md:text-4xl text-[#C2852C]">
                    Lasting relationships.
                  </span>
                </h2>

                {/* Hand-Drawn Curved Arrow Matching Reference */}
                <svg
                  aria-hidden="true"
                  className="w-24 h-14 text-slate-500 mt-3"
                  viewBox="0 0 110 60"
                  fill="none"
                >
                  <path
                    d="M12 10 C 12 48, 55 52, 85 22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M75 20 L 86 20 L 84 31"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Right Column: 3 Frosted Quote Cards Side-by-Side */}
              <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                {TESTIMONIALS.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setActiveTestimonialModal(t)}
                    className="p-5 md:p-6 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="font-editorial text-4xl leading-none text-slate-300 select-none">
                          “
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full shrink-0">
                          {t.verifiedMetrics[0].value}
                        </span>
                      </div>

                      <div className="text-xs text-slate-700 leading-relaxed mb-5 space-y-2">
                        {t.verbatimQuote.split('\n\n').map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-950 truncate">
                          {t.authorName}
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                          {t.authorRole}
                        </div>
                      </div>

                      {/* Brand Mark (VIDA, Amazon Business, or Suryadatta Logo) */}
                      {t.brandLogoType === 'vida' ? (
                        <div className="shrink-0 flex items-center gap-1 font-extrabold tracking-widest text-sm text-[#FF5722]">
                          <span className="inline-block w-2.5 h-2.5 rotate-45 bg-[#FF5722]" />
                          <span>VIDA</span>
                        </div>
                      ) : t.brandLogoType === 'amazon' ? (
                        <div className="shrink-0 text-right leading-none">
                          <div className="text-xs font-extrabold tracking-tight text-slate-900">
                            amazon <span className="font-normal text-amber-600">business</span>
                          </div>
                          <div className="h-0.5 w-12 bg-amber-500 rounded-full ml-auto mt-0.5" />
                        </div>
                      ) : (
                        <div className="shrink-0 flex items-center">
                          {t.logoUrl ? (
                            <img
                              src={t.logoUrl}
                              alt={t.clientBrand}
                              referrerPolicy="no-referrer"
                              className="h-9 w-auto max-w-[95px] object-contain rounded-md bg-slate-900/90 px-2 py-1"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-900">
                              Suryadatta
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 5: MY JOURNEY + CONNECTED EXPERIENCE TIMELINE + STRATEGY HUB
           ===================================================================== */}
        <section
          id="experience"
          className="relative overflow-hidden py-14 md:py-20 bg-[#F8FAFC] border-b border-slate-200/80"
        >
          <div className="max-w-[1240px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
              {/* Left Column (3 cols): My Journey Intro + Education & Leadership Snapshot (Fills Full Height) */}
              <div className="lg:col-span-3 flex flex-col justify-between gap-6">
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-slate-500 mb-2">
                    MY JOURNEY
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 leading-tight mb-3">
                    From doing the work
                    <br />
                    to shaping the strategy.
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    My career has been a steady progression — from hands-on digital execution and
                    building internal departments from scratch to leading enterprise accounts at
                    Dentsu and heading the SEO & PPC practice at IKF.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setShowCredentialsSection(true);
                      document
                        .getElementById('credentials')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 border-b border-slate-900 pb-0.5 hover:text-blue-700 hover:border-blue-700 transition-colors cursor-pointer"
                  >
                    <span>View full credentials & skills</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Stacked Cards to Align Bottom Baseline with Timeline */}
                <div className="space-y-4">
                  {/* Academic Foundation Card */}
                  <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-2xs">
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-blue-700 mb-3">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Academic Qualifications</span>
                    </div>
                    <div className="space-y-2.5">
                      {EDUCATION.map((edu) => (
                        <div
                          key={edu.id}
                          className="pb-2.5 last:pb-0 border-b last:border-b-0 border-slate-100"
                        >
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900">{edu.degree}</span>
                            <span className="text-[11px] font-mono-tabular font-semibold text-blue-700 shrink-0">
                              {edu.year}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500">{edu.institution}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Career Scope Highlights Card */}
                  <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-2xs">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                      Leadership Footprint
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                        <div className="text-sm font-extrabold font-mono-tabular text-slate-950">
                          30+ Clients
                        </div>
                        <div className="text-[10px] text-slate-500">20+ SEO · 10+ PPC</div>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                        <div className="text-sm font-extrabold font-mono-tabular text-slate-950">
                          10 Members
                        </div>
                        <div className="text-[10px] text-slate-500">Team Mentored</div>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                        <div className="text-sm font-extrabold font-mono-tabular text-slate-950">
                          200+ GMBs
                        </div>
                        <div className="text-[10px] text-slate-500">Local SEO Scale</div>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                        <div className="text-sm font-extrabold font-mono-tabular text-slate-950">
                          7 Licenses
                        </div>
                        <div className="text-[10px] text-slate-500">SEO, GA4 & AI</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Column (5 cols): Clean, Tightly Aligned Connected Timeline */}
              <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-5 md:p-6 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 pb-3.5 mb-4 border-b border-slate-100">
                  <span className="text-xs font-extrabold tracking-wider uppercase text-slate-900">
                    EXPERIENCE TIMELINE
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    2018 — Present
                  </span>
                </div>

                <div className="relative pl-5 border-l-2 border-sky-200 space-y-4 flex-1 flex flex-col justify-between">
                  {EXPERIENCE_TIMELINE.map((exp) => (
                    <div
                      key={exp.id}
                      className="relative pl-3 py-2.5 pr-3 rounded-xl bg-[#F8FAFC] border border-slate-200/70 hover:border-sky-300/80 transition-colors"
                    >
                      {/* Glowing Node & Horizontal Connector Line */}
                      <span
                        className={`absolute -left-[27px] top-4 w-3 h-3 rounded-full border-2 border-white shadow-xs ${
                          exp.isCurrent ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-sky-500'
                        }`}
                      />
                      <span className="absolute -left-[15px] top-[21px] w-3.5 h-[1.5px] bg-sky-300" />

                      {/* Role Header Row */}
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <h3 className="text-xs font-extrabold text-slate-950">
                            {exp.companyShort}
                          </h3>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs font-semibold text-blue-700">{exp.role}</span>
                          {exp.isCurrent && (
                            <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-blue-700 bg-blue-50 border border-blue-200 rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono-tabular font-medium text-slate-400 shrink-0">
                          {exp.period}
                        </span>
                      </div>

                      {/* Bullet Points */}
                      <ul className="space-y-1">
                        {exp.highlights.slice(0, 2).map((h, idx) => (
                          <li
                            key={idx}
                            className="text-[11px] text-slate-600 leading-snug flex items-start gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (4 cols): STRATEGY Hub & Spoke Diagram + 12-Tool Stack (Fills Full Height) */}
              <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-3xl p-5 md:p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3.5 mb-2 border-b border-slate-100">
                    <span className="text-xs font-extrabold tracking-wider uppercase text-slate-900">
                      STRATEGY & TOOL ECOSYSTEM
                    </span>
                    <span className="text-[11px] font-medium text-blue-700">12 Core Platforms</span>
                  </div>

                  {/* Top Hub-and-Spoke SVG Diagram ("STRATEGY") */}
                  <div className="relative w-full h-44 my-1">
                    <svg viewBox="0 0 300 185" className="w-full h-full" fill="none">
                      {/* Radiating Connector Curves from Central STRATEGY Circle */}
                      <g stroke="#CBD5E1" strokeWidth="1.2">
                        <path d="M150 125 Q 90 95 45 65" />
                        <path d="M150 125 Q 105 75 75 35" />
                        <path d="M150 125 Q 130 65 122 24" />
                        <path d="M150 125 Q 165 65 175 24" />
                        <path d="M150 125 Q 195 75 225 35" />
                        <path d="M150 125 Q 210 95 255 65" />
                        {/* Bottom connector stems into tool grid */}
                        <line x1="120" y1="150" x2="60" y2="182" />
                        <line x1="140" y1="155" x2="115" y2="182" />
                        <line x1="160" y1="155" x2="185" y2="182" />
                        <line x1="180" y1="150" x2="240" y2="182" />
                      </g>

                      {/* Upper Spoke Nodes (Channels) */}
                      <g>
                        <circle cx="45" cy="65" r="14" fill="#E0F2FE" stroke="#7DD3FC" />
                        <text
                          x="45"
                          y="68"
                          textAnchor="middle"
                          fontSize="7.5"
                          fontWeight="700"
                          fill="#0369A1"
                        >
                          SEO
                        </text>

                        <circle cx="75" cy="35" r="14" fill="#F3E8FF" stroke="#D8B4FE" />
                        <text
                          x="75"
                          y="38"
                          textAnchor="middle"
                          fontSize="7.5"
                          fontWeight="700"
                          fill="#6B21A8"
                        >
                          PPC
                        </text>

                        <circle cx="122" cy="24" r="14" fill="#FEF3C7" stroke="#FDE68A" />
                        <text
                          x="122"
                          y="27"
                          textAnchor="middle"
                          fontSize="7.5"
                          fontWeight="700"
                          fill="#92400E"
                        >
                          CRO
                        </text>

                        <circle cx="175" cy="24" r="14" fill="#DCFCE7" stroke="#86EFAC" />
                        <text
                          x="175"
                          y="27"
                          textAnchor="middle"
                          fontSize="7"
                          fontWeight="700"
                          fill="#166534"
                        >
                          LOCAL
                        </text>

                        <circle cx="225" cy="35" r="14" fill="#FFE4E6" stroke="#FDA4AF" />
                        <text
                          x="225"
                          y="38"
                          textAnchor="middle"
                          fontSize="7.5"
                          fontWeight="700"
                          fill="#9F1239"
                        >
                          PR
                        </text>

                        <circle cx="255" cy="65" r="14" fill="#E0E7FF" stroke="#A5B4FC" />
                        <text
                          x="255"
                          y="68"
                          textAnchor="middle"
                          fontSize="7.5"
                          fontWeight="700"
                          fill="#3730A3"
                        >
                          ASO
                        </text>
                      </g>

                      {/* Central Glowing "STRATEGY" Orb */}
                      <circle
                        cx="150"
                        cy="125"
                        r="38"
                        fill="white"
                        stroke="url(#orbRing)"
                        strokeWidth="3"
                      />
                      <circle
                        cx="150"
                        cy="125"
                        r="32"
                        fill="#F8FAFC"
                        stroke="#E2E8F0"
                        strokeWidth="1"
                      />
                      <text
                        x="150"
                        y="128"
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="800"
                        letterSpacing="0.08em"
                        fill="#0F172A"
                      >
                        STRATEGY
                      </text>

                      <defs>
                        <linearGradient id="orbRing" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#38BDF8" />
                          <stop offset="50%" stopColor="#6366F1" />
                          <stop offset="100%" stopColor="#F59E0B" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* 3x4 Grid of 12 Core Tools & AI Platforms */}
                  <div className="grid grid-cols-4 gap-2.5 my-3">
                    {STRATEGY_ECOSYSTEM_TOOLS.map((tool) => (
                      <div
                        key={tool.name}
                        className="flex flex-col items-center justify-center p-2.5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl text-center hover:border-slate-300 transition-colors"
                      >
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-extrabold text-white mb-1 shadow-2xs"
                          style={{ backgroundColor: tool.accent }}
                        >
                          {tool.iconText}
                        </div>
                        <div className="text-[10px] font-bold text-slate-800 leading-tight truncate w-full">
                          {tool.name}
                        </div>
                        <div className="text-[9px] text-slate-400 truncate w-full">
                          {tool.category}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Practice Summary Bar inside Strategy Card */}
                <div className="pt-3.5 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-bold text-slate-900">
                    Integrated Execution & AI Workflow Stack
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Combining technical SEO, paid search/social, GA4/GTM attribution, and automated
                    Looker Studio + LLM workflows (Claude, Gemini, ChatGPT, Perplexity) to reduce
                    reporting turnaround by 10x (5d → 0.5d).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SECTION 6: CORE SKILLS, EDUCATION & 7 CERTIFICATIONS (From Resume Pages 3-4)
           ===================================================================== */}
        {showCredentialsSection && (
          <section
            id="credentials"
            className="py-14 md:py-20 bg-white border-b border-slate-200/80"
          >
            <div className="max-w-[1240px] mx-auto px-6">
              <div className="mb-10">
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-slate-500 mb-2">
                  CORE SKILLS, EDUCATION & LICENSES
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950">
                  Capabilities, Academic Qualifications & Certifications
                </h2>
              </div>

              {/* 4-Column Core Skills Matrix from Resume Page 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
                {CORE_SKILL_CATEGORIES.map((cat, idx) => (
                  <div
                    key={cat.title}
                    className="p-5 bg-[#F8FAFC] border border-slate-200/90 rounded-2xl"
                  >
                    <div className="text-xs font-mono-tabular font-bold text-blue-700 mb-1">
                      0{idx + 1}.
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-950 mb-3">{cat.title}</h3>
                    <ul className="space-y-1.5">
                      {cat.items.map((item) => (
                        <li
                          key={item}
                          className="text-xs text-slate-600 flex items-baseline gap-2"
                        >
                          <span className="text-sky-600 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Education & 7 Certifications Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Education (2 Degrees) */}
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950 mb-4">
                    <GraduationCap className="w-4 h-4 text-blue-700" />
                    <span>Education</span>
                  </div>
                  <div className="space-y-3">
                    {EDUCATION.map((edu) => (
                      <div
                        key={edu.id}
                        className="p-5 bg-[#F8FAFC] border border-slate-200/90 rounded-2xl flex items-baseline justify-between gap-4"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-950">{edu.degree}</div>
                          <div className="text-xs text-slate-600 mt-0.5">{edu.institution}</div>
                        </div>
                        <span className="text-xs font-mono-tabular font-bold text-blue-700 shrink-0">
                          {edu.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Licenses & Certifications (7 Credentials) */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950 mb-4">
                    <Award className="w-4 h-4 text-blue-700" />
                    <span>Licenses & Certifications (7)</span>
                  </div>
                  <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl divide-y divide-slate-200/80">
                    {CERTIFICATIONS.map((cert) => (
                      <div
                        key={cert.id}
                        className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-950">
                            {cert.title}{' '}
                            <span className="font-normal text-slate-500">· {cert.issuer}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Skills: {cert.skills.join(', ')}
                            {cert.credentialId ? ` · ID: ${cert.credentialId}` : ''}
                          </div>
                        </div>
                        <span className="text-[11px] font-mono-tabular text-slate-500 shrink-0">
                          Issued {cert.issued}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            SECTION 7: BOTTOM CALLOUT BANNER & FOOTER (Matches Reference Image)
           ===================================================================== */}
        <section
          id="contact"
          className="relative overflow-hidden py-14 md:py-16 bg-gradient-to-b from-[#F1F5F9] to-[#E2E8F0]"
        >
          <div className="max-w-[1240px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-10 border-b border-slate-300/80">
              {/* Left: Italic Headline */}
              <div className="lg:col-span-4">
                <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-500 mb-1.5">
                  LET’S BUILD SOMETHING GREAT
                </div>
                <h2 className="font-editorial italic text-2xl md:text-3xl font-semibold text-slate-950 leading-snug">
                  Good growth starts with
                  <br />
                  the right questions.
                </h2>
              </div>

              {/* Center: Supporting Paragraph */}
              <div className="lg:col-span-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Whether it’s scaling organic search visibility, lowering paid acquisition costs,
                  or leading a high-performing digital team — let’s discuss what moves the needle
                  for your business.
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-800">
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE_DATA.email, 'email')}
                    className="hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{PROFILE_DATA.email}</span>
                    {copiedField === 'email' ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-400" />
                    )}
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE_DATA.phone, 'phone')}
                    className="font-mono-tabular hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>{PROFILE_DATA.phone}</span>
                    {copiedField === 'phone' ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Right: Dark Pill Button + Quick Action Links */}
              <div className="lg:col-span-4 flex flex-wrap items-center lg:justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0F172A] hover:bg-blue-700 rounded-full shadow-sm transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>Let’s connect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                  <a
                    href={PROFILE_DATA.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700 inline-flex items-center gap-1"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={`mailto:${PROFILE_DATA.email}`}
                    className="hover:text-blue-700 inline-flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => downloadStandalonePortfolioHtml(caseStudies, PORTRAIT_IMAGE)}
                    className="hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer no-print"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download resume</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Copyright Row */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
              <span>
                © {new Date().getFullYear()} {PROFILE_DATA.name}. All rights reserved. ·{' '}
                {PROFILE_DATA.location}
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900"
                >
                  LinkedIn
                </a>
                <span>|</span>
                <a href={`mailto:${PROFILE_DATA.email}`} className="hover:text-slate-900">
                  Email
                </a>
                <span>|</span>
                <a href={`tel:${PROFILE_DATA.phoneRaw}`} className="hover:text-slate-900">
                  {PROFILE_DATA.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          MODAL 1: CASE STUDY DETAIL MODAL
         ===================================================================== */}
      {activeCaseModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveCaseModal(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                  {activeCaseModal.tagsLine}
                </div>
                <h3 className="text-xl font-bold text-slate-950 mt-1">
                  {activeCaseModal.client}
                </h3>
                <div className="text-xs font-medium text-blue-700 mt-0.5">
                  {activeCaseModal.roleAttribution} ({activeCaseModal.period})
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveCaseModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-3xl font-extrabold font-mono-tabular text-[#1E6091]">
                  {activeCaseModal.bigMetric}
                </div>
                <div className="text-xs font-bold text-slate-900 mt-0.5">
                  {activeCaseModal.headlineMetric}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-900 mb-1">
                  Campaign Impact & Summary
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeCaseModal.outcomeSummary}
                </p>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-900 mb-1.5">Key Highlights</div>
                <ul className="space-y-1">
                  {activeCaseModal.secondaryMetrics.map((m, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveCaseModal(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-950 cursor-pointer"
              >
                Close
              </button>
              <a
                href={activeCaseModal.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg inline-flex items-center gap-1.5"
              >
                <span>Open Public Case Study</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: VERBATIM TESTIMONIAL MODAL
         ===================================================================== */}
      {activeTestimonialModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveTestimonialModal(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="text-xs text-slate-500">{activeTestimonialModal.agencyContext}</div>
                <h3 className="text-lg font-bold text-slate-950 mt-0.5">
                  {activeTestimonialModal.clientBrand} — Client Endorsement
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveTestimonialModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <blockquote className="text-xs md:text-sm text-slate-700 leading-relaxed">
                “{activeTestimonialModal.verbatimQuote}”
              </blockquote>
              {activeTestimonialModal.secondaryExcerpt && (
                <p className="text-xs text-slate-500 leading-relaxed pt-3 border-t border-slate-100">
                  {activeTestimonialModal.secondaryExcerpt}
                </p>
              )}
              <div className="pt-2 text-xs text-slate-800">
                <strong>{activeTestimonialModal.authorName}</strong> ·{' '}
                <span className="text-slate-500">{activeTestimonialModal.authorRole}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveTestimonialModal(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-950 cursor-pointer"
              >
                Close
              </button>
              {activeTestimonialModal.sourceUrl && (
                <a
                  href={activeTestimonialModal.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg inline-flex items-center gap-1.5"
                >
                  <span>Official Case Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: CONTACT / LET'S CONNECT MODAL
         ===================================================================== */}
      {isContactModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 md:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-950">Connect with Adarssh Bhagwat</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {PROFILE_DATA.email} · {PROFILE_DATA.phone}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsContactModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5">
              {formSubmitted ? (
                <div className="space-y-4">
                  <div className="text-sm font-bold text-emerald-800 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Message Ready</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Click below to launch your mail client with your inquiry addressed to{' '}
                    <strong>{PROFILE_DATA.email}</strong>.
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href={`mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
                        `Portfolio Inquiry from ${formState.name}`
                      )}&body=${encodeURIComponent(
                        `Name: ${formState.name}\nEmail: ${formState.email}\nPhone: ${formState.phone}\n\n${formState.message}`
                      )}`}
                      className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-blue-700"
                    >
                      Send via Email App
                    </a>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3.5" noValidate>
                  {formError && (
                    <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                      {formError}
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Your Email *"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (Optional)"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                  />
                  <textarea
                    rows={3}
                    placeholder="How can we collaborate? *"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Prepare Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 4: CASE STUDY URL MANAGER
         ===================================================================== */}
      {isLinkManagerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsLinkManagerOpen(false)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  Manage Case Study Reference URLs ({caseStudies.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Update any case study URL below; changes save automatically.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsLinkManagerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-2.5">
              {caseStudies.map((cs) => (
                <div
                  key={cs.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-slate-100"
                >
                  <span className="text-xs font-bold text-slate-900 sm:w-1/3">{cs.client}</span>
                  <input
                    type="url"
                    value={cs.caseStudyUrl}
                    onChange={(e) => handleUpdateCaseUrl(cs.id, e.target.value)}
                    className="sm:w-2/3 px-3 py-1.5 text-xs font-mono-tabular bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsLinkManagerOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
