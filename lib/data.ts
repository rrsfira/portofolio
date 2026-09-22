import {
  Smartphone
} from "lucide-react";
import {
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaPhp,
  FaReact,
} from "react-icons/fa";
import {
  SiFigma,
  SiJavascript,
  SiMysql,
  SiPostman,
  SiTailwindcss,
  SiVite,
} from "react-icons/si";
import { Globe2 } from "lucide-react";

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
  { name: "React.js", icon: FaReact, accent: "#61dafb" },
  { name: "JavaScript", icon: SiJavascript, accent: "#f7df1e" },
  { name: "HTML", icon: FaHtml5, accent: "#e34f26" },
  { name: "CSS", icon: FaCss3Alt, accent: "#1572b6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, accent: "#06b6d4" },
  { name: "Git", icon: FaGitAlt, accent: "#f05032" },
  { name: "GitHub", icon: FaGithub, accent: "#24292f" },
  { name: "Figma", icon: SiFigma, accent: "#f24e1e" },
  { name: "REST API", icon: SiPostman, accent: "#ff6c37" },
  { name: "Vite", icon: SiVite, accent: "#646cff" },
  { name: "MySQL", icon: SiMysql, accent: "#4479a1" },
  { name: "PHP", icon: FaPhp, accent: "#777bb4" },
];

export const projects = [
  {
    name: "Medical Equipment Store",
    year: "2024",
    description: "A cinematic portfolio system for a distributed creative team.",
    tech: ["React.js", "Node.js", "MySQL"],
    image: "/TOKO.png",
    live: "#",
    source: "https://github.com/rrsfira/TokoKesehatan2.git"
  },
  {
    name: "Point of Sale (POS)",
    year: "2024",
    description: "Operational dashboard with dense data, calm states, and fast filters.",
    tech: ["React.js", "Tailwind CSS", "Figma"],
    image: "/OK.png",
    live: "#",
    source: "https://github.com/rrsfira/POS-INTERN.git"
  },
  {
    name: "Siaga Surabaya",
    year: "2025",
    description: "Premium storefront concept with editorial product storytelling.",
    tech: ["React.js", "Node.js", "MySQL", "Pentaho Data Integration", "Charts.js"],
    image: "/BPBD.png",
    live: "#",
    source: "https://github.com/rrsfira/Manajemen-Sosialisasi.git"
  },
  {
    name: "SIMPEG",
    year: "2026",
    description: "Premium storefront concept with editorial product storytelling.",
    tech: ["React.js", "Tailwind", "Figma", "Charts.js"],
    image: "/SIMPEG.png",
    live: "#",
    source: "https://github.com/rrsfira/skripsi.git"
  }
];


export const experiences = [
  {
    year: "September - Desember 2024",
    title: "Front-End Web Developer",
    organization: "PT OTAK KANAN",
    description: "Developing a Point of Sales (POS) system, including product management, sales transactions, sales reports, and optimizing the interface for better usability."
  },
  {
    year: "Maret - Juni 2025",
    title: "Full-Stack Web Developer",
    organization: "BPBD Kota Surabaya",
    description: "Developing a data management website for disaster awareness and outreach, covering everything from interface development and system testing to implementation and deployment."
  },
  {
    year: "2026",
    title: "Front-End Web Developer",
    organization: "Thesis Project",
    description: "Reengineering and developed the frontend of an employee management system using React.js, featuring modules for attendance, payroll, leave and time off, reimbursements, and job applicant management."
  }
];

export const socials = [
  { label: "GitHub", href: "https://github.com/rrsfira", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/reihan-rachma-shafira-1868861b8", icon: Globe2 },
  { label: "Instagram", href: "https://www.instagram.com/rrsfira31", icon: Smartphone }
];
