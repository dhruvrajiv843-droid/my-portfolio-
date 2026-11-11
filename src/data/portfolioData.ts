import { ServiceItem, ProjectItem } from '../types.ts';

export const PERSONAL_INFO = {
  name: 'Dhruv Singh',
  shortName: 'Singh',
  brandName: 'Dhruv Singh.dev',
  role: 'First-Year IT Engineering Student & Freelancer',
  statusBadge: 'Open to Work — Freelance & Internships',
  headline: "Hi, I'm Dhruv Singh. Building Websites, AI Content & Smart Digital Solutions.",
  subheadline: 'First-Year IT Engineering Student combining AI tools, UI/UX design, and web development to deliver fast, high-impact results.',
  email: 'dhruvrajiv843@gmail.com',
  githubUrl: 'https://github.com/dhruvrajiv843-droid',
  githubUsername: 'dhruvrajiv843-droid',
  linkedinUrl: 'https://www.linkedin.com/in/dhruv-singh-363724417/',
  location: 'Mumbai, India · Available Worldwide (Remote)',
  bio: `I am a first-year Information Technology engineering student with an obsession for building practical, modern digital experiences. As a continuous learner, I bridge software engineering fundamentals with modern AI-accelerated workflows to turn ideas into polished products in record time.

My hands-on experience spans responsive web development, rapid interface prototyping in Figma, modern AI tools for video and audio production, and essential cloud deployment basics. Rather than getting bogged down in unnecessary complexity, I focus on clean design, fast load times, and tangible business impact.

When I am not in engineering lectures or coding, you will find me pushing open-source repositories to GitHub, experimenting with generative media pipelines, and partnering with founders and teams for freelance projects and internship opportunities.`,
  highlights: [
    { label: 'Academic Focus', value: '1st Year IT Engineering' },
    { label: 'Core Advantage', value: 'AI-Powered Speed & Craft' },
    { label: 'Work Status', value: 'Freelance & Internships' },
    { label: 'Code Base', value: 'Active on GitHub' },
  ],
  techStack: [
    { name: 'React & TypeScript', category: 'Frontend', level: 'Advanced Core' },
    { name: 'Tailwind CSS', category: 'Design System', level: 'Rapid Styling' },
    { name: 'Figma', category: 'UI/UX', level: 'Wireframes & High-Fi' },
    { name: 'Node.js & Express', category: 'Backend', level: 'APIs & Server Logic' },
    { name: 'AI Video Tools', category: 'Generative AI', level: 'Runway / Kling / CapCut' },
    { name: 'AI Voice & Audio', category: 'Generative AI', level: 'Studio Quality Audio' },
    { name: 'Cloud & Git Basics', category: 'DevOps', level: 'Vercel, Supabase, GitHub' },
    { name: 'CRM & Automation', category: 'Systems', level: 'Workflow Pipelines' },
  ],
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'ai-web-design',
    title: 'AI Website Design & Development',
    shortDescription: 'Fast, modern, responsive websites built using AI-assisted workflows and Figma.',
    longDescription: 'High-converting, responsive web presences designed in Figma and developed with modern React and Tailwind. AI-accelerated code generation ensures lightning-fast delivery without compromising code cleanliness or mobile polish.',
    iconName: 'layout',
    deliverables: [
      'Responsive design across Mobile, Tablet, & 4K screens',
      'Figma design preview with design tokens',
      'Lightning-fast load speed & SEO optimization',
      'GitHub repository handover with full documentation',
    ],
    techTags: ['React', 'Tailwind CSS', 'Figma', 'TypeScript'],
    serviceTypeValue: 'AI Website Design & Development',
  },
  {
    id: 'ai-video-reels',
    title: 'AI Video & Reels Creation',
    shortDescription: 'Engaging short-form videos and social media reels generated with advanced AI video tools.',
    longDescription: 'Captivating vertical and horizontal video campaigns tailored for Instagram Reels, TikTok, YouTube Shorts, and product launches using cutting-edge AI generative video platforms, seamless motion, and dynamic kinetic typography.',
    iconName: 'video',
    deliverables: [
      '9:16 vertical reels & 16:9 horizontal promo cuts',
      'AI visual generation with cohesive prompt styling',
      'Dynamic animated subtitles & hook-optimized pacing',
      'Sound design and synced background score',
    ],
    techTags: ['AI Video', 'Prompt Engineering', 'Shorts/Reels', 'Motion'],
    serviceTypeValue: 'AI Video & Reels Creation',
  },
  {
    id: 'ai-voice-generation',
    title: 'AI Voice Generation',
    shortDescription: 'Realistic, studio-quality AI voiceovers for ads, reels, and presentations.',
    longDescription: 'Natural, emotive AI voice synthesis tuned for marketing commercials, instructional tutorials, brand presentations, and automated podcast clips with precise pacing, tone control, and crystal-clear acoustic mastering.',
    iconName: 'mic',
    deliverables: [
      'Studio-grade WAV / MP3 voice masters',
      'Multi-accent & multi-lingual vocal styles',
      'Custom inflection, emotional cadence, & pauses',
      'Commercial broadcast usage rights',
    ],
    techTags: ['ElevenLabs', 'Audio Mastering', 'Voice Clones', 'Multi-Language'],
    serviceTypeValue: 'AI Voice Generation',
  },
  {
    id: 'custom-crm-setup',
    title: 'Custom CRM Setup',
    shortDescription: 'Streamlined customer relationship management solutions to organize leads and workflows.',
    longDescription: 'Eliminate missed sales opportunities and manual spreadsheet headaches. I configure clean, intuitive CRM pipelines that track inquiries, automate follow-up emails, and give founders instant clarity on their sales pipeline.',
    iconName: 'workflow',
    deliverables: [
      'Custom pipeline stages tailored to your business model',
      'Automated intake forms & lead notification alerts',
      'Contact tagging, deal values, and notes tracker',
      'Loom walkthrough & onboarding cheat sheet',
    ],
    techTags: ['CRM Pipelines', 'Automation', 'Lead Routing', 'Workflows'],
    serviceTypeValue: 'Custom CRM Setup',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'live-website-project',
    title: 'Live Website Project',
    tag: 'Web Dev / GitHub',
    category: 'web',
    summary: 'High-performance interactive web application built with modern React, Tailwind CSS, and GitHub versioning.',
    description: 'A fully responsive, production-ready web platform demonstrating clean semantic HTML, modular component architecture, dark-mode styling, and seamless interaction states. Features sub-second initial load, accessible keyboard navigation, and live deployment.',
    badge: 'Featured Live Project',
    highlights: [
      '100/100 Lighthouse Performance rating on mobile & desktop',
      'Modular TypeScript architecture with zero runtime bloat',
      'Continuous deployment pipeline hooked directly to GitHub',
      'Accessible semantic structure with full WCAG AA contrast',
    ],
    githubUrl: 'https://github.com/dhruvrajiv843-droid/modern-web-platform',
    liveDemoUrl: 'https://ais-dev-dht2qxzsh2k6dd263kaf2s-326094760700.asia-southeast1.run.app',
    metrics: [
      { label: 'Load Time', value: '< 0.4s' },
      { label: 'Responsive', value: '100% Mobile' },
      { label: 'Architecture', value: 'Clean TypeScript' },
    ],
  },
  {
    id: 'ai-video-reels-campaign',
    title: 'AI Video & Reels Campaign',
    tag: 'AI Media',
    category: 'ai-media',
    summary: 'Viral social media reel package engineered with generative AI video models and studio-quality vocal synthesis.',
    description: 'Complete multi-part short-form video campaign created for high-retention brand discovery. Combines prompt-engineered photorealistic video clips, soundscape design, kinetic captions, and rhythmic pacing tested for Instagram and YouTube algorithms.',
    badge: 'AI Media Production',
    highlights: [
      'Prompt-crafted visual consistency across 5 dynamic scenes',
      'Custom emotional cadence AI voiceover sync',
      'Tested 85%+ retention curve through first 3 seconds',
      'Exported in 4K 60fps ProRes & optimized H.264 vertical',
    ],
    githubUrl: 'https://github.com/dhruvrajiv843-droid/ai-video-workflow',
    liveDemoUrl: '#showcase-video',
    metrics: [
      { label: 'Aspect Ratio', value: '9:16 Vertical & 16:9' },
      { label: 'AI Voice Sync', value: 'Pixel-Accurate' },
      { label: 'Production Time', value: '24h Delivery' },
    ],
  },
  {
    id: 'custom-crm-workflow',
    title: 'Custom CRM Workflow',
    tag: 'Automation',
    category: 'automation',
    summary: 'Automated client acquisition & lead triage pipeline built for freelance agencies and service businesses.',
    description: 'An integrated CRM automation workflow that connects inbound website leads to structured Kanban deal boards. Automatically calculates deal priority, sends instant acknowledgment emails, and notifies team members on Discord or WhatsApp.',
    badge: 'Business Automation',
    highlights: [
      'Automated lead intake from web forms with spam detection',
      'Zero manual entry: auto-creates contact card and deal stage',
      'Instant SMS/Email notification on high-value inbound requests',
      'Visual Kanban board with revenue tracking metrics',
    ],
    githubUrl: 'https://github.com/dhruvrajiv843-droid/crm-automation-pipeline',
    liveDemoUrl: '#showcase-crm',
    metrics: [
      { label: 'Time Saved', value: '~12 hrs/week' },
      { label: 'Lead Response', value: '< 60 seconds' },
      { label: 'Pipeline Stages', value: '5-Stage Kanban' },
    ],
  },
];
