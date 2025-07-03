// components/HeroSection.tsx
import React, { useEffect, useState } from 'react';
import { ArrowRight, Github, Linkedin, Instagram, Phone } from 'lucide-react';

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

                    {/* Right Side - Enhanced Elegant Animation */}
                    <div className={`flex items-center justify-center transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'
                        }`}>
                        <div className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-lg">
                            
                            {/* Elegant Floating Orbs - Adjusted for mobile */}
                            <div className="absolute inset-0 -z-10">
                                <div className="absolute top-4 xs:top-8 left-2 xs:left-4 w-2 xs:w-3 h-2 xs:h-3 bg-blue-400 rounded-full animate-float-1 shadow-lg shadow-blue-400/50"></div>
                                <div className="absolute top-12 xs:top-20 right-4 xs:right-8 w-1.5 xs:w-2 h-1.5 xs:h-2 bg-purple-400 rounded-full animate-float-2 shadow-lg shadow-purple-400/50"></div>
                                <div className="absolute bottom-16 xs:bottom-24 left-4 xs:left-8 w-3 xs:w-4 h-3 xs:h-4 bg-pink-400 rounded-full animate-float-3 shadow-lg shadow-pink-400/50"></div>
                                <div className="absolute bottom-8 xs:bottom-12 right-2 xs:right-4 w-2 xs:w-2.5 h-2 xs:h-2.5 bg-cyan-400 rounded-full animate-float-4 shadow-lg shadow-cyan-400/50"></div>
                                <div className="absolute top-1/2 left-1 xs:left-2 w-1 xs:w-1.5 h-1 xs:h-1.5 bg-yellow-400 rounded-full animate-float-5 shadow-lg shadow-yellow-400/50"></div>
                                <div className="absolute top-8 xs:top-16 right-1 xs:right-2 w-2.5 xs:w-3.5 h-2.5 xs:h-3.5 bg-green-400 rounded-full animate-float-6 shadow-lg shadow-green-400/50"></div>
                            </div>

                            {/* Main Animated Container */}
                            <div className="relative">
                                <div className="w-48 h-48 xs:w-56 xs:h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto relative">
                                    
                                    {/* Outer Glowing Ring */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse-glow"></div>
                                    
                                    {/* Rotating Orbital Rings */}
                                    <div className="absolute inset-1 xs:inset-2 border border-blue-500/30 rounded-full animate-orbit-slow">
                                        <div className="absolute -top-0.5 xs:-top-1 -right-0.5 xs:-right-1 w-1.5 xs:w-2 h-1.5 xs:h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                                    </div>
                                    <div className="absolute inset-4 xs:inset-6 border border-purple-500/30 rounded-full animate-orbit-medium">
                                        <div className="absolute -bottom-0.5 xs:-bottom-1 -left-0.5 xs:-left-1 w-1.5 xs:w-2 h-1.5 xs:h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>
                                    </div>
                                    <div className="absolute inset-7 xs:inset-10 border border-pink-500/30 rounded-full animate-orbit-fast">
                                        <div className="absolute -top-0.5 xs:-top-1 -left-0.5 xs:-left-1 w-1 xs:w-1.5 h-1 xs:h-1.5 bg-pink-500 rounded-full shadow-lg shadow-pink-500/50"></div>
                                    </div>

                                    {/* Central Hexagonal Container */}
                                    <div className="absolute inset-10 xs:inset-14 flex items-center justify-center">
                                        <div className="relative">
                                            {/* Hexagonal Background */}
                                            <div className="w-20 h-20 xs:w-28 xs:h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl rotate-45 shadow-2xl shadow-purple-500/30 animate-gentle-spin"></div>
                                            
                                            {/* Inner Content */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-gray-900/90 backdrop-blur-sm w-14 h-14 xs:w-20 xs:h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-xl flex items-center justify-center shadow-inner -rotate-45">
                                                    <div className="text-center">
                                                        <div className="text-white font-bold text-sm xs:text-lg sm:text-xl lg:text-2xl mb-0.5 xs:mb-1 animate-text-glow">
                                                            {"< />"}
                                                        </div>
                                                        <div className="text-blue-400 text-xs xs:text-sm font-medium">
                                                            Dev
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Tech Icons - Adjusted for mobile */}
                                    <div className="absolute -top-2 xs:-top-3 left-1/2 transform -translate-x-1/2">
                                        <div className="w-8 h-8 xs:w-10 xs:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xs xs:text-sm font-mono shadow-lg animate-float-tech-1">
                                            React
                                        </div>
                                    </div>
                                    
                                    <div className="absolute top-4 xs:top-8 -right-2 xs:-right-4">
                                        <div className="w-6 h-6 xs:w-8 xs:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-mono shadow-lg animate-float-tech-2">
                                            JS
                                        </div>
                                    </div>
                                    
                                    <div className="absolute bottom-4 xs:bottom-8 -left-2 xs:-left-4">
                                        <div className="w-7 h-7 xs:w-9 xs:h-9 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-mono shadow-lg animate-float-tech-3">
                                            CSS
                                        </div>
                                    </div>
                                    
                                    <div className="absolute -bottom-2 xs:-bottom-3 right-4 xs:right-8">
                                        <div className="w-5 h-5 xs:w-7 xs:h-7 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-float-tech-4">
                                            ⚡
                                        </div>
                                    </div>

                                    <div className="absolute top-1/2 -translate-y-1/2 -left-3 xs:-left-6">
                                        <div className="w-4 h-4 xs:w-6 xs:h-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs shadow-lg animate-float-tech-5">
                                            🚀
                                        </div>
                                    </div>

                                    <div className="absolute top-1/4 -right-3 xs:-right-6">
                                        <div className="w-6 h-6 xs:w-8 xs:h-8 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center text-white text-xs font-mono shadow-lg animate-float-tech-6">
                                            API
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Elegant Background Gradient Blurs - Adjusted for mobile */}
                            <div className="absolute top-0 left-1/2 w-24 h-24 xs:w-32 xs:h-32 bg-blue-500/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-12 xs:-translate-y-16 animate-pulse-slow"></div>
                            <div className="absolute bottom-0 right-0 w-20 h-20 xs:w-28 xs:h-28 bg-purple-500/10 rounded-full blur-2xl translate-x-4 xs:translate-x-8 translate-y-4 xs:translate-y-8 animate-pulse-slow delay-1000"></div>
                            <div className="absolute top-1/2 left-0 w-18 h-18 xs:w-24 xs:h-24 bg-pink-500/10 rounded-full blur-2xl -translate-x-4 xs:-translate-x-8 -translate-y-1/2 animate-pulse-slow delay-2000"></div>
                        </div>
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
                @keyframes float-1 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    25% { transform: translateY(-10px) translateX(5px); }
                    50% { transform: translateY(-5px) translateX(-3px); }
                    75% { transform: translateY(-15px) translateX(2px); }
                }
                
                @keyframes float-2 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    33% { transform: translateY(-8px) translateX(-4px); }
                    66% { transform: translateY(-12px) translateX(6px); }
                }
                
                @keyframes float-3 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    20% { transform: translateY(-6px) translateX(3px); }
                    40% { transform: translateY(-10px) translateX(-2px); }
                    60% { transform: translateY(-4px) translateX(4px); }
                    80% { transform: translateY(-8px) translateX(-1px); }
                }
                
                @keyframes float-4 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-12px) translateX(8px); }
                }
                
                @keyframes float-5 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    25% { transform: translateY(-7px) translateX(-3px); }
                    75% { transform: translateY(-9px) translateX(5px); }
                }
                
                @keyframes float-6 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    30% { transform: translateY(-11px) translateX(2px); }
                    70% { transform: translateY(-5px) translateX(-4px); }
                }
                
                @keyframes orbit-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes orbit-medium {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                
                @keyframes orbit-fast {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes gentle-spin {
                    from { transform: rotate(45deg); }
                    to { transform: rotate(405deg); }
                }
                
                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.02); }
                }
                
                @keyframes text-glow {
                    0%, 100% { text-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
                    50% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(147, 51, 234, 0.4); }
                }
                
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.8; }
                }
                
                @keyframes float-tech-1 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(2deg); }
                }
                
                @keyframes float-tech-2 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-6px) rotate(-2deg); }
                }
                
                @keyframes float-tech-3 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-7px) rotate(1deg); }
                }
                
                @keyframes float-tech-4 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-5px) rotate(-1deg); }
                }
                
                @keyframes float-tech-5 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-9px) rotate(3deg); }
                }
                
                @keyframes float-tech-6 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-6px) rotate(-2deg); }
                }
                
                .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
                .animate-float-2 { animation: float-2 8s ease-in-out infinite; }
                .animate-float-3 { animation: float-3 7s ease-in-out infinite; }
                .animate-float-4 { animation: float-4 9s ease-in-out infinite; }
                .animate-float-5 { animation: float-5 5s ease-in-out infinite; }
                .animate-float-6 { animation: float-6 6.5s ease-in-out infinite; }
                
                .animate-orbit-slow { animation: orbit-slow 25s linear infinite; }
                .animate-orbit-medium { animation: orbit-medium 18s linear infinite; }
                .animate-orbit-fast { animation: orbit-fast 12s linear infinite; }
                
                .animate-gentle-spin { animation: gentle-spin 30s linear infinite; }
                .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
                .animate-text-glow { animation: text-glow 3s ease-in-out infinite; }
                .animate-pulse-slow { animation: pulse-slow 5s ease-in-out infinite; }
                
                .animate-float-tech-1 { animation: float-tech-1 4s ease-in-out infinite; }
                .animate-float-tech-2 { animation: float-tech-2 5s ease-in-out infinite 0.5s; }
                .animate-float-tech-3 { animation: float-tech-3 4.5s ease-in-out infinite 1s; }
                .animate-float-tech-4 { animation: float-tech-4 5.5s ease-in-out infinite 1.5s; }
                .animate-float-tech-5 { animation: float-tech-5 4.2s ease-in-out infinite 2s; }
                .animate-float-tech-6 { animation: float-tech-6 4.8s ease-in-out infinite 2.5s; }

                /* Custom breakpoint untuk extra small screens */
                @media (max-width: 475px) {
                    .xs\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
                    .xs\:text-base { font-size: 1rem; line-height: 1.5rem; }
                    .xs\:text-sm { font-size: 0.875rem; line-height: 1.25rem; }
                    .xs\:w-10 { width: 2.5rem; }
                    .xs\:h-10 { height: 2.5rem; }
                    .xs\:w-56 { width: 14rem; }
                    .xs\:h-56 { height: 14rem; }
                    .xs\:w-28 { width: 7rem; }
                    .xs\:h-28 { height: 7rem; }
                    .xs\:w-20 { width: 5rem; }
                    .xs\:h-20 { height: 5rem; }
                    .xs\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
                    .xs\:py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
                    .xs\:space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: 1.5rem; }
                    .xs\:space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.5rem; }
                    .xs\:space-y-1 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.25rem; }
                    .xs\:gap-3 { gap: 0.75rem; }
                    .xs\:max-w-sm { max-width: 24rem; }
                    .xs\:flex-row { flex-direction: row; }
                    .xs\:inline { display: inline; }
                    .xs\:hidden { display: none; }
                    .xs\:inset-2 { top: 0.5rem; right: 0.5rem; bottom: 0.5rem; left: 0.5rem; }
                    .xs\:inset-6 { top: 1.5rem; right: 1.5rem; bottom: 1.5rem; left: 1.5rem; }
                    .xs\:inset-10 { top: 2.5rem; right: 2.5rem; bottom: 2.5rem; left: 2.5rem; }
                    .xs\:inset-14 { top: 3.5rem; right: 3.5rem; bottom: 3.5rem; left: 3.5rem; }
                }
            `}</style>
        </section>
    );
};

export default HeroSection;