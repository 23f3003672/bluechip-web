/**
 * Mock data — replace each export with a Supabase fetch when the DB is ready.
 * Kept in one file so the migration surface is small and obvious.
 */

/* ─── Hero Stats ─────────────────────────────────────────────────── */
export interface HeroStat {
  value: string;
  label: string;
}

export const HERO_STATS: HeroStat[] = [
  { value: "25+", label: "Years of Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "150+", label: "Clients Served" },
  { value: "20+", label: "States Covered" },
];

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  location: string;
  imageUrl: string;
  /** YouTube embed URL (or any iframe-safe video URL). */
  videoEmbedUrl: string;
  projectHref: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-1",
    eyebrow: "EPC Infrastructure",
    title: "Engineering Infrastructure That Endures.",
    location: "Anand-Nadiad Bullet Train Station, Gujarat, India",
    imageUrl: "/home/hero/hero-image-1.webp",
    videoEmbedUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?rel=0",
    projectHref: "/projects",
  },
  {
    id: "hero-2",
    eyebrow: "Industrial Complex",
    title: "Civil Construction Built for Scale and Speed.",
    location: "Integrated Steel Plant, Jharkhand, India",
    imageUrl: "/home/hero/hero-image-2.webp",
    videoEmbedUrl: "https://www.youtube.com/embed/jNQXAC9IVRw?rel=0",
    projectHref: "/projects",
  },
  {
    id: "hero-3",
    eyebrow: "Water Infrastructure",
    title: "Mission-Critical Utilities, Delivered Reliably.",
    location: "Metro Water Treatment Plant, Hyderabad, India",
    imageUrl: "/home/hero/hero-image-3.webp",
    videoEmbedUrl: "https://www.youtube.com/embed/M7lc1UVf-VE?rel=0",
    projectHref: "/projects",
  },
  {
    id: "hero-4",
    eyebrow: "Logistics Infrastructure",
    title: "Large-Format Development with Precision Execution.",
    location: "Multimodal Logistics Hub, Pune, India",
    imageUrl: "/home/hero/hero-image-4.webp",
    videoEmbedUrl: "https://www.youtube.com/embed/e-ORhEE9VVg?rel=0",
    projectHref: "/projects",
  },
  {
    id: "hero-5",
    eyebrow: "Institutional Works",
    title: "Complex Structural Packages, Delivered On Time.",
    location: "Medical Research Campus, Bhopal, India",
    imageUrl: "/home/hero/hero-image-5.webp",
    videoEmbedUrl: "https://www.youtube.com/embed/tgbNymZ7vqY?rel=0",
    projectHref: "/projects",
  },
  {
    id: "hero-6",
    eyebrow: "Transportation",
    title: "Future-Ready Corridors for Growing Regions.",
    location: "Highway Expansion Package, Rajasthan, India",
    imageUrl: "/home/hero/hero-image-6.webp",
    videoEmbedUrl: "https://www.youtube.com/embed/kXYiU_JCYtU?rel=0",
    projectHref: "/projects",
  },
];

/* ─── Services ───────────────────────────────────────────────────── */
export interface MockService {
  id: string;
  title: string;
  /** Lucide icon component name */
  icon: string;
  description: string;
  href: string;
}

export const MOCK_SERVICES: MockService[] = [
  {
    id: "1",
    title: "Civil Engineering",
    icon: "Building2",
    description:
      "Comprehensive site development, earthworks, foundations, and drainage systems built to IS standards.",
    href: "/services",
  },
  {
    id: "2",
    title: "Structural Works",
    icon: "Layers",
    description:
      "Precision-engineered structural frameworks for commercial, industrial, and infrastructure projects.",
    href: "/services",
  },
  {
    id: "3",
    title: "Industrial Projects",
    icon: "Factory",
    description:
      "End-to-end project execution for manufacturing plants, warehouses, and heavy industrial facilities.",
    href: "/services",
  },
  {
    id: "4",
    title: "Road & Highway",
    icon: "Route",
    description:
      "High-quality road construction and maintenance aligned with NHAI and state highway standards.",
    href: "/services",
  },
  {
    id: "5",
    title: "Water Infrastructure",
    icon: "Droplets",
    description:
      "Design and construction of treatment plants, pipelines, dams, and large-scale irrigation systems.",
    href: "/services",
  },
  {
    id: "6",
    title: "Project Management",
    icon: "ClipboardList",
    description:
      "Dedicated PMC ensuring on-time, within-budget delivery with rigorous quality and safety standards.",
    href: "/services",
  },
];

/* ─── Homepage Service Grid (Design v2) ─────────────────────────── */
export interface HomeService {
  id: string;
  title: string;
  icon: string;
  description: string;
  imageUrl?: string;
}

export const HOME_SERVICES: HomeService[] = [
  {
    id: "1",
    title: "EPC",
    icon: "Building2",
    description: "End-to-End turnkey solutions",
    imageUrl: "/home/what-we-do/epc.png",
  },
  {
    id: "2",
    title: "Civil Construction",
    icon: "Construction",
    description: "Building structures that last",
    imageUrl: "/home/what-we-do/civil.png",
  },
  {
    id: "3",
    title: "Mechanical Works",
    icon: "Wrench",
    description: "Advanced engineering solutions",
    imageUrl: "/home/what-we-do/mechanical.png",
  },
  {
    id: "4",
    title: "Facade Engineering",
    icon: "Building",
    description: "Innovative exterior systems",
    imageUrl: "/home/what-we-do/facade.png",
  },
];

/* ─── Trusted Brands Strip ───────────────────────────────────────── */
export interface TrustedBrand {
  id: string;
  name: string;
  /** Path to logo image in `public/` */
  imageUrl?: string;
}

export const TRUSTED_BRANDS: TrustedBrand[] = [
  { id: "1", name: "Bharat Petroleum", imageUrl: "/home/logos/bpcl.webp" },
  { id: "2", name: "Essar", imageUrl: "/home/logos/Essar-logo.webp" },
  { id: "3", name: "Larsen & Toubro", imageUrl: "/home/logos/L&T-logo.webp" },
  { id: "4", name: "Indiabulls Real Estate", imageUrl: "/home/logos/ibre.webp" },
  { id: "5", name: "Aditya Birla Group", imageUrl: "/home/logos/aditya-birla.webp" },
  { id: "6", name: "Garud Gandhinagar", imageUrl: "/home/logos/garud-gandhinagar-logo.webp" },
  { id: "7", name: "Airports Authority of India", imageUrl: "/home/logos/aai.webp" },
  { id: "8", name: "Oil and Natural Gas Corporation", imageUrl: "/home/logos/ongc.webp" },

];

/* ─── Journey Timeline ───────────────────────────────────────────── */
export interface JourneyMilestone {
  id: string;
  title: string;
  imageUrl: string;
}

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: "1",
    title: "Commercial Tower",
    imageUrl:
      "/home/about/home-about-1.webp",
  },
  {
    id: "2",
    title: "Corporate Campus",
    imageUrl:
      "/home/about/home-about-2.webp",
  },
  {
    id: "3",
    title: "Office Block",
    imageUrl:
      "/home/about/home-about-3.webp",
  },
  {
    id: "4",
    title: "Industrial Portico",
    imageUrl:
      "/home/about/home-about-4.webp",
  },
];

/* ─── About Page Intro Stats ─────────────────────────────────────── */
export interface AboutStat {
  id: string;
  label: string;
  value: string;
}

export const ABOUT_STATS: AboutStat[] = [
  { id: "1", label: "years of experience", value: "20+" },
  { id: "2", label: "major projects", value: "100+" },
  { id: "3", label: "nationwide presence", value: "Pan-India" },
  { id: "4", label: "skilled professionals", value: "350+" },
];

/* ─── About Visionaries ──────────────────────────────────────────── */
export interface AboutVisionary {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export const ABOUT_VISIONARIES: AboutVisionary[] = [
  {
    id: "1",
    name: "Mr. Dimple Shah",
    role: "Founder & Owner",
    bio: "Mr. Dimple is a civil engineer and entrepreneur with 30+ years of experience in innovative construction solutions.",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "2",
    name: "Mr. Rajiv Mehta",
    role: "Director - Projects",
    bio: "Leads high-value infrastructure programs with a delivery-first approach.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "3",
    name: "Ms. Aanya Patel",
    role: "Director - Operations",
    bio: "Builds scalable systems for quality, planning, and execution discipline.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "4",
    name: "Mr. Aman Kapoor",
    role: "Head - Engineering",
    bio: "Drives technical excellence across civil, facade, and mechanical delivery.",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80",
  },
];

/* ─── About MVM Interactive Block ────────────────────────────────── */
export interface AboutMvmItem {
  id: "mission" | "vision" | "values";
  eyebrow: string;
  title: string;
  description: string;
  cardTitle: string;
  cardCaption: string;
  cardImage: string;
  secondaryImage: string;
}

export const ABOUT_MVM_ITEMS: AboutMvmItem[] = [
  {
    id: "mission",
    eyebrow: "Our mission",
    title: "Delivering with Precision",
    description:
      "To provide precision-driven and sustainable solutions that empower our clients to grow with confidence. Through excellence in execution, advanced technology integration, and an unwavering commitment to safety and quality, we build projects designed to endure and perform.",
    cardTitle: "Toolbox & Safety Briefing",
    cardCaption:
      "Driving excellence through proactive safety discussions and disciplined on-site leadership.",
    cardImage:
      "/about/about-mission-1.webp",
    secondaryImage:
      "/about/about-mission-2.webp",
  },
  {
    id: "vision",
    eyebrow: "Our vision",
    title: "Driving the future with purpose",
    description:
      "To become a globally trusted leader in engineering and technology solutions, shaping a smarter and more sustainable future. We envision transforming industries through intelligent systems, forward-thinking innovation, and responsible practices that create lasting impact.",
    cardTitle: "Sustainable construction",
    cardCaption: "Building for a greener tomorrow.",
    cardImage:
      "/about/about-vision-1.webp",
    secondaryImage:
      "/about/about-vision-2.webp",
  },
  {
    id: "values",
    eyebrow: "Our values",
    title: "Built on strong principles",
    description:
      "Our foundation is rooted in integrity, innovation, excellence, safety, and sustainability. We believe in transparent partnerships, continuous improvement, and responsible growth, ensuring that every decision reflects accountability, trust, and long-term value.",
    cardTitle: "Innovation in every step",
    cardCaption:
      "Innovating with advanced steel solutions that reflect our adaptability, integrity, and commitment to precision.",
    cardImage:
      "/about/about-values-1.webp",
    secondaryImage:
      "/about/about-values-2.webp",
  },
];

/* ─── About Strengths Grid ───────────────────────────────────────── */
export interface AboutStrength {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const ABOUT_STRENGTHS: AboutStrength[] = [
  {
    id: "1",
    number: "01",
    title: "Integrated Engineering Expertise",
    description:
      "End-to-end civil, mechanical, facade, and EPC capabilities under one roof.",
  },
  {
    id: "2",
    number: "02",
    title: "Proven Project Execution",
    description:
      "Timely delivery with precision planning, cost control, and operational efficiency.",
  },
  {
    id: "3",
    number: "03",
    title: "Innovation-Driven Approach",
    description:
      "Adoption of advanced construction technologies and optimized methodologies.",
  },
  {
    id: "4",
    number: "04",
    title: "Quality & Safety Excellence",
    description:
      "Strict compliance standards with zero-compromise quality and safety protocols.",
  },
  {
    id: "5",
    number: "05",
    title: "Skilled Technical Workforce",
    description:
      "Experienced engineers, project managers, and site specialists driving performance.",
  },
  {
    id: "6",
    number: "06",
    title: "Client-Centric Solutions",
    description:
      "Customised engineering solutions focused on long-term value creation.",
  },
];

/* ─── Featured Projects ──────────────────────────────────────────── */
export interface MockProject {
  id: string;
  title: string;
  category: string;
  location: string;
  year: number;
  excerpt: string;
  slug: string;
  /** Hex used for the image placeholder background */
  placeholderColor: string;
}

export const MOCK_PROJECTS: MockProject[] = [
  {
    id: "1",
    title: "National Highway 48 — Four-Laning",
    category: "Road & Highway",
    location: "Rajasthan, India",
    year: 2024,
    excerpt:
      "Four-laning of a 120 km stretch of NH-48 with full drainage, service roads, and safety infrastructure.",
    slug: "nh48-four-laning",
    placeholderColor: "#1a3f6f",
  },
  {
    id: "2",
    title: "Integrated Steel Complex — Civil Works",
    category: "Industrial Projects",
    location: "Jharkhand, India",
    year: 2023,
    excerpt:
      "Civil and structural works for a 40-acre integrated steel manufacturing facility built to NFPA standards.",
    slug: "steel-complex-jharkhand",
    placeholderColor: "#2d5a3d",
  },
  {
    id: "3",
    title: "Metro Water Treatment Plant",
    category: "Water Infrastructure",
    location: "Hyderabad, India",
    year: 2023,
    excerpt:
      "180 MLD capacity water treatment plant with advanced filtration, clear-water storage, and distribution network.",
    slug: "metro-water-treatment",
    placeholderColor: "#1a4f70",
  },
  {
    id: "4",
    title: "Greenfield Multimodal Logistics Hub",
    category: "Civil Engineering",
    location: "Pune, India",
    year: 2022,
    excerpt:
      "Complete site development and civil works for a 25-acre logistics park with rail and road connectivity.",
    slug: "greenfield-logistics-pune",
    placeholderColor: "#4a2d1a",
  },
  {
    id: "5",
    title: "AIIMS New Campus — Structural Package",
    category: "Structural Works",
    location: "Bhopal, India",
    year: 2022,
    excerpt:
      "Structural works for OPD block, ward buildings, and research facilities of the new AIIMS campus.",
    slug: "aiims-bhopal-structural",
    placeholderColor: "#3a1a5a",
  },
  {
    id: "6",
    title: "Narmada Basin Irrigation Project",
    category: "Water Infrastructure",
    location: "Madhya Pradesh, India",
    year: 2021,
    excerpt:
      "Canal network and field distribution system spanning 85,000 hectares of agricultural land across 3 districts.",
    slug: "narmada-irrigation",
    placeholderColor: "#1a4a5a",
  },
];

/* ─── FAQs ───────────────────────────────────────────────────────── */
export interface MockFaq {
  id: string;
  question: string;
  answer: string;
}

export const MOCK_FAQS: MockFaq[] = [
  {
    id: "1",
    question: "Do you offer end-to-end EPC solutions?",
    answer:
      "Yes. BlueChip delivers end-to-end EPC solutions from design coordination and procurement to execution and commissioning.",
  },
  {
    id: "2",
    question: "What sectors does BlueChip specialise in?",
    answer:
      "BlueChip specializes in commercial, industrial, residential, and infrastructure sectors.",
  },
  {
    id: "3",
    question: "How do you ensure quality and timelines?",
    answer:
      "We follow milestone-based planning, dedicated QA checks, and continuous site supervision to maintain quality and schedule adherence.",
  },
  {
    id: "4",
    question: "Can BlueChip handle large-scale infrastructure projects?",
    answer:
      "Yes. Our teams are equipped for complex, large-format projects with strong planning, execution bandwidth, and experienced technical leadership.",
  },
  {
    id: "5",
    question: "How can we initiate the project discussion?",
    answer:
      "Share your requirement through our contact form or call us directly, and our team will set up a project consultation quickly.",
  },
];

/* ─── Journey / Projects Timeline Page ──────────────────────────── */
export type JourneyPhase = "recent" | "expansion" | "foundation";

export interface JourneyProject {
  id: string;
  slug: string;
  title: string;
  locationYear: string;
  summary: string;
  category: string;
  projectType: string;
  phase: JourneyPhase;
  thumbnailUrl: string;
  heroImageUrl: string;
}

export const JOURNEY_PROJECTS: JourneyProject[] = [
  {
    id: "jp-1",
    slug: "surat-diamond-association",
    title: "Surat Diamond Association",
    locationYear: "Surat, 2025",
    summary:
      "What began as a commitment to honest craftsmanship has grown into a company shaped by responsibility and trust.",
    category: "Civil Construction",
    projectType: "Commercial Building",
    phase: "recent",
    thumbnailUrl: "/home/projects/home-project-airport.webp",
    heroImageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "jp-2",
    slug: "hotel-leela",
    title: "Hotel Leela",
    locationYear: "Ahmedabad, 2017",
    summary:
      "Premium hospitality infrastructure delivered with precision engineering and elevated facade quality.",
    category: "Civil Construction",
    projectType: "Hospitality",
    phase: "foundation",
    thumbnailUrl: "/home/projects/home-project-oil.webp",
    heroImageUrl:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "jp-3",
    slug: "one-indiabulls-park",
    title: "One Indiabulls Park",
    locationYear: "Mumbai, 2021",
    summary:
      "A large-format office campus delivered for high-capacity occupancy and urban business operations.",
    category: "EPC",
    projectType: "Corporate Campus",
    phase: "expansion",
    thumbnailUrl: "/home/projects/home-projects-school.webp",
    heroImageUrl:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "jp-4",
    slug: "steel-innovation-center",
    title: "Steel Innovation Center",
    locationYear: "Vadodara, 2019",
    summary:
      "Industrial framework and steel-intensive package completed with phased commissioning.",
    category: "Mechanical Works",
    projectType: "Industrial Facility",
    phase: "expansion",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1596079890701-dd42edf0b7d4?auto=format&fit=crop&w=700&q=80",
    heroImageUrl:
      "https://images.unsplash.com/photo-1596079890701-dd42edf0b7d4?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "jp-5",
    slug: "airport-terminal-package",
    title: "Airport Terminal Package",
    locationYear: "Surat, 2015",
    summary:
      "Passenger terminal civil package executed with strict quality and timeline controls.",
    category: "Facade Engineering",
    projectType: "Transport Infrastructure",
    phase: "foundation",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=700&q=80",
    heroImageUrl:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "jp-6",
    slug: "manufacturing-utility-corridor",
    title: "Manufacturing Utility Corridor",
    locationYear: "Bharuch, 2012",
    summary:
      "Utility backbone and process-support infrastructure for a multi-block manufacturing campus.",
    category: "EPC",
    projectType: "Industrial Infrastructure",
    phase: "foundation",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=700&q=80",
    heroImageUrl:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "jp-7",
    slug: "institutional-academic-block",
    title: "Institutional Academic Block",
    locationYear: "Pune, 2023",
    summary:
      "An institutional complex planned for adaptable usage, daylight efficiency, and long-term durability.",
    category: "Civil Construction",
    projectType: "Institutional Building",
    phase: "recent",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80",
    heroImageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "jp-8",
    slug: "smart-logistics-hub",
    title: "Smart Logistics Hub",
    locationYear: "Nagpur, 2024",
    summary:
      "Integrated logistics infrastructure with optimized movement corridors and scalable utility systems.",
    category: "EPC",
    projectType: "Logistics Infrastructure",
    phase: "recent",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=700&q=80",
    heroImageUrl:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80",
  },
];

export const JOURNEY_PHASE_LABELS: Record<JourneyPhase, string> = {
  recent: "Recent Projects",
  expansion: "Expansion Phase",
  foundation: "Foundation Projects",
};

/* ─── Recognitions Page ──────────────────────────────────────────── */
export type RecognitionCategory =
  | "international"
  | "industry-awards"
  | "infrastructure"
  | "manufacturing"
  | "media";

export interface RecognitionItem {
  id: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
  category: RecognitionCategory;
  organisedBy: string;
  emblemImageUrl: string;
}

export const RECOGNITION_CATEGORY_LABELS: Record<RecognitionCategory, string> = {
  international: "International",
  "industry-awards": "Industry Awards",
  infrastructure: "Infrastructure",
  manufacturing: "Manufacturing",
  media: "Media",
};

export const RECOGNITIONS: RecognitionItem[] = [
  {
    id: "r-1",
    title: "Bluechip Technologies",
    subtitle: "Cross-Country Managerial",
    categoryLabel: "International Technic Collaboration",
    category: "international",
    organisedBy: "Federal Ministry of Germany",
    emblemImageUrl:
      "https://images.unsplash.com/photo-1611273426858-4506f1d5b387?auto=format&fit=crop&w=520&q=80",
  },
  {
    id: "r-2",
    title: "Bluechip Technologies",
    subtitle: "Selected Delegate",
    categoryLabel: "Technology & Innovative Leadership",
    category: "international",
    organisedBy: "FICCI",
    emblemImageUrl:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=520&q=80",
  },
  {
    id: "r-3",
    title: "Bluechip Technologies",
    subtitle: "Official FICCI Delegate",
    categoryLabel: "International Technology Exchange",
    category: "international",
    organisedBy: "China",
    emblemImageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=520&q=80",
  },
  {
    id: "r-4",
    title: "Bluechip Technologies",
    subtitle: "Cross-Country Managerial",
    categoryLabel: "International Technic Collaboration",
    category: "industry-awards",
    organisedBy: "Federal Ministry of Germany",
    emblemImageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=520&q=80",
  },
  {
    id: "r-5",
    title: "Bluechip Technologies",
    subtitle: "Cross-Country Managerial",
    categoryLabel: "International Technic Collaboration",
    category: "infrastructure",
    organisedBy: "Federal Ministry of Germany",
    emblemImageUrl:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=520&q=80",
  },
  {
    id: "r-6",
    title: "Bluechip Technologies",
    subtitle: "Cross-Country Managerial",
    categoryLabel: "International Technic Collaboration",
    category: "infrastructure",
    organisedBy: "Federal Ministry of Germany",
    emblemImageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=520&q=80",
  },
  {
    id: "r-7",
    title: "Bluechip Technologies",
    subtitle: "Industrial Technology Delegate",
    categoryLabel: "Advanced Manufacturing Collaboration",
    category: "manufacturing",
    organisedBy: "Global Manufacturing Forum",
    emblemImageUrl:
      "https://images.unsplash.com/photo-1561489396-888724a1543d?auto=format&fit=crop&w=520&q=80",
  },
  {
    id: "r-8",
    title: "Bluechip Technologies",
    subtitle: "Media Feature Award",
    categoryLabel: "Construction Leadership Spotlight",
    category: "media",
    organisedBy: "Infrastructure Media Council",
    emblemImageUrl:
      "https://images.unsplash.com/photo-1560523159-4a9692d222f9?auto=format&fit=crop&w=520&q=80",
  },
];

/* ─── Media Page ─────────────────────────────────────────────────── */

export type MediaCompositionType = "image" | "text";

export interface MediaGalleryItem {
  id: string;
  slug: string;
  type: MediaCompositionType;

  title?: string;
  excerpt?: string;
  recordedYear?: number;

  imageUrl?: string;
  imageAlt?: string;
}

/* -------------------------------------------------------------------------- */
/*                             MEDIA COMPOSITION                              */
/* -------------------------------------------------------------------------- */

export const MEDIA_GALLERY_ITEMS: MediaGalleryItem[] = [
  /* ======================================================================== */
  /*                              IMAGE BLOCKS                                */
  /* ======================================================================== */

  /* 1 — TOP CENTER MEDIUM */

  {
    id: "img-1",
    slug: "germany-visit-top",
    type: "image",
    imageUrl: "/about/about-values-2.webp",
    imageAlt: "Germany delegation meeting",
  },

  /* 2 — CENTER LEFT LARGE */

  {
    id: "img-2",
    slug: "germany-visit-left-main",
    type: "image",
    imageUrl: "/about/about-vision-2.webp",
    imageAlt: "Germany architecture collaboration",
  },

  /* 3 — CENTER RIGHT LARGE */

  {
    id: "img-3",
    slug: "germany-visit-right-main",
    type: "image",
    imageUrl: "/about/about-mission-1.webp",
    imageAlt: "Official Germany certification ceremony",
  },

  /* 4 — LEFT TOP SMALL */

  {
    id: "img-4",
    slug: "germany-visit-left-small",
    type: "image",
    imageUrl: "/about/about-mission-2.webp",
    imageAlt: "Delegation discussion session",
  },

  /* 5 — LEFT BOTTOM LARGE */

  {
    id: "img-5",
    slug: "germany-visit-award",
    type: "image",
    imageUrl: "/about/about-values-1.webp",
    imageAlt: "Award ceremony recognition",
  },

  /* 6 — RIGHT TOP MEDIUM */

  {
    id: "img-6",
    slug: "germany-visit-right-medium",
    type: "image",
    imageUrl: "/about/about-values-2.webp",
    imageAlt: "Germany infrastructure visit",
  },

  /* 7 — RIGHT BOTTOM SMALL */

  {
    id: "img-7",
    slug: "germany-visit-office",
    type: "image",
    imageUrl: "/about/about-vision-2.webp",
    imageAlt: "Office collaboration session",
  },

  /* 8 — BOTTOM CENTER MEDIUM */

  {
    id: "img-8",
    slug: "germany-visit-bottom",
    type: "image",
    imageUrl: "/about/about-vision-2.webp",
    imageAlt: "Business partnership meeting",
  },

  /* ======================================================================== */
  /*                               TEXT BLOCKS                                */
  /* ======================================================================== */

  {
    id: "text-1",
    slug: "germany-visit-top",
    type: "text",
    title: "Germany Visit",
    excerpt:
      "To provide precision-driven and sustainable solutions that empower our clients to grow with confidence.",
    recordedYear: 2002,
  },

  {
    id: "text-2",
    slug: "germany-visit-left-main",
    type: "text",
    title: "Germany Visit",
    excerpt:
      "Global engineering partnerships enabling scalable innovation and infrastructure excellence.",
    recordedYear: 2002,
  },

  {
    id: "text-3",
    slug: "germany-visit-right-main",
    type: "text",
    title: "Germany Visit",
    excerpt:
      "Collaborative international engagements focused on certification and operational leadership.",
    recordedYear: 2002,
  },

  {
    id: "text-4",
    slug: "germany-visit-left-small",
    type: "text",
    title: "Germany Visit",
    excerpt:
      "Strategic delegation meetings discussing sustainable engineering solutions and execution.",
    recordedYear: 2002,
  },

  {
    id: "text-5",
    slug: "germany-visit-award",
    type: "text",
    title: "Germany Visit",
    excerpt:
      "Recognition moments celebrating project excellence and long-term international collaboration.",
    recordedYear: 2002,
  },

  {
    id: "text-6",
    slug: "germany-visit-right-medium",
    type: "text",
    title: "Germany Visit",
    excerpt:
      "Infrastructure walkthroughs and global exchange sessions focused on innovation systems.",
    recordedYear: 2002,
  },

  {
    id: "text-7",
    slug: "germany-visit-office",
    type: "text",
    title: "Germany Visit",
    excerpt:
      "Collaborative office interactions strengthening strategic partnerships and technology exchange.",
    recordedYear: 2002,
  },

  {
    id: "text-8",
    slug: "germany-visit-bottom",
    type: "text",
    title: "Germany Visit",
    excerpt:
      "Business partnership engagements supporting resilient and future-ready engineering growth.",
    recordedYear: 2002,
  },
];