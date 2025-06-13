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
        <section id="home" className="min-h-screen flex items-center justify-center relative px-4 py-8 lg:py-0">
            <div className="max-w-6xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div className={`space-y-6 lg:space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}>

                        {/* Main Title */}
                        <div className="space-y-2">
                            <h1 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold transition-all duration-800 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    Full Stack
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                    Developer
                                </span>
                            </h1>

                            <div className={`space-y-1 transition-all duration-800 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}>
                                <p className="text-sm sm:text-base lg:text-lg text-gray-300 font-medium">
                                    Computer Engineering Student
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400">
                                    Universitas Diponegoro
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className={`transition-all duration-800 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <p className="text-xs sm:text-sm lg:text-base text-gray-400 leading-relaxed max-w-lg">
                                Passionate about creating innovative web solutions and building modern applications
                                with cutting-edge technologies. Always eager to learn and explore new possibilities.
                            </p>
                        </div>

                        {/* Social Media Icons */}
                        <div className={`transition-all duration-800 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <div className="flex gap-3">
                                <a href="https://github.com/Ferxeegs" target="_blank" rel="noopener noreferrer"
                                    className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                    <Github className="w-4 h-4 text-gray-300 group-hover:text-white" />
                                </a>
                                <a href="https://linkedin.com/in/fadlilfer/" target="_blank" rel="noopener noreferrer"
                                    className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                    <Linkedin className="w-4 h-4 text-white" />
                                </a>
                                <a href="https://instagram.com/fadlilfer_" target="_blank" rel="noopener noreferrer"
                                    className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                    <Instagram className="w-4 h-4 text-white" />
                                </a>
                                <a
                                    href="https://wa.me/6282133513522" // Replace with your actual WhatsApp number
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 sm:w-9 sm:h-9 bg-green-600 hover:bg-green-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                                >
                                    <Phone className="w-4 h-4 text-white" />
                                </a>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-800 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <button
                                onClick={() => scrollToSection('portfolio')}
                                className="px-6 py-2.5 sm:px-7 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm sm:text-base font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group flex items-center justify-center gap-2"
                            >
                                View My Work
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                            <button
                                onClick={() => scrollToSection('about')}
                                className="px-6 py-2.5 sm:px-7 sm:py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white text-sm sm:text-base font-medium rounded-lg transition-all duration-300 hover:bg-gray-800"
                            >
                                About Me
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Animated Illustration */}
                    <div className={`flex items-center justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                        }`}>
                        <div className="relative w-full max-w-md lg:max-w-lg">
                            {/* Floating Background Elements */}
                            <div className="absolute inset-0 -z-10">
                                <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                                <div className="absolute top-20 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                                <div className="absolute bottom-0 left-10 w-10 h-10 sm:w-14 sm:h-14 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
                            </div>

                            {/* Main Avatar/Illustration */}
                            <div className="relative">
                                <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 mx-auto">
                                    {/* Outer Ring */}
                                    <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-spin-slow"></div>
                                    <div className="absolute inset-4 border border-purple-500/30 rounded-full animate-spin-slow-reverse"></div>

                                    {/* Inner Circle */}
                                    <div className="absolute inset-8 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                                            <span className="text-white font-bold text-xl sm:text-2xl lg:text-3xl">
                                                Dev
                                            </span>
                                        </div>
                                    </div>

                                    {/* Floating Code Elements */}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center text-white text-xs sm:text-sm font-mono animate-bounce">
                                        &lt;/&gt;
                                    </div>
                                    <div className="absolute -bottom-2 -left-2 w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-white text-xs sm:text-sm font-mono animate-bounce delay-500">
                                        { }
                                    </div>
                                    <div className="absolute top-1/2 -left-4 w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-mono animate-bounce delay-1000">
                                        !
                                    </div>
                                    <div className="absolute top-1/4 -right-4 w-6 h-6 sm:w-8 sm:h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-mono animate-bounce delay-1500">
                                        ?
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 -z-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl translate-x-32 translate-y-32"></div>
            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-slow-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                .animate-spin-slow-reverse {
                    animation: spin-slow-reverse 15s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default HeroSection;