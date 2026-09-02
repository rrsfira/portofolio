import {
  Code2,
  Figma,
  Github,
  Database,
  GitBranch,
  Globe2,
  Layers3,
  Palette,
  Server,
  Send,
  CodeXml,
  Workflow,
  Smartphone
} from "lucide-react";

export const profile = {
  name: "Reihan Rachma Shafira",
  role: "Fullstack Developer",
  location: "Surabaya, ID",
  email: "reihanrachmashafira@gmail.com",
  bio:
    "I develop web applications that are functional, responsive, and designed to provide an optimal user experience.",
  statement:
    "I combine technology and design to build intuitive, interactive, and maintainable interfaces."
};

export const skills = [
  { name: "React.js", icon: Code2 },
  { name: "Next.js", icon: Globe2 },
  { name: "Tailwind", icon: Palette },
  { name: "HTML & CSS", icon: Code2 },
  { name: "JavaScript", icon: Code2 },
  { name: "Node.js", icon: Server },
  { name: "PHP", icon: Code2 },
  { name: "Laravel", icon: Code2 },
  { name: "Python", icon: Code2 },
  { name: "Figma", icon: Figma },
  { name: "REST API", icon: Globe2 },
  { name: "Postman", icon: Send },
  { name: "MySQL", icon: Database },
  { name: "Git", icon: GitBranch },
  { name: "GitHub", icon: Github },
  { name: "UML", icon: Workflow },
];

export const projects = [
  {
    name: "Medical Equipment Store",
    year: "2024",
    description: "A cinematic portfolio system for a distributed creative team.",
    tech: ["React.js", "Node.js", "MySQL"],
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80",
    live: "#",
    source: "#"
  },
  {
    name: "Point of Sale (POS)",
    year: "2024",
    description: "Operational dashboard with dense data, calm states, and fast filters.",
    tech: ["React.js", "Tailwind CSS", "Figma"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    live: "#",
    source: "#"
  },
  {
    name: "Siaga Surabaya",
    year: "2025",
    description: "Premium storefront concept with editorial product storytelling.",
    tech: ["React.js", "Node.js", "MySQL", "Pentaho Data Integration", "Charts"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    live: "#",
    source: "#"
  },
  {
    name: "SIMPEG",
    year: "2026",
    description: "Premium storefront concept with editorial product storytelling.",
    tech: ["Next.js", "Tailwind", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    live: "#",
    source: "#"
  }
];


export const experiences = [
  {
    year: "2026",
    title: "Independent Creative Developer",
    organization: "Remote",
    description: "Designing and building interactive websites, product prototypes, and design systems."
  },
  {
    year: "2024",
    title: "Front-End Engineer",
    organization: "Pixel Foundry",
    description: "Led motion-rich UI implementation for SaaS dashboards and launch websites."
  },
  {
    year: "2022",
    title: "UI Designer",
    organization: "Studio North",
    description: "Created visual systems, wireframes, and high-fidelity web experiences for early-stage brands."
  }
];

export const socials = [
  { label: "GitHub", href: "https://github.com/rrsfira", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/reihan-rachma-shafira-1868861b8", icon: Globe2 },
  { label: "Instagram", href: "https://www.instagram.com/rrsfira31", icon: Smartphone }
];
