// constants/data.ts
import { Github, Linkedin, Mail } from 'lucide-react';
import { Project, Certificate, TechStack, SocialLink } from '../types/index';

export const projects: Project[] = [
    {
        "title": "Aroomi",
        "description":
            "A comprehensive web-based venue and asset rental system developed for Diponegoro University (UNDIP) to digitize facility and equipment reservations for both commercial and internal use.",
        "longDescription": [
            "Aroomi is a specialized asset and venue management platform designed for Diponegoro University (UNDIP) to digitize the facility reservation process, which was previously handled manually. The platform aims to enhance operational efficiency in managing university assets through an integrated and transparent system.",
            "Built using the TALL stack (Tailwind CSS, Alpine.js, Laravel, and Livewire) with Filament PHP as the primary engine for a robust backoffice, Aroomi implements a complex database architecture to handle dynamic pricing schemes, voucher systems, and automated PDF report generation via Spatie Browsershot. The application also features optimized media handling for large file uploads using Spatie MediaLibrary within the Filament ecosystem."
        ],
        "technologies": ["Laravel", "Filament PHP", "Tailwind CSS", "Livewire", "MySQL", "Spatie Browsershot", "Alpine.js", "Docker"],
        "link": "https://github.com/Ferxeegs/Aroomi",
        "liveDemo": "https://aroomi.undip.id",
        "imageUrl": "/projects/Aroomi1.png",
        "images": [
            "/projects/Aroomi1.png",
            "/projects/Aroomi2.png",
            "/projects/Aroomi3.png",
            "/projects/Aroomi4.png",
            "/projects/Aroomi5.png",
            "/projects/Aroomi6.png"
        ],
        "role": "FullStack Developer",
        "timeline": "Oct 2025 - Dec 2025",
        "features": [
            "Dynamic Venue & Asset Rate Management",
            "Automated PDF Report Generation (Spatie Browsershot)",
            "Advanced Backoffice Dashboard with Filament PHP",
            "Voucher and Discount System Integration"
        ],
        "category": "Web Application"
    },
    {
        title: "Dokter Ikan",
        description:
            "AI-powered Progressive Web App (PWA) designed to assist fish farmers in marine aquaculture. It utilizes YOLO for image-based disease detection and an expert system to diagnose diseases based on symptoms.",
        longDescription: [
            "Dokter Ikan is an AI-powered digital platform designed to help aquaculture farmers identify fish species and perform early disease assessment efficiently. The platform uses a YOLO-based computer vision model to detect fish species from uploaded images, providing fast and accurate species identification that supports proper handling and treatment decisions, especially for farmers in remote aquaculture areas with limited access to professional services.",
            "For health analysis, Dokter Ikan applies a rule-based expert system that processes user-input symptoms to infer potential fish diseases and recommend appropriate actions. When automated diagnosis is not sufficient, users can access a consultation feature with fish health experts for further evaluation and professional guidance. Built as an offline-first Progressive Web App (PWA), Dokter Ikan ensures reliable performance in low-connectivity environments while aiming to reduce fish mortality and promote sustainable aquaculture practices."
        ],
        technologies: ["Next.js", "Express Js", "Flask", "Pytorch", "PWA", "MySQL", "TypeScript", "Tailwind CSS"],
        link: "https://github.com/Ferxeegs/Dokter-Ikan",
        liveDemo: "https://dokterikan.my.id",
        imageUrl: "/projects/Dokterikan1.png",
        images: [
            "/projects/Dokterikan1.png",
            "/projects/Dokterikan2.png",
            "/projects/Dokterikan3.png",
            "/projects/Dokterikan4.png",
            "/projects/Dokterikan5.png",
            "/projects/Dokterikan6.png"
        ],
        role: "FullStack Developer (Internship)",
        timeline: "Des 2024 - May 2025",
        features: [
            "AI Species & Disease Identification",
            "Symptom-based Expert Diagnosis System",
            "Offline Functionality with IndexedDB",
            "Real-time Consultation with Experts"
        ],
        category: "Progressive Web Application"
    },
    {
        title: "Arshakatour",
        description:
            "A tour and travel platform for booking trips across Indonesia. It features diverse destination packages, flexible payment options, and a complete administrative management system for travel agencies.",
        longDescription: [
            "Arshakatour is a comprehensive tour and travel booking platform designed to facilitate seamless trip reservations across Indonesia. The platform offers a wide range of destination packages, catering to various traveler preferences, from cultural explorations to adventure tourism. Users can easily browse through curated tour options, view detailed itineraries, and make bookings with flexible payment methods, including online payments and installment plans.",
            "For travel agencies, Arshakatour provides a robust administrative management system that streamlines operations such as package management, booking tracking, and customer relationship management. The platform's user-friendly interface ensures an enjoyable experience for both travelers and agency staff, enhancing overall efficiency and customer satisfaction in the travel booking process."
        ],
        technologies: ["Laravel", "MySQL", "Bootstrap", "JavaScript"],
        link: "https://github.com/Ferxeegs/Arshakatour",
        imageUrl: "/projects/Arshakatour.png",
        images: [
            "/projects/Arshakatour1.png",
            "/projects/Arshakatour2.png",
            "/projects/Arshakatour3.png"
        ],
        role: "Backend Developer",
        timeline: "Dec 2023 - Feb 2024",
        features: [
            "Tour Package Management",
            "Secure Booking & Payment Workflow",
            "Centralized Admin Management Panel",
            "Responsive Client-facing Website"
        ],
        category: "Web Application"
    },
    // {
    //     title: "NutriSense",
    //     description:
    //         "Mobile dietary application that utilizes image recognition to scan food. It detects nutritional content and evaluates food healthiness, helping users make smarter dietary decisions in real-time.",
    //     technologies: ["Kotlin", "TensorFlow Lite", "SQLite", "CameraX"],
    //     link: "https://github.com/Ferxeegs/NutriSense",
    //     imageUrl: "/projects/NutriSense.png",
    //     images: [
    //         "/projects/NutriSense.png",
    //         "/projects/NutriSense.png",
    //         "/projects/NutriSense.png"
    //     ],
    //     role: "Android Developer (Capstone)",
    //     timeline: "2024",
    //     features: [
    //         "Real-time Food Image Recognition",
    //         "Detailed Nutritional Analysis",
    //         "Health Rating & Diet Evaluation",
    //         "Local History & Data Management with SQLite"
    //     ],
    //     category: "Mobile Application"
    // }
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
    { name: "Laravel", imageUrl: "/tech/laravel.jpg" }
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