export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyShort: string;
  period: string;
  location: string;
  isCurrent?: boolean;
  highlights: string[];
  brandsOrDomains?: string[];
}

export interface CaseStudyItem {
  id: string;
  client: string;
  industry: string;
  tagsLine: string;
  agency: 'Dentsu (Merkle Sokrati)' | 'I Knowledge Factory (IKF)';
  roleAttribution: string;
  period: string;
  category: 'seo' | 'ppc' | 'hybrid';
  bigMetric: string;
  metricSubtitle: string;
  headlineMetric: string;
  secondaryMetrics: string[];
  outcomeSummary: string;
  caseStudyUrl: string;
  featuredOrder?: number;
  image?: string;
}

export interface TestimonialItem {
  id: string;
  clientBrand: string;
  brandLogoType: 'vida' | 'amazon' | 'suryadatta';
  logoUrl?: string;
  agencyContext: string;
  authorName: string;
  authorRole: string;
  verbatimQuote: string;
  secondaryExcerpt?: string;
  verifiedMetrics: { label: string; value: string }[];
  sourceUrl?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  expires?: string;
  credentialId?: string;
  skills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

import portraitImg from '../assets/images/adarssh_bhagwat_photo.jpg';
import vidaCaseImg from '../assets/images/case_vida_mobility_1791637907558.jpg';
import easebuzzCaseImg from '../assets/images/case_easebuzz_fintech_1791796480344.jpg';
import crestCaseImg from '../assets/images/case_industrial_b2b_1791637919748.jpg';
import heroStudioImg from '../assets/images/hero_marketing_strategy_1791637746459.jpg';
import suryadattaLogoImg from '../assets/images/suryadatta-logo.png';

export const PORTRAIT_IMAGE = portraitImg;
export const VIDA_CASE_IMAGE = vidaCaseImg;
export const EASEBUZZ_CASE_IMAGE = easebuzzCaseImg;
export const CREST_CASE_IMAGE = crestCaseImg;
export const HERO_STUDIO_IMAGE = heroStudioImg;
export const SURYADATTA_LOGO_IMAGE = suryadattaLogoImg;

export const PROFILE_DATA = {
  name: 'Adarssh Bhagwat',
  title: 'Manager – SEO and PPC | Digital Marketing | Accounts and Strategy Head',
  kicker: 'DIGITAL GROWTH STRATEGIST',
  location: 'Pune, Maharashtra',
  email: 'adarsshbhagwat142@gmail.com',
  phone: '+91 7776903811',
  phoneRaw: '+917776903811',
  linkedin: 'https://www.linkedin.com/in/adarsshbhagwat/',
  linkedinHandle: 'linkedin.com/in/adarsshbhagwat',
  heroLeadBold:
    'I’m Adarssh Bhagwat, a Digital Marketing Manager specializing in SEO, PPC, and performance-led growth.',
  heroLeadBody:
    'I connect search intent, paid acquisition, data analytics, and conversion optimization to help brands scale visibility, acquire high-intent leads more efficiently, and turn marketing into measurable business outcomes.',
  heroSpecialties: ['SEO', 'PPC', 'Technical SEO', 'Local SEO', 'CRO', 'Analytics'],
  impactCards: [
    {
      value: '125%',
      title: 'Departmental revenue growth',
      detail: 'Scaled at IKF through strategic planning, expanded service lines, and strong client leadership.',
    },
    {
      value: '110%',
      title: 'ROI Improvement',
      detail: 'Delivered through integrated SEO & PPC execution, data-backed media planning, and CRO.',
    },
    {
      value: '95%+',
      title: 'Client retention rate',
      detail: 'Across 20+ SEO clients and 10+ PPC accounts managed simultaneously year-over-year.',
    },
    {
      value: '10x',
      title: 'Faster reporting',
      detail: 'Automated Looker Studio & AI workflows (Claude, Gemini, Perplexity) reduced turnaround from 5 days to 0.5 days.',
    },
  ],
};

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'vida-hero',
    client: 'VIDA by Hero MotoCorp',
    industry: 'Electric Mobility (EV)',
    tagsLine: 'DENTSU (SOKRATI)  •  LOCAL SEO  •  AUTOMOTIVE EV',
    agency: 'Dentsu (Merkle Sokrati)',
    roleAttribution: 'Executed as Senior Executive – SEO at Dentsu',
    period: 'Apr 2023 – Dec 2024',
    category: 'seo',
    bigMetric: '20x',
    metricSubtitle: 'growth in dealer calls',
    headlineMetric: '20x Growth in Dealer Calls & Store Inquiries',
    secondaryMetrics: [
      '~278% Increase in Mobile Google Searches',
      '~162% Increase in Direction Requests',
      '150% Increase in Overall Search Visibility',
      '200+ Google Business Profiles Optimized',
    ],
    outcomeSummary:
      '20X growth in calls, ~278% increase in mobile Google searches, and ~162% increase in direction requests via hyperlocal Google Business Profile optimization across 200+ listings.',
    caseStudyUrl:
      'https://sokrati.com/case-study/vida-achieves-20x-growth-in-store-inquiries-with-hyperlocal-seo-approach',
    featuredOrder: 1,
    image: VIDA_CASE_IMAGE,
  },
  {
    id: 'easebuzz',
    client: 'Easebuzz',
    industry: 'Fintech & Payment Solutions',
    tagsLine: 'DENTSU (SOKRATI)  •  360° SEO  •  FINTECH',
    agency: 'Dentsu (Merkle Sokrati)',
    roleAttribution: 'Executed as Senior Executive – SEO at Dentsu',
    period: 'Apr 2023 – Dec 2024',
    category: 'seo',
    bigMetric: '115%',
    metricSubtitle: 'growth in organic clicks',
    headlineMetric: '115% Growth in Organic Clicks via 360° SEO',
    secondaryMetrics: [
      '360-Degree Keyword Mapping',
      'Topical-Authority Content Architecture',
      'E-E-A-T & High-Authority Backlinks',
    ],
    outcomeSummary:
      '115% growth in organic clicks for Easebuzz through a 360-degree SEO strategy covering keyword mapping, topical-authority content, E-E-A-T, and quality backlinks.',
    caseStudyUrl: 'https://www.dentsu.com/in/en/our-work/case-study-sokrati-for-easebuzz',
    featuredOrder: 2,
    image: EASEBUZZ_CASE_IMAGE,
  },
  {
    id: 'crest-test-systems',
    client: 'Crest Test Systems',
    industry: 'Industrial Testing Equipment',
    tagsLine: 'IKF  •  B2B SEO  •  INDUSTRIAL TESTING',
    agency: 'I Knowledge Factory (IKF)',
    roleAttribution: 'Managed as Manager – SEO & PPC at IKF',
    period: 'Dec 2024 – Present',
    category: 'seo',
    bigMetric: '8x',
    metricSubtitle: 'organic traffic growth',
    headlineMetric: '8x Organic Traffic Growth in 9 Months',
    secondaryMetrics: [
      '8X Organic Growth in 9 Months',
      '~55% Non-Brand Traffic Growth',
      'Intent-Matched B2B Keyword Targeting',
    ],
    outcomeSummary:
      '8X organic traffic growth in 9 months, including ~55% non-brand traffic growth from intent-matched B2B keyword targeting.',
    caseStudyUrl: 'https://www.ikf.co.in/case-studies/crest-test-systems/',
    featuredOrder: 3,
    image: CREST_CASE_IMAGE,
  },
  {
    id: 'radhesham-wellpack',
    client: 'Radhesham Wellpack',
    industry: 'Corrugated Packaging',
    tagsLine: 'IKF  •  B2B SEO  •  PACKAGING',
    agency: 'I Knowledge Factory (IKF)',
    roleAttribution: 'Managed as Manager – SEO & PPC at IKF',
    period: 'Dec 2024 – Present',
    category: 'seo',
    bigMetric: '28x',
    metricSubtitle: 'organic traffic growth YoY',
    headlineMetric: '28x YoY Organic Traffic Growth & 67% Keywords in Top 10',
    secondaryMetrics: [
      '28X YoY Organic Traffic Growth',
      '67% of Tracked Keywords in Top 10',
      '58% Traffic Lift in Latest 3 Months vs. Prior 3',
    ],
    outcomeSummary:
      '28X organic traffic growth year-over-year, with 67% of tracked keywords in the top 10 and a 58% traffic lift in the latest 3 months vs. the prior 3.',
    caseStudyUrl: 'https://www.ikf.co.in/case-studies/radhesham-wellpack/',
    image: CREST_CASE_IMAGE,
  },
  {
    id: 'mitbio-university',
    client: 'MITBIO University',
    industry: 'Higher Education',
    tagsLine: 'IKF  •  ORGANIC SEO  •  EDUCATION',
    agency: 'I Knowledge Factory (IKF)',
    roleAttribution: 'Managed as Manager – SEO & PPC at IKF',
    period: 'Dec 2024 – Present',
    category: 'seo',
    bigMetric: '~800%',
    metricSubtitle: 'organic traffic growth',
    headlineMetric: '~800% Organic Growth Over 16 Months & 500+ Keywords Ranked',
    secondaryMetrics: [
      '~800% Organic Traffic Growth (16 Mos)',
      '500+ Keywords Ranked',
      '~62% Growth in Non-Brand Traffic',
    ],
    outcomeSummary:
      '~800% organic traffic growth over 16 months, with 500+ keywords ranked and ~62% growth in non-brand traffic.',
    caseStudyUrl: 'https://www.ikf.co.in/case-studies/mitbio-university/',
    image: HERO_STUDIO_IMAGE,
  },
  {
    id: 'avior',
    client: 'Avior Enterprises',
    industry: 'Real Estate',
    tagsLine: 'IKF  •  PERFORMANCE PPC  •  REAL ESTATE',
    agency: 'I Knowledge Factory (IKF)',
    roleAttribution: 'Managed as Manager – SEO & PPC at IKF',
    period: 'Dec 2024 – Present',
    category: 'ppc',
    bigMetric: '-83%',
    metricSubtitle: 'CPL cut from ₹800 to ₹135',
    headlineMetric: 'Cut Cost Per Lead from ₹800 to ₹135 (~83% Lower)',
    secondaryMetrics: [
      'CPL Reduced from ₹800 to ₹135 (~83% Lower)',
      'Precise Audience Targeting',
      'Reel-Based Video Creatives',
    ],
    outcomeSummary:
      'Cut cost per lead from ₹800 to ₹135 (~83% lower) using precise audience targeting and high-converting reel-based video creatives.',
    caseStudyUrl: 'https://www.ikf.co.in/case-studies/avior/',
    image: EASEBUZZ_CASE_IMAGE,
  },
  {
    id: 'marigold',
    client: 'Marigold Banquets',
    industry: 'Luxury Events & Hospitality',
    tagsLine: 'IKF  •  PPC & CRO  •  LUXURY EVENTS',
    agency: 'I Knowledge Factory (IKF)',
    roleAttribution: 'Managed as Manager – SEO & PPC at IKF',
    period: 'Dec 2024 – Present',
    category: 'ppc',
    bigMetric: '-78%',
    metricSubtitle: 'CPL cut from ₹3,000 to ₹650',
    headlineMetric: 'CPL Cut from ₹3,000 to ₹650 · 530 Leads & 242 Venue Visits',
    secondaryMetrics: [
      'CPL Reduced from ₹3,000 to ₹650 (~78% Lower)',
      '530 Leads Showed Interest in Visiting',
      '242 Prospects Visited the Venue',
    ],
    outcomeSummary:
      'Reduced cost per lead from ₹3,000 to ₹650 (~78% lower); 530 leads showed interest in visiting and 242 prospects physically visited the venue.',
    caseStudyUrl: 'https://www.ikf.co.in/case-studies/marigold/',
    image: VIDA_CASE_IMAGE,
  },
  {
    id: 'elcon-global',
    client: 'Elcon Global',
    industry: 'Industrial Cable Systems',
    tagsLine: 'IKF  •  B2B SEO  •  MANUFACTURING',
    agency: 'I Knowledge Factory (IKF)',
    roleAttribution: 'Managed as Manager – SEO & PPC at IKF',
    period: 'Dec 2024 – Present',
    category: 'seo',
    bigMetric: '162%',
    metricSubtitle: 'YoY organic traffic growth',
    headlineMetric: '162% YoY Organic Growth & 80% Keywords in Top 10',
    secondaryMetrics: [
      '162% Year-over-Year Organic Traffic Growth',
      '80% of Tracked Keywords Ranking in Top 10',
    ],
    outcomeSummary:
      '162% year-over-year organic traffic growth, with 80% of tracked keywords ranking in the top 10.',
    caseStudyUrl: 'https://www.ikf.co.in/case-studies/elcon-global/',
    image: CREST_CASE_IMAGE,
  },
  {
    id: 'rovema',
    client: 'Rovema India',
    industry: 'Packaging Machinery (B2B)',
    tagsLine: 'IKF  •  MULTI-CHANNEL PPC  •  B2B MACHINERY',
    agency: 'I Knowledge Factory (IKF)',
    roleAttribution: 'Managed as Manager – SEO & PPC at IKF',
    period: 'Dec 2024 – Present',
    category: 'ppc',
    bigMetric: '-58%',
    metricSubtitle: 'reduction in B2B lead cost',
    headlineMetric: '58% Reduction in B2B Lead Cost Across Search, YouTube & LinkedIn',
    secondaryMetrics: [
      '58% Reduction in B2B Lead Cost',
      'Google Search, YouTube, Remarketing & LinkedIn Strategy',
    ],
    outcomeSummary:
      '58% reduction in B2B lead cost through an integrated Google Search, YouTube, remarketing, and LinkedIn strategy.',
    caseStudyUrl: 'https://www.ikf.co.in/case-studies/rovema/',
    image: CREST_CASE_IMAGE,
  },
  {
    id: 'paysquare',
    client: 'Paysquare',
    industry: 'Payroll Outsourcing (B2B)',
    tagsLine: 'IKF  •  GOOGLE SEARCH PPC  •  BFSI / HRTECH',
    agency: 'I Knowledge Factory (IKF)',
    roleAttribution: 'Managed as Manager – SEO & PPC at IKF',
    period: 'Dec 2024 – Present',
    category: 'ppc',
    bigMetric: '388',
    metricSubtitle: 'B2B leads at 60% qualification',
    headlineMetric: '388 Leads at 60% Qualification Rate (₹7,066 Avg. CPL)',
    secondaryMetrics: [
      '388 B2B Leads Generated',
      '60% Lead Qualification Rate',
      '₹7,066 Average CPL from Google Search',
    ],
    outcomeSummary:
      '388 leads generated at a 60% qualification rate with a ₹7,066 average CPL from high-intent Google Search campaigns.',
    caseStudyUrl: 'https://www.ikf.co.in/case-studies/paysquare/',
    image: EASEBUZZ_CASE_IMAGE,
  },
  {
    id: 'alligator-automations',
    client: 'Alligator Automations',
    industry: 'Industrial Automation',
    tagsLine: 'IKF  •  B2B SEO  •  ROBOTIC AUTOMATION',
    agency: 'I Knowledge Factory (IKF)',
    roleAttribution: 'Managed as Manager – SEO & PPC at IKF',
    period: 'Dec 2024 – Present',
    category: 'seo',
    bigMetric: '80%+',
    metricSubtitle: 'YoY organic traffic growth',
    headlineMetric: '80%+ YoY Organic Traffic Growth & 100+ Non-Branded Keywords',
    secondaryMetrics: [
      '80%+ Year-over-Year Organic Traffic Growth',
      '100+ Non-Branded Keywords Ranked',
    ],
    outcomeSummary:
      '80%+ year-over-year organic traffic growth and 100+ non-branded industrial automation keywords ranked.',
    caseStudyUrl: 'https://www.ikf.co.in/case-studies/alligator-automations/',
    image: CREST_CASE_IMAGE,
  },
  {
    id: 'dr-cipy',
    client: 'Dr. Cipy',
    industry: 'Industrial Flooring',
    tagsLine: 'IKF  •  ORGANIC SEO  •  MANUFACTURING',
    agency: 'I Knowledge Factory (IKF)',
    roleAttribution: 'Managed as Manager – SEO & PPC at IKF',
    period: 'Dec 2024 – Present',
    category: 'seo',
    bigMetric: '~40%',
    metricSubtitle: 'organic growth & 400+ keywords',
    headlineMetric: '~40% Organic Growth & 400+ Keywords Ranked (67% in Top 10)',
    secondaryMetrics: [
      '~40% Organic Traffic Growth (6 vs. 6 Mos)',
      '400+ Keywords Ranked',
      '67% in Top 10 (60% Non-Branded)',
    ],
    outcomeSummary:
      '~40% organic traffic growth (6 vs. 6 months) and 400+ keywords ranked, 67% of them in the top 10 (60% of those non-branded).',
    caseStudyUrl: 'https://www.ikf.co.in/case-studies/dr-cipy/',
    image: HERO_STUDIO_IMAGE,
  },
  {
    id: 'oruga-world',
    client: 'Oruga World',
    industry: 'Preschool Education',
    tagsLine: 'IKF  •  LOCAL PPC  •  EDUCATION',
    agency: 'I Knowledge Factory (IKF)',
    roleAttribution: 'Managed as Manager – SEO & PPC at IKF',
    period: 'Dec 2024 – Present',
    category: 'ppc',
    bigMetric: '433',
    metricSubtitle: 'preschool enquiries generated',
    headlineMetric: '433 Enquiries via Parent-Focused Local Performance Strategy',
    secondaryMetrics: [
      '433 Verified Admission Enquiries',
      'Parent-Focused Local Visibility Strategy',
    ],
    outcomeSummary:
      '433 enquiries generated through a parent-focused, local-visibility performance marketing strategy.',
    caseStudyUrl: 'https://www.ikf.co.in/case-studies/oruga-world/',
    image: EASEBUZZ_CASE_IMAGE,
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'testimonial-vida',
    clientBrand: 'VIDA by Hero MotoCorp',
    brandLogoType: 'vida',
    agencyContext: 'Executed as Senior Executive – SEO at Dentsu (Merkle Sokrati)',
    authorName: 'Preeti Raheja',
    authorRole: 'Lead, Performance and Media Marketing - VIDA by Hero MotoCorp',
    verbatimQuote:
      'The goal was to increase VIDA V1 Electric Scooter visibility nationwide, which wouldn’t have been possible without a strong presence on Google Maps. The Sokrati team, including Adarssh, Pankaj, Anirban, Marshal, and Danish, played a crucial role in achieving this success. They were not only responsible for creating these listings but also for coordinating with each TSM and optimizing them on a regular basis. This activity led to a significant improvement in multiple metrics, especially direct calls to dealers. Their efforts and dedication are greatly appreciated.',
    secondaryExcerpt:
      '#Clientsuccess | VIDA World achieves 20x growth in store inquiries with Merkle Sokrati’s hyperlocal SEO approach. Congratulations Team — Adarssh Bhagwat || Pankaj Chougule || Anirban Bhattacharjee || Marshal Marian',
    verifiedMetrics: [
      { label: 'Dealer Calls', value: '20x Growth' },
      { label: 'Mobile Searches', value: '~278% Lift' },
      { label: 'Direction Requests', value: '~162% Lift' },
    ],
    sourceUrl:
      'https://sokrati.com/case-study/vida-achieves-20x-growth-in-store-inquiries-with-hyperlocal-seo-approach',
  },
  {
    id: 'testimonial-amazon',
    clientBrand: 'Amazon Business',
    brandLogoType: 'amazon',
    agencyContext: 'Executed as Senior Executive – SEO at Dentsu (Merkle Sokrati)',
    authorName: 'Chandan',
    authorRole: 'Program Stakeholder - Amazon Business',
    verbatimQuote:
      'It was nice interacting with you today and really impressed with the strategies we discussed to drive more traffic to our website. The references taken from competitor websites and tracking them closely to map and monitor our performance was brilliant. I would like to spare a moment of appreciation for Anirban, Adarssh and Ankita on their efforts put in for improving our website performance. In the span of months compared between Feb’24–May’24 we have achieved better page position (from 13.6 to 12.8), increased free search visits (from 8.9k to 16.95k) and higher time spent (122 to 134) demonstrates the level of strategy and skills.',
    secondaryExcerpt:
      'The prompt inputs and timely optimization recommendations given by you have really benefited us to drive this charter with pace... Kudos to your contributions and efforts to stay on top. Keep it up @Anirban Bhattacharjee, @Adarssh Bhagwat and @Ankita Paturkar thanks again!',
    verifiedMetrics: [
      { label: 'Organic Traffic (3 Mos)', value: '+120% Growth' },
      { label: 'Free Search Visits', value: '8.9k → 16.95k' },
      { label: 'Page Position', value: '13.6 → 12.8' },
    ],
  },
  {
    id: 'testimonial-suryadatta',
    clientBrand: 'Suryadatta Group of Institutes',
    brandLogoType: 'suryadatta',
    logoUrl: SURYADATTA_LOGO_IMAGE,
    agencyContext: 'Digital Marketing & Admission Campaigns',
    authorName: 'Ankita Dahale',
    authorRole: 'Admissions Manager at Suryadatta Group of Institutes',
    verbatimQuote:
      'We had a great experience working with Adarssh on our digital marketing and admission campaigns. Despite starting late in the admission season, the campaigns generated a good number of enquiries and admissions.\n\nWhat stood out was his proactive approach. He went beyond running campaigns by visiting our campus and guiding our admissions team on handling student enquiries more effectively.\n\nWe really appreciated his support, responsiveness, and commitment throughout the campaign.',
    verifiedMetrics: [
      { label: 'Campaign Impact', value: 'Enquiries & Admissions' },
      { label: 'On-Ground Support', value: 'Campus Team Training' },
    ],
  },
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: 'ikf',
    companyShort: 'IKF (I Knowledge Factory)',
    company: 'I Knowledge Factory (IKF)',
    role: 'Manager – SEO and PPC',
    period: 'Dec 2024 – Present',
    location: 'Pune, Maharashtra',
    isCurrent: true,
    highlights: [
      'Directly handled 20+ SEO clients and 10+ PPC accounts (95%+ YoY retention), formulating integrated SEO & Performance Marketing strategies.',
      'Mentored and trained a team of 10 digital marketing professionals to drive high-quality execution, strategic direction, and delivery excellence.',
      'Scaled department revenue by 125% and achieved 110% ROI improvement; launched PR, CRO, Paid Backlinking, Social Media & YouTube SEO streams (driving up to 70% additional revenue).',
      'Delivered 10x faster reporting (5 days to 0.5 days) by automating Looker Studio dashboards & integrating Claude, Gemini, and Perplexity.',
    ],
    brandsOrDomains: [
      'MITBIO University',
      'Rovema India',
      'Dr. Cipy',
      'Paysquare',
      'Alligator Automations',
      'Radhesham Wellpack',
      'Crest Test Systems',
      'Elcon Global',
      'Avior Enterprises',
      'Marigold Banquets',
      'Oruga World',
    ],
  },
  {
    id: 'dentsu',
    companyShort: 'Dentsu (Merkle Sokrati)',
    company: 'Dentsu (Merkle Sokrati)',
    role: 'Senior Executive – SEO',
    period: 'Apr 2023 – Dec 2024',
    location: 'Pune, Maharashtra',
    highlights: [
      'Drove 115% growth in organic clicks for Easebuzz (Fintech) via 360° SEO and 120% organic traffic growth for Amazon Business in 3 months.',
      'Delivered 150% increase in search visibility and 20x jump in dealer calls for VIDA by Hero MotoCorp across 200+ Google Business Profiles.',
      'Handled end-to-end SEO operations & client communication for HCG (Healthcare), Bajaj Auto, Airtel Wynk (SaaS & ASO), Figaro (FMCG), Easebuzz, and Kotak Mutual Fund (BFSI).',
      'Resolved complex technical SEO issues including Core Web Vitals and JavaScript SEO rendering; executed ASO and trained junior team members.',
    ],
    brandsOrDomains: [
      'VIDA by Hero MotoCorp',
      'Amazon Business',
      'Easebuzz (Fintech)',
      'Kotak Mutual Fund (BFSI)',
      'Bajaj Auto',
      'HCG (Healthcare)',
      'Airtel Wynk (SaaS & ASO)',
      'Figaro (FMCG)',
    ],
  },
  {
    id: 'pletra',
    companyShort: 'Pletra Technologies',
    company: 'Pletra Technologies',
    role: 'Digital Marketing Executive',
    period: 'Nov 2022 – Apr 2023',
    location: 'Pune, Maharashtra',
    highlights: [
      'Led end-to-end SEO and digital marketing operations for PletraTech (Salesforce Consultants) and SkillsEcole (EdTech).',
      'Planned multi-channel social media (Facebook, Instagram, LinkedIn, YouTube, Telegram), email marketing, and hosted webinars on Cloud Computing & Salesforce.',
    ],
  },
  {
    id: 'itek',
    companyShort: 'i-TEK RFID',
    company: 'i-TEK RFID',
    role: 'Digital Marketing Executive',
    period: 'May 2022 – Nov 2022',
    location: 'Pune, Maharashtra',
    highlights: [
      'Built the internal marketing department from scratch and led content operations for a full website overhaul.',
      'Designed sector-specific B2B funnels across retail, logistics, automotive, and mining sectors; managed global RFID exhibition marketing.',
    ],
  },
  {
    id: 'digitized',
    companyShort: 'Digitized Brand Hub',
    company: 'Digitized Brand Hub',
    role: 'Digital Marketing Intern',
    period: 'Jan 2022 – May 2022',
    location: 'Pune, Maharashtra',
    highlights: [
      'Built high-performing Google and Facebook ad campaigns.',
      'Automated email workflows to improve user engagement.',
    ],
  },
  {
    id: 'credence-oberoi',
    companyShort: 'Credence Resource Mgmt & The Oberoi',
    company: 'Credence Resource Management · The Oberoi, Mumbai',
    role: 'Customer Service Executive & Steward',
    period: 'Jun 2018 – May 2022',
    location: 'Pune & Mumbai',
    highlights: [
      'Credence Resource Management (Jul 2021 – May 2022): Managed high-volume international client interactions, negotiation, and objection handling.',
      'The Oberoi, Mumbai (Jun 2018 – Jun 2021): Managed luxury Food & Beverage operations, cross-team coordination, and guest satisfaction.',
    ],
  },
];

export const STRATEGY_ECOSYSTEM_TOOLS = [
  // Row 1: Google Core Stack
  { name: 'Google Ads', category: 'Paid Media', accent: '#2563EB', iconText: 'Ads' },
  { name: 'GA4', category: 'Analytics', accent: '#EA580C', iconText: 'GA4' },
  { name: 'Search Console', category: 'Organic Search', accent: '#0284C7', iconText: 'GSC' },
  { name: 'Tag Manager', category: 'Tagging', accent: '#4F46E5', iconText: 'GTM' },
  // Row 2: BI & SEO Intelligence
  { name: 'Looker Studio', category: 'BI Automation', accent: '#2563EB', iconText: 'BI' },
  { name: 'SEMrush', category: 'SEO Suite', accent: '#EA580C', iconText: 'SEM' },
  { name: 'Ahrefs', category: 'Backlinks & SEO', accent: '#1D4ED8', iconText: 'AHR' },
  { name: 'Clarity', category: 'CRO & Heatmaps', accent: '#0D9488', iconText: 'CRO' },
  // Row 3: AI Workflow Stack
  { name: 'ChatGPT', category: 'AI Strategy', accent: '#059669', iconText: 'GPT' },
  { name: 'Claude', category: 'AI Analysis', accent: '#D97706', iconText: 'CLD' },
  { name: 'Gemini', category: 'AI Workflows', accent: '#4F46E5', iconText: 'GEM' },
  { name: 'Perplexity', category: 'AI Research', accent: '#0F766E', iconText: 'PPX' },
];

export const CORE_SKILL_CATEGORIES = [
  {
    title: 'Strategy & Operations',
    items: [
      'Marketing Strategy',
      'Media Planning',
      'SEO Strategy',
      'Performance Marketing',
      'CRO',
      'Account Management',
      'Delivery Management',
      'Client Relationship Management',
    ],
  },
  {
    title: 'SEO & Technical',
    items: [
      'Technical SEO',
      'Local SEO (200+ GMB)',
      'YouTube SEO',
      'App Store Optimization (ASO)',
      'Digital PR',
      'Link Building',
      'Keyword Research',
      'Content Strategy',
      'Wikipedia & Wikidata Mgmt',
    ],
  },
  {
    title: 'Paid & Analytics',
    items: [
      'Google Ads',
      'PPC Campaigns',
      'GA4',
      'Google Search Console',
      'Google Tag Manager (GTM)',
      'Looker Studio',
      'Microsoft Clarity',
      'SEMrush',
      'Ahrefs',
    ],
  },
  {
    title: 'Leadership & Tools',
    items: [
      'Team Leadership & Mentorship (10+)',
      'Workflow Automation (10x Faster)',
      'AI Integration — Claude, ChatGPT, Gemini, Perplexity',
      'Negotiation',
      'Corporate Communications',
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Non-Verbal Communication for Leaders',
    issuer: 'Udemy',
    issued: 'May 2026',
    expires: 'Jan 2036',
    credentialId: 'UC-8c95b562-8eda-4387-ac19-70c55f2f912d',
    skills: ['Leadership', 'Personality Development'],
  },
  {
    id: 'cert-2',
    title: 'Marketing Strategy: SEO Content Writing',
    issuer: 'LinkedIn',
    issued: 'Jun 2025',
    skills: ['SEO Copywriting'],
  },
  {
    id: 'cert-3',
    title: 'GA4 for SEO',
    issuer: 'Semrush',
    issued: 'Jun 2024',
    expires: 'Jun 2025',
    credentialId: '2f7a99ba4f',
    skills: ['Google Analytics', 'Google Data Studio', 'User-Behavior Tracking', 'Data-Driven SEO Reporting'],
  },
  {
    id: 'cert-4',
    title: 'Using ChatGPT and AI Hacks with MS Office',
    issuer: 'Skill Nation',
    issued: 'Feb 2024',
    skills: ['Artificial Intelligence (AI)', 'Microsoft Office'],
  },
  {
    id: 'cert-5',
    title: 'Using AI as Your SEO Assistant',
    issuer: 'Dave Birss — Creativity & Innovation Thinker',
    issued: 'Feb 2024',
    skills: ['Artificial Intelligence in SEO'],
  },
  {
    id: 'cert-6',
    title: 'Google Analytics Individual Qualification',
    issuer: 'Udemy',
    issued: 'Sep 2023',
    skills: ['Google Analytics'],
  },
  {
    id: 'cert-7',
    title: 'Keyword Strategy Certification',
    issuer: 'LinkedIn Learning',
    issued: 'Apr 2023',
    expires: 'Apr 2023',
    skills: ['Keyword Research', 'Keyword Analysis'],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'edu-mba',
    degree: 'MBA in Marketing Management',
    institution: 'Symbiosis University',
    year: '2025',
  },
  {
    id: 'edu-bachelor',
    degree: 'Bachelor in Hospitality Studies',
    institution: 'Suryadatta Group of Institutes (SCHMTT)',
    year: '2018',
  },
];
