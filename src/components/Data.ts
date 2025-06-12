// constants/data.ts
import { Github, Linkedin, Mail } from 'lucide-react';
import { Project, Certificate, TechStack, SocialLink } from '../types/index';

export const projects: Project[] = [
    {
        title: "Dokter Ikan",
        description:
            "AI-powered web application that helps fish farmers detect fish species and diseases using image recognition and symptom-based expert system. Includes consultation features and offline support using ONNX models.",
        technologies: ["Next.js", "Express JS", "Flask", "ONNX", "IndexedDB"],
        link: "#" // Ganti dengan link ke demo atau repo jika tersedia
    },
    {
        title: "Arshakatour",
        description:
            "Tour and travel website for booking religious trips in Indonesia, complete with destination packages, payment options, and admin management system.",
        technologies: ["Laravel", "MySQL", "Bootstrap", "JavaScript"],
        link: "#" // Ganti dengan link ke demo atau repo jika tersedia
    },
    {
        title: "NutriSense",
        description:
            "Mobile dietary app that scans food using the camera, detects the type of food, and displays nutritional content. It also evaluates whether the food is healthy, helping users make smarter dietary decisions.",
        technologies: ["Kotlin", "TensorFlow Lite", "SQLite", "CameraX"],
        link: "#" // Ganti dengan link ke demo atau repo jika tersedia
    }
];

export const certificates: Certificate[] = [
    {
        title: "AWS Certified Developer",
        description: "AWS developer certificate that validates skills in building and deploying applications in the cloud.",
        technologies: ["AWS", "Cloud Computing", "Lambda", "S3"],
        issuer: "Amazon Web Services"
    },
    {
        title: "Google Analytics Certified",
        description: "Google Analytics certificate for website analytics and digital performance optimization.",
        technologies: ["Analytics", "SEO", "Data Analysis", "Reporting"],
        issuer: "Google"
    },
    {
        title: "Meta Front-End Developer",
        description: "Professional certificate program from Meta for modern front-end development.",
        technologies: ["React", "JavaScript", "CSS", "Git"],
        issuer: "Meta"
    }
];

export const techStack: TechStack[] = [
    {
        category: "Frontend",
        description: "Technologies I use to build attractive and responsive user interfaces.",
        technologies: ["React", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
        category: "Backend",
        description: "Server-side technologies for building robust and scalable APIs.",
        technologies: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB"]
    },
    {
        category: "Tools & DevOps",
        description: "Development tools and platforms for efficient workflow.",
        technologies: ["Git", "Docker", "AWS", "Vercel", "Figma", "VS Code"]
    }
];

export const socialLinks: SocialLink[] = [
    {
        Icon: Github,
        href: "https://github.com/ferxeegs",
        label: "GitHub Profile"
    },
    {
        Icon: Linkedin,
        href: "https://linkedin.com/in/fadlilfer",
        label: "LinkedIn Profile"
    },
    {
        Icon: Mail,
        href: "mailto:fadlilferdy88@gmail.com",
        label: "Send Email"
    }
];

export const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' }
];

export const portfolioTabs = [
    { key: 'projects', label: 'Projects' },
    { key: 'certificates', label: 'Certificates' },
    { key: 'techstack', label: 'Tech Stack' }
];

export const contactInfo = [
    { type: 'email', text: "fadlilferdy88@gmail.com" },
    { type: 'phone', text: "+62 8213 3513 522" },
    { type: 'location', text: "Semarang, Indonesia" }
];