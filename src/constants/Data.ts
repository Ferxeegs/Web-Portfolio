// constants/data.ts
import { Github, Linkedin, Mail } from 'lucide-react';
import { Project, Certificate, TechStack, SocialLink } from '../types/index';

export const projects: Project[] = [
    {
        title: "Dokter Ikan",
        description:
            "AI-powered web application that helps fish farmers detect fish species and diseases using image recognition and symptom-based expert system. Includes consultation features and offline support using ONNX models.",
        technologies: ["Next.js", "Express Js", "Flask", "MySQL", "PWA"],
        link: "https://github.com/Ferxeegs/Dokter-Ikan",
        imageUrl:"/projects/Dokterikan.png"
    },
    {
        title: "Arshakatour",
        description:
            "ArshakaTour is a tour and travel website for booking trips across Indonesia, offering diverse destination packages, flexible payment options, and a complete admin management system for efficient operations.",
        technologies: ["Laravel", "MySQL", "Bootstrap", "JavaScript"],
        link: "https://github.com/Ferxeegs/Arshakatour",
        imageUrl:"/projects/Arshakatour.png"
    },
    {
        title: "NutriSense",
        description:
            "Mobile dietary app that scans food using the camera, detects the type of food, and displays nutritional content. It also evaluates whether the food is healthy, helping users make smarter dietary decisions.",
        technologies: ["Kotlin", "TensorFlow Lite", "SQLite", "CameraX"],
        link: "https://github.com/Ferxeegs/NutriSense",
        imageUrl:"/projects/NutriSense.png"
    }
];

export const certificates: Certificate[] = [
  {
    title: "Belajar Membuat Aplikasi Android",
    imageUrl: "/certificates/Dicoding-1.png",
    credentialLink: "https://www.dicoding.com/certificates/4EXG7NNKGPRL",
    issuer: "Dicoding"
  },
  {
    title: "Memulai Pemrograman dengan Kotlin",
    imageUrl: "/certificates/Dicoding-2.png",
    credentialLink: "https://www.dicoding.com/certificates/81P242Q7OZOY",
    issuer: "Dicoding"
  },
  {
    title: "Database Design",
    imageUrl: "/certificates/DD_Design.png",
    credentialLink: "https://academy.oracle.com/en/oa-web-overview.html#usermenu",
    issuer: "Oracle"
  },
  {
    title: "Database Foundations",
    imageUrl: "/certificates/Dfo_new.png",
    credentialLink: "https://academy.oracle.com/en/oa-web-overview.html#usermenu",
    issuer: "Oracle"
  },
  {
    title: "Introduction to Network",
    imageUrl: "/certificates/IN_new.png",
    credentialLink: "https://www.netacad.com/certificates?issuanceId=f693e675-c5a0-4331-9387-4d05f0af20dd",
    issuer: "Cisco Networking Academy"
  },
  {
    title: "Switching, Routing, and Wireless Essentials",
    imageUrl: "/certificates/SRWE_new.png",
    credentialLink: "https://www.netacad.com/certificates?issuanceId=c5d4ba7e-8b94-45c4-8c9c-67002020d73e",
    issuer: "Cisco Networking Academy"
  },
];


export const techStack: TechStack[] = [
    { name: "React", imageUrl: "/tech/react.png" },
    { name: "Next.js", imageUrl: "/tech/nextjs.png" },
    { name: "TypeScript", imageUrl: "/tech/typescript.png" },
    { name: "HTML", imageUrl: "/tech/html.png" },
    { name: "Tailwind CSS", imageUrl: "/tech/tailwind.png" },
    { name: "Kotlin", imageUrl: "/tech/kotlin.png" },
    { name: "Express", imageUrl: "/tech/express.png" },
    { name: "Python", imageUrl: "/tech/python.png" },
    { name: "Git", imageUrl: "/tech/git.png" },
    { name: "Docker", imageUrl: "/tech/docker.png" },
    { name: "MySQL", imageUrl: "/tech/mysql.png" },
    { name: "PHP", imageUrl: "/tech/php.png" },
    { name: "JavaScript", imageUrl: "/tech/javascript.png" },
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