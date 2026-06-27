// Central site configuration. Edit this file to update nav, sponsors,
// leadership, and the annual meeting details. No component changes needed.

export const siteConfig = {
  name: "Texas Society of Nephrology",
  shortName: "TxSN",
  tagline: "Education · Advocacy · Community",
  description:
    "The professional home for kidney care professionals across Texas, advancing patient care, education, and the future of nephrology.",
  email: "info@txsn.org",
  social: {
    linkedin: "https://www.linkedin.com/",
    x: "https://x.com/",
  },
};

export type NavChild = { label: string; href: string; phase: number };
export type NavItem = {
  label: string;
  href: string;
  phase: number;
  children?: NavChild[];
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/", phase: 1 },
  {
    label: "About",
    href: "/about",
    phase: 1,
    children: [
      { label: "Our Mission", href: "/about", phase: 1 },
      { label: "Leadership", href: "/about/leadership", phase: 1 },
      { label: "Corporate Partners", href: "/about/corporate-partners", phase: 1 },
      { label: "Contact", href: "/contact", phase: 1 },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    phase: 1,
    children: [
      { label: "Why Join", href: "/membership", phase: 1 },
      { label: "Membership Tiers", href: "/membership/tiers", phase: 1 },
      { label: "Join / Renew", href: "/membership/join", phase: 2 },
    ],
  },
  {
    label: "Annual Meeting",
    href: "/annual-meeting",
    phase: 1,
    children: [
      { label: "Overview", href: "/annual-meeting", phase: 1 },
      { label: "Schedule", href: "/annual-meeting/schedule", phase: 1 },
      { label: "Abstract Submission", href: "/annual-meeting/abstracts", phase: 1 },
      { label: "Register", href: "/annual-meeting/register", phase: 3 },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    phase: 1,
    children: [
      { label: "Clinical Resources", href: "/resources/clinical", phase: 1 },
      { label: "Education & CME", href: "/resources/education", phase: 1 },
      { label: "Member Resources", href: "/resources/member", phase: 2 },
      { label: "Careers", href: "/careers", phase: 1 },
      { label: "News", href: "/news", phase: 1 },
    ],
  },
  { label: "All Events", href: "/events", phase: 1 },
];

export const pillars = [
  {
    icon: "school",
    title: "Education",
    body: "Annual meetings, webinars, and CME that keep you current with evolving nephrology practice.",
    accent: "teal" as const,
  },
  {
    icon: "speakerphone",
    title: "Advocacy",
    body: "A unified voice on the legislative, payer, and regulatory issues shaping kidney care in Texas.",
    accent: "gold" as const,
  },
  {
    icon: "users",
    title: "Community",
    body: "Mentorship and connection for fellows, trainees, and practicing peers across the state.",
    accent: "gold" as const,
  },
  {
    icon: "research",
    title: "Research",
    body: "Abstract submission and a statewide platform to present and discuss your work.",
    accent: "teal" as const,
  },
];

export const leadership = [
  { name: "President", role: "Board President", focus: "Strategic direction & advocacy" },
  { name: "Vice President", role: "Board Vice President", focus: "Membership & education" },
  { name: "Secretary", role: "Board Secretary", focus: "Governance & records" },
  { name: "Treasurer", role: "Board Treasurer", focus: "Finance & sponsorship" },
];

// All corporate partners are presented equally for now (no tier distinction).
export const corporatePartners = [
  { name: "Partner One" },
  { name: "Partner Two" },
  { name: "Partner Three" },
  { name: "Partner Four" },
];

export const membershipTiers = [
  {
    name: "Trainee",
    price: "Reduced",
    audience: "Fellows & residents in training",
    features: [
      "Discounted annual meeting registration",
      "Access to member resources",
      "Mentorship & networking",
      "CME and education opportunities",
    ],
  },
  {
    name: "Full",
    price: "Standard",
    audience: "Practicing physicians & clinicians",
    features: [
      "All trainee benefits",
      "Member directory listing",
      "Discounted event pricing statewide",
      "A voice in society advocacy",
    ],
    featured: true,
  },
];

export const annualMeeting = {
  title: "2026 Annual Meeting",
  blurb:
    "Registration is free. Review the program schedule below and register through the intake form.",
  eventName: "Annual Meeting at Hotel ZaZa Museum",
  summary:
    "A day of education, advocacy, abstracts, exhibitors, and statewide nephrology connection in Houston.",
  dateLabel: "Saturday, May 02, 2026",
  isoDate: "2026-05-02",
  timeLabel: "11:00 AM to 3:00 PM",
  location: "ZaZa Hotel Museum, 5701 Main Street, Houston, TX 77005",
  schedule: [
    { time: "10:00 AM – 11:00 AM", session: "Registration and arrival", track: "General" },
    { time: "11:00 AM – 11:15 AM", session: "Introduction – Dr. Farhad Danesh", track: "Plenary" },
    { time: "11:15 AM – 11:45 AM", session: "When the Kidneys Fail, the Brain Pays – Dr. Jochen Reiser", track: "Education" },
    { time: "11:45 AM – 12:15 PM", session: "Kidney Advocacy: Conversations That Matter – Dr. Samir Parikh", track: "Advocacy" },
    { time: "12:15 PM – 1:00 PM", session: "Lunch", track: "General" },
    { time: "1:00 PM – 1:30 PM", session: "Break with Exhibitors and Abstracts", track: "Research" },
    { time: "1:30 PM – 2:30 PM", session: "Treatment of IgAN in 2026 – Dr. Jonathan Barratt", track: "Education" },
    { time: "2:30 PM – 3:00 PM", session: "Networking and closing discussions", track: "General" },
  ],
};

export const callForAbstracts = {
  title: "Call for Abstracts",
  subtitle: "Texas Society of Nephrology Annual Meeting 2026",
  deadlineLabel: "Thursday, April 30th, 2026 by 12:00 PM",
  deadlineIso: "2026-04-30",
  categories: ["Basic Science", "Clinical/Translational Research", "Quality Improvement"],
  openTo:
    "Faculty, fellows, residents, students, physician assistants and advanced nurse practitioners",
  awards:
    "Prizes for Best Clinical Science and Best Basic Science (plus runner-ups)",
  formatRules: [
    "Arial or Times New Roman, 12 point",
    "Single-spaced, 1-inch margins",
    "Left justify all text",
    "One page text (excluding tables, figures, images)",
    "Must list corresponding authors (senior author last)",
    "File type: Word document",
  ],
  submitEmail: "research.txnephrology@gmail.com",
};
