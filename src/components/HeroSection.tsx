// components/HeroSection.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
     visibleElements: Set<string>;
    scrollToSection: (sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative px-4 pt-20 sm:pt-0">
            <div className="text-center z-10 animate-on-scroll max-w-6xl mx-auto" id="hero">
                <div className="mb-8 sm:mb-12">
                    <h1 className="flex flex-col gap-2 sm:gap-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 sm:mb-8 leading-tight px-4">
                        {/* Welcome To My */}
                        <div
                            className="overflow-hidden"
                            style={{
                                opacity: 0,
                                animation: 'slideInLeft 1s ease-out forwards',
                                animationDelay: '0.3s'
                            }}
                        >
                            <span className="text-white inline-block drop-shadow-lg">
                                Welcome To My
                            </span>
                        </div>

                        {/* Portfolio Website */}
                        <div
                            className="overflow-hidden"
                            style={{
                                opacity: 0,
                                animation: 'slideInRight 1s ease-out forwards',
                                animationDelay: '0.8s'
                            }}
                        >
                            <span className="relative inline-block">
                                {/* Background text for better visibility */}
                                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent blur-sm opacity-50">
                                    Portfolio Website
                                </span>
                                {/* Main gradient text */}
                                <span className="relative bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent font-extrabold">
                                    Portfolio Website
                                </span>
                                {/* White outline for better contrast */}
                                <span className="absolute inset-0 text-white opacity-20 -z-10" style={{ WebkitTextStroke: '1px white' }}>
                                    Portfolio Website
                                </span>
                            </span>
                        </div>
                    </h1>
                    
                    <div className="relative">
                        <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 bg-violet-400/20 rounded-full animate-ping" />
                        <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-2 h-2 sm:w-3 sm:h-3 bg-purple-400/20 rounded-full animate-ping delay-1000" />
                    </div>
                    
                    <div 
                        className="opacity-0"
                        style={{
                            animation: 'slideInUp 0.8s ease-out forwards',
                            animationDelay: '1.3s'
                        }}
                    >
                        <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed px-4">
                            Creating extraordinary digital experiences with modern technology and innovative solutions
                        </p>
                    </div>
                </div>

                <div 
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 opacity-0"
                    style={{
                        animation: 'fadeInScale 0.8s ease-out forwards',
                        animationDelay: '1.8s'
                    }}
                >
                    <button
                        onClick={() => scrollToSection('portfolio')}
                        className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl sm:rounded-2xl text-white font-semibold hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-violet-500/50 border border-violet-500/20"
                    >
                        <span className="flex items-center justify-center gap-3">
                            View Portfolio
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                    </button>
                    <button
                        onClick={() => scrollToSection('about')}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3 border-2 border-violet-500/50 rounded-xl sm:rounded-2xl text-violet-400 font-semibold hover:bg-violet-500/10 hover:text-violet-300 hover:border-violet-400 transition-all duration-300 backdrop-blur-sm"
                    >
                        About Me
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;