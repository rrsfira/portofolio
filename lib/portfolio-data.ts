export type PortfolioCategory = "projects" | "certificates" | "trainings";

export type PortfolioItem = {
  id: string;
  title: string;
  image: string;
  organization: string;
  year: string;
  description: string;
  tech?: string[];
  live?: string;
  source?: string;
};

export const portfolioFolders = [
  {
    slug: "projects" as const,
    label: "Projects",
    count: "4+",
    accent: "#8ba6ff",
    documents: ["/TOKO.png", "/OK.png", "/BPBD.png", "/SIMPEG.png"],
  },
  {
    slug: "certificates" as const,
    label: "Certificates",
    count: "4+",
    accent: "#9ab8ff",
    documents: ["/Website Development.pdf", "/UI-UX RESEARCH AND DESIGN.pdf", "/bnsp.pdf", "/CV Shafira TERBARU 2026.pdf"],
  },
  {
    slug: "trainings" as const,
    label: "Trainings",
    count: "2+",
    accent: "#a6b8ff",
    documents: ["/Graduation_Bouquet_Portrait_with_Railing-removebg-preview.png", "/Colorful Developer Skills Keyboard.png", "/bnsp.pdf"],
  },
];

export const projectItems: PortfolioItem[] = [
  {
    id: "medical-equipment-store",
    title: "Medical Equipment Store",
    image: "/TOKO.png",
    organization: "Independent project",
    year: "2024",
    description: "An intuitive e-commerce experience for exploring and purchasing medical supplies.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "MySQL"],
    source: "https://github.com/rrsfira/TokoKesehatan2.git",
  },
  {
    id: "point-of-sale",
    title: "Point of Sale",
    image: "/OK.png",
    organization: "PT Otak Kanan",
    year: "2024",
    description: "A focused POS system for sales, inventory, customer, and business reporting.",
    tech: ["React.js", "Tailwind CSS", "Chart.js", "Figma"],
    source: "https://github.com/rrsfira/POS-INTERN.git",
  },
  {
    id: "siaga-surabaya",
    title: "Siaga Surabaya",
    image: "/BPBD.png",
    organization: "BPBD Kota Surabaya",
    year: "2025",
    description: "A structured information platform for disaster-awareness activities and outreach.",
    tech: ["React.js", "Node.js", "MySQL", "Charts.js"],
    source: "https://github.com/rrsfira/Manajemen-Sosialisasi.git",
  },
  {
    id: "simpeg",
    title: "SIMPEG",
    image: "/SIMPEG.png",
    organization: "Thesis project",
    year: "2026",
    description: "A responsive employee management interface for attendance, payroll, and leave.",
    tech: ["React.js", "Tailwind", "Figma", "Charts.js"],
    source: "https://github.com/rrsfira/skripsi.git",
  },
];

export const certificateItems: PortfolioItem[] = [
  { id: "semnas", title: "Seminar Nasioanl", image: "/semnas.pdf", organization: "ICSI", year: "2026", description: " " },
  { id: "toefl", title: "EPT TOEFL", image: "/toefl.pdf", organization: "UPN VETERAN JATIM", year: "2026", description: "" },
  { id: "bnsp", title: "Junior Web Developer", image: "/bnsp.pdf", organization: "BNSP", year: "2025", description: "Professional competency certification in web development." },
  { id: "magang1", title: "Intern", image: "/bpbd.pdf", organization: "BPBD", year: "2025", description: " " },
  { id: "magang2", title: "Intern", image: "/otakkanan.pdf", organization: "PT OTAK KANAN", year: "2024", description: " " },
];

export const trainingItems: PortfolioItem[] = [
  
  { id: "web-development", title: "Website Development", image: "/Website Development.pdf", organization: "MySkill", year: "2025", description: "Certificate of completion for website development." },
  { id: "ui-ux", title: "UI/UX Research and Design", image: "/UI-UX RESEARCH AND DESIGN.pdf", organization: "MySkill", year: "2024", description: "Certificate focused on user research and interface design." },
  { id: "afl", title: "AIESEC Future Leader", image: "/afl.pdf", organization: "AIESEC", year: "2024", description: " " },  
];

export function getPortfolioItems(category: PortfolioCategory) {
  if (category === "projects") return projectItems;
  if (category === "certificates") return certificateItems;
  return trainingItems;
}
