// constants/data.ts
import { Github, Linkedin, Mail } from 'lucide-react';
import { Project, Certificate, TechStack, SocialLink } from '../types/index';

export const projects: Project[] = [
    {
        title: "Dokter Ikan",
        description:
            "AI-powered web application that helps fish farmers detect fish species and diseases using image recognition and symptom-based expert system. Includes consultation features and offline support using ONNX models.",
        technologies: ["Next.js", "Express Js", "Flask", "MySQL", "PWA"],
        link: "https://github.com/Ferxeegs/Dokter-Ikan" 
    },
    {
        title: "Arshakatour",
        description:
            "ArshakaTour is a tour and travel website for booking trips across Indonesia, offering diverse destination packages, flexible payment options, and a complete admin management system for efficient operations.",
        technologies: ["Laravel", "MySQL", "Bootstrap", "JavaScript"],
        link: "https://github.com/Ferxeegs/Arshakatour" 
    },
    {
        title: "NutriSense",
        description:
            "Mobile dietary app that scans food using the camera, detects the type of food, and displays nutritional content. It also evaluates whether the food is healthy, helping users make smarter dietary decisions.",
        technologies: ["Kotlin", "TensorFlow Lite", "SQLite", "CameraX"],
        link: "https://github.com/Ferxeegs/NutriSense" 
    }
];

export const certificates: Certificate[] = [
    {
        title: "AWS Certified Developer",
        imageUrl: "/certificates/Dicoding-1.png", // Update path dimulai dengan '/'
        credentialLink: "https://www.credly.com/your-aws-credential"
    },
    {
        title: "Google Analytics Certified",
        imageUrl: "/certificates/Dicoding-2.png", // Update path dimulai dengan '/'
        credentialLink: "https://analytics.google.com/your-credential"
    },
    {
        title: "Meta Front-End Developer",
        imageUrl: "/certificates/Dicoding-3.png", // Update path dimulai dengan '/'
        credentialLink: "https://www.coursera.org/your-credential"
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