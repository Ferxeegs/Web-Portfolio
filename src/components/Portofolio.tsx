import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code, Sparkles, ArrowRight, Menu, X } from 'lucide-react';

// Types
interface Project {
    title: string;
    description: string;
    technologies: string[];
    link: string;
}

interface Certificate {
    title: string;
    description: string;
    technologies: string[];
    issuer: string;
}

interface TechStack {
    category: string;
    description: string;
    technologies: string[];
}

type PortfolioItemProps = {
    item: Project | Certificate | TechStack;
    type: 'projects' | 'certificates' | 'techstack';
    index: number;
};

const Portfolio = () => {
    const [activeSection, setActiveSection] = useState('projects');
    const [isScrolled, setIsScrolled] = useState(false);
    const [visibleElements, setVisibleElements] = useState(new Set());
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisibleElements(prev => new Set([...prev, entry.target.id]));
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('.animate-on-scroll');
        sections.forEach(section => observer.observe(section));

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    const projects: Project[] = [
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

    const certificates: Certificate[] = [
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

    const techStack: TechStack[] = [
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

    const PortfolioItem = ({ item, index }: PortfolioItemProps) => {
        const isProject = (item: Project | Certificate | TechStack): item is Project => {
            return 'link' in item;
        };

        const isCertificate = (item: Project | Certificate | TechStack): item is Certificate => {
            return 'issuer' in item;
        };

        const isTechStack = (item: Project | Certificate | TechStack): item is TechStack => {
            return 'category' in item;
        };

        const getTitle = () => {
            if (isTechStack(item)) {
                return item.category;
            }
            return item.title;
        };

        return (
            <div
                className="group relative overflow-visible" // Changed from overflow-hidden to overflow-visible
                style={{
                    animationDelay: `${index * 150}ms`,
                    animation: 'slideInUp 0.8s ease-out forwards',
                    padding: '1px' // Add slight padding to contain the glow effect
                }}
            >
                {/* Background gradient wrapper */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-purple-600/5 to-fuchsia-600/10 rounded-2xl sm:rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500 -z-10" />

                {/* Main card container */}
                <div className="relative bg-black/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 transition-all duration-500 group-hover:transform group-hover:-translate-y-2 group-hover:border-violet-500/50 group-hover:shadow-2xl group-hover:shadow-violet-500/20">
                    {/* Inner gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 via-purple-600/0 to-fuchsia-600/0 group-hover:from-violet-600/10 group-hover:via-purple-600/5 group-hover:to-fuchsia-600/10 rounded-2xl sm:rounded-3xl transition-all duration-700" />

                    {/* Content container */}
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4 sm:mb-6">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-violet-300 transition-all duration-300 tracking-tight pr-2">
                                {getTitle()}
                            </h3>
                            {isProject(item) && (
                                <div className="p-1.5 sm:p-2 bg-violet-600/20 rounded-full opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0">
                                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 cursor-pointer hover:text-violet-300" />
                                </div>
                            )}
                        </div>

                        <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base group-hover:text-gray-200 transition-colors duration-300">
                            {item.description}
                        </p>

                        {isCertificate(item) && (
                            <div className="mb-4 p-2 sm:p-3 bg-violet-600/10 rounded-lg sm:rounded-xl border border-violet-600/20">
                                <p className="text-violet-300 font-medium flex items-center gap-2 text-sm sm:text-base">
                                    <Code className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                    <span className="truncate">Issued by: {item.issuer}</span>
                                </p>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {item.technologies.map((tech: string, techIndex: number) => (
                                <span
                                    key={techIndex}
                                    className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 bg-gray-800/50 text-gray-300 rounded-full text-xs sm:text-sm border border-gray-700/50 hover:bg-violet-600/20 hover:text-violet-300 hover:border-violet-500/50 transition-all duration-300 cursor-default backdrop-blur-sm"
                                    style={{
                                        animationDelay: `${(index * 150) + (techIndex * 50)}ms`,
                                        animation: 'fadeInScale 0.6s ease-out forwards'
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Hover effect border - Adjusted position and scale */}
                    <div className="absolute -inset-[1px] rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-violet-600/50 via-purple-600/50 to-fuchsia-600/50 blur-xl transform scale-105" />
                    </div>
                </div>
            </div>
        );
    };

    const FloatingElements = () => (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Animated gradient orbs - responsive positioning */}
            <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-violet-600/6 sm:bg-violet-600/8 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '4s' }} />
            <div className="absolute top-3/4 right-1/4 w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-purple-600/6 sm:bg-purple-600/8 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '6s', animationDelay: '2s' }} />
            <div className="absolute bottom-1/4 left-1/3 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-fuchsia-600/6 sm:bg-fuchsia-600/8 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '5s', animationDelay: '1s' }} />

            {/* Floating particles - hidden on mobile for performance */}
            <div className="hidden sm:block absolute top-20 left-10 w-2 h-2 bg-violet-400/20 rounded-full animate-bounce"
                style={{ animationDuration: '3s' }} />
            <div className="hidden sm:block absolute top-40 right-20 w-1 h-1 bg-purple-400/25 rounded-full animate-bounce"
                style={{ animationDuration: '4s', animationDelay: '1s' }} />
            <div className="hidden sm:block absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-fuchsia-400/20 rounded-full animate-bounce"
                style={{ animationDuration: '5s', animationDelay: '2s' }} />
        </div>
    );

    // Tambahkan interface untuk social links
    interface SocialLink {
        Icon: typeof Github | typeof Linkedin | typeof Mail;
        href: string;
        label: string;
    }

    // Definisikan social links
    const socialLinks: SocialLink[] = [
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

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
            {/* Custom CSS animations */}
            <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @media (min-width: 768px) {
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        
        @keyframes letterFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-letter {
          opacity: 0;
          display: inline-block;
          animation: letterFadeIn 0.5s ease-out forwards;
        }
      `}</style>

            <FloatingElements />

            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-black/80 backdrop-blur-2xl shadow-2xl border-b border-gray-800/50'
                : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4 sm:py-6">
                        <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent animate-glow">
                            Ferxeegs
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-6 lg:space-x-8">
                            {['home', 'about', 'portfolio', 'contact'].map((item, index) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item)}
                                    className="relative text-gray-300 hover:text-violet-400 transition-all duration-300 capitalize group text-base lg:text-lg font-medium"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {item}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
                                    <span className="absolute inset-0 bg-violet-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
                                </button>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-300 hover:text-violet-400 transition-colors duration-300"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-gray-800/50">
                            <div className="px-4 py-6 space-y-4">
                                {['home', 'about', 'portfolio', 'contact'].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => scrollToSection(item)}
                                        className="block w-full text-left text-gray-300 hover:text-violet-400 transition-all duration-300 capitalize text-lg font-medium py-2"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center relative px-4 pt-20 sm:pt-0">
                <div className="text-center z-10 animate-on-scroll max-w-6xl mx-auto" id="hero">
                    <div className="mb-8 sm:mb-12">
                        <h1 className="flex flex-col gap-2 sm:gap-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight px-4">
                            <span className="text-white">Welcome To My</span>
                            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                                Portfolio Website
                            </span>
                        </h1>
                        <div className="relative">
                            <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 bg-violet-400/20 rounded-full animate-ping" />
                            <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-2 h-2 sm:w-3 sm:h-3 bg-purple-400/20 rounded-full animate-ping delay-1000" />
                        </div>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed px-4">
                            {
                                "Creating extraordinary digital experiences with modern technology and innovative solutions"
                                    .split("")
                                    .map((char, index) => (
                                        <span
                                            key={index}
                                            className="animate-letter"
                                            style={{
                                                animationDelay: `${index * 10}ms`,
                                                ...(char === " " ? { marginRight: "0.25em" } : {})
                                            }}
                                        >
                                            {char}
                                        </span>
                                    ))
                            }
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                        <button
                            onClick={() => scrollToSection('portfolio')}
                            className="group w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl sm:rounded-2xl text-white font-semibold hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-violet-500/50 border border-violet-500/20"
                        >
                            <span className="flex items-center justify-center gap-3">
                                View Portfolio
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </button>
                        <button
                            onClick={() => scrollToSection('about')}
                            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-violet-500/50 rounded-xl sm:rounded-2xl text-violet-400 font-semibold hover:bg-violet-500/10 hover:text-violet-300 hover:border-violet-400 transition-all duration-300 backdrop-blur-sm"
                        >
                            About Me
                        </button>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 sm:py-24 lg:py-32 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <div className={`grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center animate-on-scroll transition-all duration-1000 ${visibleElements.has('about-content') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                        }`} id="about-content">
                        <div className="space-y-6 sm:space-y-8 order-2 md:order-1">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent leading-tight">
                                About Me
                            </h2>
                            <div className="space-y-4 sm:space-y-6">
                                <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                                    I am a passionate full stack developer with expertise in creating innovative digital solutions.
                                    With over 3 years of experience in web development, I specialize in building modern,
                                    user-friendly applications using cutting-edge technologies.
                                </p>
                                <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                                    I constantly strive to learn the latest technologies and implement them in my projects.
                                    My main focus is delivering the best value to clients through clean code, efficient solutions,
                                    and exceptional user experiences.
                                </p>
                            </div>
                            <div className="flex space-x-4 sm:space-x-6 pt-4">
                                {socialLinks.map(({ Icon, href, label }, index) => (
                                    <a
                                        key={index}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group cursor-pointer"
                                        aria-label={label}
                                    >
                                        <div className="p-3 sm:p-4 bg-gray-800/30 rounded-xl sm:rounded-2xl border border-gray-700/50 hover:bg-violet-600/20 hover:border-violet-500/50 transition-all duration-300 transform hover:scale-110">
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-violet-400 transition-colors duration-300" />
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="text-center relative order-1 md:order-2">
                            <div className="relative inline-block animate-float">
                                <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto bg-gradient-to-br from-violet-600/20 to-purple-600/20 rounded-full flex items-center justify-center text-6xl sm:text-7xl lg:text-8xl backdrop-blur-sm border border-violet-500/20">
                                    👨‍💻
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-600/10 rounded-full animate-ping" />
                                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-violet-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                                <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="py-16 sm:py-24 lg:py-32 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <div className={`animate-on-scroll transition-all duration-1000 ${visibleElements.has('portfolio-content') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                        }`} id="portfolio-content">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                Portfolio
                            </h2>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                                A collection of my best work showcasing skills and creativity
                            </p>
                        </div>

                        {/* Portfolio Navigation */}
                        <div className="flex justify-center mb-12 sm:mb-16 px-4">
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 bg-black/40 backdrop-blur-xl rounded-xl sm:rounded-2xl p-2 border border-gray-800/50 w-full sm:w-auto">
                                {[
                                    { key: 'projects', label: 'Projects' },
                                    { key: 'certificates', label: 'Certificates' },
                                    { key: 'techstack', label: 'Tech Stack' }
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveSection(tab.key)}
                                        className={`px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${activeSection === tab.key
                                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                                            : 'text-gray-400 hover:text-violet-400 hover:bg-gray-800/30'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Portfolio Content */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 p-1">
                            {activeSection === 'projects' && projects.map((project, index) => (
                                <PortfolioItem key={index} item={project} type="projects" index={index} />
                            ))}
                            {activeSection === 'certificates' && certificates.map((cert, index) => (
                                <PortfolioItem key={index} item={cert} type="certificates" index={index} />
                            ))}
                            {activeSection === 'techstack' && techStack.map((tech, index) => (
                                <PortfolioItem key={index} item={tech} type="techstack" index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 relative">
                <div className="max-w-5xl mx-auto">
                    <div className={`animate-on-scroll transition-all duration-1000 ${visibleElements.has('contact-content') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                        }`} id="contact-content">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                Contact Me
                            </h2>
                            <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                                Let's collaborate to bring your dream project to life with cutting-edge technology
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
                            <div className="space-y-6 sm:space-y-8">
                                {[
                                    { icon: Mail, text: "fadlilferdy88@gmail.com" },
                                    { icon: Phone, text: "+62 8213 3513 522" },
                                    { icon: MapPin, text: "Semarang, Indonesia" }
                                ].map(({ icon: Icon, text }, index) => (
                                    <div key={index} className="flex items-center space-x-4 sm:space-x-6 group cursor-pointer">
                                        <div className="p-3 sm:p-4 bg-gray-800/30 rounded-xl sm:rounded-2xl border border-gray-700/50 group-hover:bg-violet-600/20 group-hover:border-violet-500/50 transition-all duration-300 flex-shrink-0">
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />
                                        </div>
                                        <span className="text-gray-200 text-base sm:text-lg group-hover:text-white transition-colors duration-300 break-all">{text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 sm:space-y-6">
                                {[
                                    { label: "Name", type: "text", placeholder: "Your Name" },
                                    { label: "Email", type: "email", placeholder: "email@example.com" }
                                ].map(({ label, type, placeholder }, index) => (
                                    <div key={index}>
                                        <label className="block text-gray-200 mb-2 sm:mb-3 font-medium text-sm sm:text-base">{label}</label>
                                        <input
                                            type={type}
                                            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black/40 border border-gray-700/50 rounded-xl sm:rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-black/60 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                                            placeholder={placeholder}
                                        />
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-gray-200 mb-2 sm:mb-3 font-medium text-sm sm:text-base">Message</label>
                                    <textarea
                                        rows={5}
                                        className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black/40 border border-gray-700/50 rounded-xl sm:rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-black/60 transition-all duration-300 backdrop-blur-sm resize-none text-sm sm:text-base"
                                        placeholder="Write your message here..."
                                    />
                                </div>
                                <button
                                    onClick={() => alert('Thank you! Your message has been sent.')}
                                    className="w-full px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl sm:rounded-2xl text-white font-semibold hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-violet-500/50 border border-violet-500/20 text-sm sm:text-base"
                                >
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 sm:py-12 text-center border-t border-gray-800/50 backdrop-blur-sm">
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg px-4">
                    © 2025 Ferxeegs. Made with ❤️ using React & TypeScript
                </p>
            </footer>
        </div>
    );
};

export default Portfolio;