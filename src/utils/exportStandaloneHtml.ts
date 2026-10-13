import {
  PROFILE_DATA,
  EXPERIENCE_TIMELINE,
  CASE_STUDIES,
  TESTIMONIALS,
  CORE_SKILL_CATEGORIES,
  CERTIFICATIONS,
  EDUCATION,
  PORTRAIT_IMAGE,
  CaseStudyItem,
} from '../data/portfolioData';

export function downloadStandalonePortfolioHtml(
  customCaseStudies: CaseStudyItem[] = CASE_STUDIES,
  customPortraitDataUrl: string | null = PORTRAIT_IMAGE
) {
  const htmlContent = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${PROFILE_DATA.name} — ${PROFILE_DATA.title}</title>
  <meta name="description" content="${PROFILE_DATA.heroLeadBody}" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500;1,9..144,600&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #F8FAFC;
      color: #0F172A;
    }
    .font-editorial { font-family: 'Fraunces', Georgia, serif; }
    .font-handwritten { font-family: 'Caveat', cursive; }
    .font-mono-tabular { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
  </style>
</head>
<body class="bg-[#F8FAFC] text-slate-900 antialiased">
  <header class="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200/80">
    <div class="max-w-[1220px] mx-auto px-6 py-4 flex items-center justify-between gap-8">
      <a href="#" class="font-editorial italic text-xl font-semibold text-slate-900 whitespace-nowrap">${PROFILE_DATA.name}</a>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
        <a href="#home" class="text-slate-900 border-b-2 border-blue-600 pb-0.5">Home</a>
        <a href="#work" class="hover:text-slate-900">Work</a>
        <a href="#experience" class="hover:text-slate-900">Experience</a>
        <a href="#about" class="hover:text-slate-900">About</a>
        <a href="#contact" class="hover:text-slate-900">Contact</a>
      </nav>
      <a href="#contact" class="px-4 py-2 text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-300/80 rounded-full">Contact Me</a>
    </div>
  </header>

  <main class="max-w-[1220px] mx-auto px-6">
    <!-- Hero -->
    <section id="home" class="py-16 md:py-20 border-b border-slate-200">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-7">
          <div class="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-3">${PROFILE_DATA.kicker}</div>
          <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.08] mb-5">
            I don’t just drive<br />traffic, I build<br />
            <span class="bg-gradient-to-r from-sky-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">growth engines.</span>
          </h1>
          <p class="text-sm md:text-base text-slate-800 font-medium mb-2">${PROFILE_DATA.heroLeadBold}</p>
          <p class="text-sm text-slate-600 leading-relaxed max-w-xl mb-7">${PROFILE_DATA.heroLeadBody}</p>
          <div class="flex flex-wrap items-center gap-3 mb-8">
            <a href="#work" class="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg">Explore My Work ›</a>
            <a href="#contact" class="px-5 py-2.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg">Let’s Connect</a>
          </div>
          <div class="text-xs font-medium text-slate-600">${PROFILE_DATA.heroSpecialties.join('  •  ')}</div>
        </div>
        ${
          (customPortraitDataUrl || PORTRAIT_IMAGE)
            ? `<div class="lg:col-span-5 flex justify-center"><img src="${customPortraitDataUrl || PORTRAIT_IMAGE}" alt="${PROFILE_DATA.name}" class="w-72 h-80 object-cover object-top rounded-3xl border-4 border-white shadow-xl" /></div>`
            : ''
        }
      </div>
    </section>

    <!-- Impact -->
    <section id="about" class="py-16 border-b border-slate-200">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-4">
          <div class="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">IMPACT AT A GLANCE</div>
          <h2 class="text-2xl md:text-3xl font-bold text-slate-950 mb-4">Growth is the goal.<br />The numbers tell the story.</h2>
          <p class="text-xs text-slate-600 leading-relaxed mb-4">Across agency leadership at IKF and enterprise search at Dentsu, my focus has remained on measurable business outcomes.</p>
        </div>
        <div class="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${PROFILE_DATA.impactCards
            .map(
              (c) => `
            <div class="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <div class="text-3xl font-extrabold text-sky-800 mb-1">${c.value}</div>
              <div class="text-sm font-bold text-slate-900 mb-1">${c.title}</div>
              <p class="text-xs text-slate-600 leading-relaxed">${c.detail}</p>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <!-- Work -->
    <section id="work" class="py-16 border-b border-slate-200">
      <div class="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">FEATURED WORK & CASE STUDIES</div>
      <h2 class="text-2xl md:text-3xl font-bold text-slate-950 mb-6">Different challenges. One common goal: <span class="font-editorial italic text-purple-700 font-normal">meaningful growth.</span></h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        ${customCaseStudies
          .map(
            (cs) => `
          <div class="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between">
            <div>
              <div class="text-[10px] font-semibold tracking-wider uppercase text-slate-400 mb-2">${cs.tagsLine}</div>
              <h3 class="text-base font-bold text-slate-950 mb-1">${cs.client}</h3>
              <div class="text-xs text-blue-700 font-medium mb-2">${cs.roleAttribution}</div>
              <div class="text-2xl font-extrabold text-sky-800">${cs.bigMetric}</div>
              <div class="text-xs font-semibold text-slate-700 mb-2">${cs.metricSubtitle}</div>
              <p class="text-xs text-slate-600 leading-relaxed mb-4">${cs.outcomeSummary}</p>
            </div>
            <a href="${cs.caseStudyUrl}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-slate-900 hover:text-blue-700">View case study →</a>
          </div>`
          )
          .join('')}
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-16 border-b border-slate-200">
      <div class="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">TESTIMONIALS</div>
      <h2 class="text-2xl md:text-3xl font-bold text-slate-950 mb-6">Real feedback. <span class="font-editorial italic text-amber-600 font-normal">Lasting relationships.</span></h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${TESTIMONIALS.map(
          (t) => `
          <div class="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between">
            <p class="text-xs text-slate-700 leading-relaxed mb-5">“${t.verbatimQuote}”</p>
            <div class="pt-4 border-t border-slate-100">
              <div class="text-xs font-bold text-slate-950">${t.authorName}</div>
              <div class="text-[11px] text-slate-500">${t.authorRole}</div>
            </div>
          </div>`
        ).join('')}
      </div>
    </section>

    <!-- Experience -->
    <section id="experience" class="py-16 border-b border-slate-200">
      <div class="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-2">MY JOURNEY</div>
      <h2 class="text-2xl md:text-3xl font-bold text-slate-950 mb-6">From doing the work to shaping the strategy.</h2>
      <div class="space-y-4">
        ${EXPERIENCE_TIMELINE.map(
          (e) => `
          <div class="p-5 bg-white border border-slate-200 rounded-2xl">
            <div class="flex justify-between items-baseline mb-2">
              <div class="text-sm font-bold text-slate-950">${e.company} — <span class="text-blue-700">${e.role}</span></div>
              <span class="text-xs text-slate-500">${e.period}</span>
            </div>
            <ul class="list-disc pl-5 text-xs text-slate-600 space-y-1">
              ${e.highlights.map((h) => `<li>${h}</li>`).join('')}
            </ul>
          </div>`
        ).join('')}
      </div>
    </section>

    <!-- Credentials & Contact -->
    <section id="contact" class="py-16">
      <h2 class="text-2xl font-editorial italic font-semibold text-slate-950 mb-3">Good growth starts with the right questions.</h2>
      <p class="text-xs text-slate-600 mb-4">${PROFILE_DATA.location} • ${PROFILE_DATA.phone} • ${PROFILE_DATA.email} • <a href="${PROFILE_DATA.linkedin}" class="text-blue-700 underline">LinkedIn</a></p>
    </section>
  </main>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'adarssh-bhagwat-portfolio.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
