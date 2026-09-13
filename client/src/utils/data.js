export const profile = {
  name: "RAJ KUMAR RAM",
  tagline: "Full Stack Developer",
  typedStrings: [
    "Full Stack Developer",
    2000,
    "MERN Stack Enthusiast",
    2000,
    "Problem Solver",
    2000,
  ],
  summary:
    "I'm an engineering student who enjoys turning ideas into fast, accessible software. Most of my work sits in the MERN stack, but the part I like most is problem-solving underneath it.",
  objective:
    "Seeking a Software Engineering internship where I can contribute to real production systems, learn from experienced engineers, and keep sharpening my DSA and system-design fundamentals.",
  githubUsername: "raj933066",
  email: "rajkrram93@gmail.com",
  phone: "+91 9330664357",
  location: "Howrah, West Bengal, India",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/raj933066",
    linkedin: "https://www.linkedin.com/in/raj-kumar-ram/",
    email: "rajkrram93@gmail.com",
    phone: "+91 9330664357",
  },
};

export const projects = [
  {
    id: "proj-1",
    name: "WonderLust",
    description:
      "Developed a full-stack property rental platform inspired by Airbnb, featuring property listing, search and filtering, user authentication, booking workflows, and host dashboards. Implemented separate user and host functionalities for managing properties and reservations with a responsive and user-friendly interface.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    features: [
      "Property search & filters",
      "Authentication",
      "Booking management",
      "Responsive UI",
    ],
    image: "../images/wonderLust-img.avif",
    github: "https://github.com/raj933066/WANDERLUST-project",
    demo: "",
  },
  {
    id: "proj-2",
    name: "TradeZen",
    description:
      "TradeZen is a full-stack stock trading platform inspired by Zerodha, designed to provide users with a realistic stock-market dashboard and trading experience. The platform allows users to monitor stocks, manage their portfolio, view holdings and positions, and execute buy/sell transactions through an interactive interface.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    features: [],
    image: "./images/tradZen.jpeg",
    github: "https://github.com/raj933066/TradeZen",
    demo: "",
  },
  {
    id: "proj-3",
    name: "Blogging Application",
    description:
      "A full-stack blogging platform where users can create, publish, read, and manage blog posts.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    features: [],
    image: "../images/bloggin-img.jpg",
    github: "https://github.com/raj933066/BLOGGING-PAGE",
    demo: "",
  },
  {
    id: "proj-4",
    name: "Quiz Application",
    description:
      "An upcoming project exploring applied machine learning — details coming soon as the build progresses.",
    tech: ["Python", "TensorFlow"],
    features: [],
    image:
      "../images/quiz-img.jpg",
    github: "https://github.com/raj933066/fullstack-quiz-application",
    demo: "",
  },
  {
    id: "proj-5",
    name: "Synapse",
    description:
      "A mental health website designed to provide users with accessible mental wellness resources, self-assessment tools, and support features in a simple, user-friendly interface.",
    tech: ["Python", "TensorFlow"],
    features: [],
    image:
      "../images/synapse-img.webp",
    github: "https://github.com/raj933066/synapse-project",
    demo: "",
  },
  {
    id: "proj-6",
    name: "Future AI Project",
    description:
      "An upcoming project exploring applied machine learning — details coming soon as the build progresses.",
    tech: ["Python", "TensorFlow"],
    features: ["In planning"],
    image:
      "../images/futureAI.avif",
    github: "",
    demo: "",
  },
];

export const skills = [
  ...[
    ["C++", "Languages", 85],
    ["JavaScript", "Languages", 80],
    ["HTML", "Languages", 95],
    ["CSS", "Languages", 90],
    ["React", "Frontend", 88],
    ["Tailwind CSS", "Frontend", 90],
    ["Node.js", "Backend", 82],
    ["Express.js", "Backend", 82],
    ["MongoDB", "Database", 80],
    ["Git", "Tools", 88],
    ["GitHub", "Tools", 88],
    ["REST API", "Concepts", 85],
    ["Data Structures", "Concepts", 85],
    ["Algorithms", "Concepts", 85],
  ].map(([name, category, proficiency], index) => ({
    id: `skill-${index}`,
    name,
    category,
    proficiency,
  })),
];

export const education = [
  {
    id: "edu-1",
    school: "Jalpaiguri Government Engineering College",
    degree: "B.Tech, Electronics & Communication Engineering",
    period: "2024 - 2028",
    detail:
      "Focused on data structures, algorithms, and full-stack web development.",
  },
  {
    id: "edu-2",
    school: "Sunrise (ENG - MED) School",
    degree: "Higher Secondary (Class XII)",
    period: "2023 - 2024",
    detail: "Science stream with Computer Science as an elective.",
  },
  {
    id: "edu-3",
    school: "Sunrise (ENG - MED) School",
    degree: "Secondary (Class X)",
    period: "2022",
    detail: "Built a foundation in mathematics and the sciences.",
  },
];

export const experience = [
  {
    id: "exp-1",
    role: "Open to Internship & Job Opportunities",
    company: "Software Engineering",
    period: "Present",
    points: [
      "Currently looking for Software Engineering internship and job opportunities.",
      "Open to remote, hybrid, or on-site roles.",
    ],
  },
  {
    id: "exp-2",
    role: "MicroElectronics Technology & VLSI Design Internship",
    company: "JADAVPUR UNIVERSITY",
    period: "15 Jun - 15 Jul 2026",
    points: [
      "Gained hands-on experience in MicroElectronics Technology and VLSI Design.",
    ],
  },
  {
    id: "exp-3",
    role: "Full-stack Internship",
    company: "GENZ EDUCATE WING",
    period: "10 Oct - 10 Dec 2025",
    points: [
      "Gained hands-on experience in full-stack development.",
      "Collaborated with a team on the project.",
    ],
  },
];

export const certifications = [
  {
    id: "cert-1",
    name: "Data Structures and Algorithms in C++",
    org: "Apna College",
    date: "May 2025",
    image: "/images/cppCertificate-1.png",
    verifyUrl: "/images/cppCertificate-1.png",
  },
  {
    id: "cert-2",
    name: "The Complete Web Development Course",
    org: "Apna College",
    date: "August 2025",
    image: "/images/webdevCertificate-1.png",
    verifyUrl: "/images/webdevCertificate-1.png",
  },
  {
    id: "cert-3",
    name: "Full Stack Development Internship",
    org: "GENZ EDUCATE WING",
    date: "10 Oct - 10 Dec 2025",
    image: "/images/COMPLETITION CERTIFICATE.jpg",
    verifyUrl: "/images/COMPLETITION CERTIFICATE.jpg",
  },
];

export const achievements = [
  {
    id: "ach-1",
    title: "Problem Solving",
    detail:
      "300+ problems solved across LeetCode, Codeforces and various platforms.",
    icon: "code",
  },
  {
    id: "ach-2",
    title: "Hackathons",
    detail: "Participated in SMART INDIA HACKATHON.",
    icon: "trophy",
  },
  {
    id: "ach-3",
    title: "Certificates",
    detail: "5+ certifications across web development and data structures.",
    icon: "certificate",
  },
  {
    id: "ach-4",
    title: "Coding Practice",
    detail:
      "Consistent daily practice across competitive programming platforms.",
    icon: "streak",
  },
];

export const navLinks = [
  { label: "About", to: "/#about" },
  { label: "Skills", to: "/#skills" },
  { label: "Experience", to: "/#experience" },
  { label: "Projects", to: "/#projects" },
  { label: "Certifications", to: "/#certifications" },
  { label: "Education", to: "/#education" },
  { label: "Achievements", to: "/#achievements" },
  { label: "GitHub", to: "/#github" },
  { label: "Contact", to: "/#contact" },
];
