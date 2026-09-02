export const siteConfig = {
  name: "TECHNAZ",
  tagline: "We Build Support & Scale your Technology",
  description:
    "Technaz provides UI design, SaaS development, QA & testing, app development, and project management for growing businesses.",
  url: "https://technaz.co.za",
  contact: {
    phone: "+27 68 649 7310",
    email: "hello@technaz.co.za",
    address: "123 Tech Avenue, Innovation District, Cape Town, South Africa",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61572552526162",
    instagram: "https://www.instagram.com/technaz_pty_ltd",
    linkedin: "https://www.linkedin.com/company/106670463",
  },
} as const;

export const marqueeItems = [
  "UI Design",
  "SaaS Development",
  "QA & Testing",
  "App Development",
  "Project Management",
] as const;

export const heroContent = {
  headline: "We Build Support & Scale your",
  highlight: "Technology",
  description:
    "We help businesses design, build, and scale modern digital products with expert teams, proven processes, and technology that delivers real results.",
  cta: "Connect With Us",
};

export const servicesSection = {
  title: "Services built around your business",
  subtitle:
    "Check our most popular services and let's work together to build your business.",
  items: [
    { title: "Web Development", label: "Web Development" },
    {
      title: "UI/UX Design",
      label: "UI/UX Design",
      description:
        "User-centered design that improves engagement, usability, and conversion across web and mobile products.",
      featured: true,
    },
    { title: "App Development", label: "App Development" },
    { title: "Cloud Solutions", label: "Cloud Solutions" },
  ],
};

export const expertiseSection = {
  title: "Our Expertise",
  description:
    "Our team brings deep experience in product strategy, software engineering, and design systems. We partner with you from concept to launch — and beyond — to build technology that scales with your business.",
  cta: "Learn More",
};

export const processSection = {
  title: "Our Process",
  description:
    "We start with discovery to understand your goals, then move through design, development, testing, and deployment. Our agile workflow keeps you involved at every stage with clear milestones and transparent communication.",
};

export const teamSection = {
  title: "Meet Our Team Members",
  members: [
    {
      name: "Malik Hamza Riaz",
      role: "Co-Founder | CEO",
    },
    {
      name: "Sarah Mitchell",
      role: "Head of HR",
    },
    {
      name: "James Chen",
      role: "Graphic & UI/UX Designer",
    },
  ],
};

export const faqSection = {
  title: "Questions we hear often?",
  items: [
    {
      question: "What services does Technaz offer?",
      answer:
        "We offer UI/UX design, SaaS development, QA & testing, app development, and project management — tailored to help your business grow with reliable, scalable technology.",
    },
    {
      question: "How quickly do you respond to items?",
      answer:
        "We typically respond within 24 hours on business days. For urgent requests, reach out via our contact form and we'll prioritize your inquiry.",
    },
    {
      question: "Do you work with startups and enterprises?",
      answer:
        "Yes. We work with startups, scale-ups, and enterprise teams looking to design, build, or improve digital products.",
    },
    {
      question: "What is your typical project timeline?",
      answer:
        "Timelines depend on scope and complexity. After discovery, we share a clear roadmap with milestones before development begins.",
    },
    {
      question: "How do we get started?",
      answer:
        "Fill out the contact form below or click Get a Quote. We'll schedule a call to understand your needs and recommend the best next steps.",
    },
  ],
};

export const contactSection = {
  title: "Ready to Discuss How We Can",
  titleHighlight: "Help Your Business Grow?",
  fields: {
    name: { label: "Name", placeholder: "Name" },
    email: { label: "Email", placeholder: "Email" },
    service: { label: "Select Service", placeholder: "Select Service" },
    message: { label: "Message", placeholder: "Message" },
  },
  services: [
    "UI/UX Design",
    "SaaS Development",
    "QA & Testing",
    "App Development",
    "Project Management",
  ],
  submit: "Submit",
};
