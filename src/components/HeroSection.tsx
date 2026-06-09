// components/HeroSection.tsx
import React, { useEffect, useState } from 'react';
import { ArrowRight, Github, Linkedin, Instagram, Phone } from 'lucide-react';
import HeroSolarSystem from './HeroSolarSystem';

interface HeroSectionProps {
    scrollToSection: (sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animations after component mounts
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative px-3 sm:px-4 py-8 sm:py-12 lg:py-24 overflow-hidden">
            <div className="max-w-6xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div className={`space-y-3 sm:space-y-4 lg:space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}>

                        {/* Main Title */}
                        <div className="space-y-1 text-center lg:text-left">
                            <h1 className={`text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-4xl font-bold leading-tight transition-all duration-800 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    Full Stack
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                    Developer
                                </span>
                            </h1>

                            <div className={`space-y-0.5 transition-all duration-800 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-gray-300 font-medium">
                                    Computer Engineering Graduate
                                </p>
                                <p className="text-xs xs:text-sm sm:text-base text-gray-400">
                                    Diponegoro University
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className={`transition-all duration-800 delay-800 text-center lg:text-left ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <p className="text-xs xs:text-sm sm:text-base lg:text-base text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Passionate about creating innovative web solutions and building modern applications
                                with cutting-edge technologies. Always eager to learn and explore new possibilities.
                            </p>
                        </div>

                        {/* Social Media Icons */}
                        <div className={`transition-all duration-800 delay-1000 flex justify-center lg:justify-start ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <div className="flex gap-2 sm:gap-3">
                                <a href="https://github.com/Ferxeegs" target="_blank" rel="noopener noreferrer"
                                    className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                    <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 group-hover:text-white" />
                                </a>
                                <a href="https://linkedin.com/in/fadlilfer/" target="_blank" rel="noopener noreferrer"
                                    className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </a>
                                <a href="https://instagram.com/fadlilfer_" target="_blank" rel="noopener noreferrer"
                                    className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </a>
                                <a
                                    href="https://wa.me/6282133513522"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 xs:w-10 xs:h-10 sm:w-11 sm:h-11 bg-green-600 hover:bg-green-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                                >
                                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </a>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={`flex flex-col xs:flex-row gap-2 sm:gap-3 lg:gap-4 justify-center lg:justify-start transition-all duration-800 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <button
                                onClick={() => scrollToSection('portfolio')}
                                className="px-5 py-2.5 xs:px-6 xs:py-3 sm:px-7 sm:py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm xs:text-base font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group flex items-center justify-center gap-2"
                            >
                                <span className="xs:inline">View My Work</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                            <button
                                onClick={() => scrollToSection('about')}
                                className="px-5 py-2.5 xs:px-6 xs:py-3 sm:px-7 sm:py-3.5 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white text-sm xs:text-base font-medium rounded-lg transition-all duration-300 hover:bg-gray-800"
                            >
                                About Me
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Solar System Visual */}
                    <div className={`flex items-center justify-center transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'
                        }`}>
                        <HeroSolarSystem />
                    </div>
                </div>
            </div>

            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 -z-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 xs:w-96 xs:h-96 bg-gradient-to-br from-blue-500/3 to-transparent rounded-full blur-3xl -translate-x-32 xs:-translate-x-48 -translate-y-32 xs:-translate-y-48"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 xs:w-96 xs:h-96 bg-gradient-to-tl from-purple-500/3 to-transparent rounded-full blur-3xl translate-x-32 xs:translate-x-48 translate-y-32 xs:translate-y-48"></div>
                <div className="absolute top-1/2 left-1/2 w-48 h-48 xs:w-72 xs:h-72 bg-gradient-to-r from-pink-500/2 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <style jsx>{`
                @media (max-width: 475px) {
                    .xs\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
                    .xs\:text-base { font-size: 1rem; line-height: 1.5rem; }
                    .xs\:text-sm { font-size: 0.875rem; line-height: 1.25rem; }
                    .xs\:w-10 { width: 2.5rem; }
                    .xs\:h-10 { height: 2.5rem; }
                    .xs\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
                    .xs\:py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
                    .xs\:space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: 1.5rem; }
                    .xs\:space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.5rem; }
                    .xs\:space-y-1 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.25rem; }
                    .xs\:gap-3 { gap: 0.75rem; }
                    .xs\:flex-row { flex-direction: row; }
                    .xs\:inline { display: inline; }
                    .xs\:hidden { display: none; }
                }
            `}</style>
        </section>
    );
};

export default HeroSection;