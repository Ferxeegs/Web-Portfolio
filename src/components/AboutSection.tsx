// components/AboutSection.tsx
import React, { useEffect, useState } from 'react';
import { Download, User, Calendar, Award, Coffee, MapPin } from 'lucide-react';

interface AboutSectionProps {
    visibleElements: Set<string>;
}

const stats = [
    { icon: Calendar, label: "Experience", value: "2+ Years" },
    { icon: Award, label: "Projects", value: "8+" },
    { icon: Coffee, label: "Coffee Cups", value: "∞" },
    { icon: MapPin, label: "Location", value: "Semarang, ID" }
];

const AboutSection: React.FC<AboutSectionProps> = ({ }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px 0px' }
        );

        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            observer.observe(aboutSection);
        }

        return () => observer.disconnect();
    }, []);

    const handleDownloadCV = () => {
        // Replace with actual CV file path
        const link = document.createElement('a');
        link.href = '/CV_Fadlil_Ferdiansyah.pdf';
        link.download = 'CV_Fadlil_Ferdiansyah.pdf';
        link.click();
    };

    const handleViewPortfolio = () => {
        // Scroll to portfolio section
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="about" className="min-h-screen py-8 sm:py-12 lg:py-20 px-4 relative overflow-hidden flex items-center">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-violet-500/3 rounded-full blur-3xl -translate-x-16 sm:-translate-x-32 -translate-y-16 sm:-translate-y-32"></div>
                <div className="absolute bottom-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-purple-500/3 rounded-full blur-3xl translate-x-16 sm:translate-x-32 translate-y-16 sm:translate-y-32"></div>
            </div>

            <div className="max-w-6xl mx-auto w-full">
                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                    {/* Left Side - Content */}
                    <div className="space-y-6 order-2 lg:order-1">
                        {/* Greeting */}
                        <div className={`transition-all duration-800 delay-200 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}>
                            <p className="text-sm text-violet-400 font-medium mb-2">
                                Hello, I&apos;m
                            </p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Fadlil Ferdiansyah
                                </span>
                            </h2>
                            <div className="h-1 w-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
                        </div>

                        {/* Description */}
                        <div className={`space-y-3 transition-all duration-800 delay-400 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}>
                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                I am a passionate <span className="text-violet-400 font-semibold">Full Stack Developer</span> and 
                                <span className="text-purple-400 font-semibold"> Computer Engineering</span> graduate from Diponegoro University. 
                                With over 2 years of experience in web development, I specialize in building modern, 
                                user-friendly applications.
                            </p>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                I constantly strive to learn the latest technologies and implement them in my projects.
                                My main focus is delivering exceptional value through clean code and outstanding user experiences.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 transition-all duration-800 delay-600 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}>
                            {stats.map(({ icon: Icon, label, value }, index) => (
                                <div key={index} className="text-center group">
                                    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/40 rounded-lg p-3 hover:bg-violet-600/10 hover:border-violet-500/30 transition-all duration-300 group-hover:scale-105">
                                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 mx-auto mb-1 group-hover:text-violet-300 transition-colors duration-300" />
                                        <p className="text-xs sm:text-sm font-bold text-white">{value}</p>
                                        <p className="text-xs text-gray-400">{label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 transition-all duration-800 delay-800 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}>
                            <button
                                onClick={handleDownloadCV}
                                className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                            >
                                <Download className="w-4 h-4 group-hover:animate-bounce" />
                                Download CV
                            </button>
                            <button
                                onClick={handleViewPortfolio}
                                className="group flex items-center justify-center gap-2 px-6 py-3 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 hover:bg-violet-600/20 hover:border-violet-500/50 text-gray-300 hover:text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                            >
                                <User className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                                View Portfolio
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Elegant Photo */}
                    <div className={`flex items-center justify-center order-1 lg:order-2 transition-all duration-1000 delay-300 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}>
                        <div className="relative w-full max-w-sm mx-auto">
                            <div className="relative group">
                                {/* Subtle Background Glow */}
                                <div className="absolute inset-0 -m-6 bg-gradient-to-br from-violet-500/5 via-purple-500/8 to-transparent rounded-full blur-3xl group-hover:from-violet-500/8 group-hover:via-purple-500/12 transition-all duration-700"></div>
                                
                                {/* Main Photo Container */}
                                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto">
                                    {/* Elegant Transparent Frame */}
                                    <div className="absolute inset-0">
                                        {/* Outer subtle glow ring */}
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-transparent p-[2px] group-hover:scale-[1.02] transition-all duration-500">
                                            <div className="w-full h-full rounded-full bg-gray-900/95 backdrop-blur-sm"></div>
                                        </div>
                                        
                                        {/* Inner frame with glass effect */}
                                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-800/30 via-gray-700/20 to-gray-900/40 backdrop-blur-lg border border-gray-600/20 group-hover:border-violet-500/30 transition-all duration-500">
                                            <div className="absolute inset-[1px] rounded-full overflow-hidden">
                                                {/* Photo */}
                                                <img 
                                                    src="/B3re.jpg" 
                                                    alt="Fadlil Ferdiansyah" 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                
                                                {/* Subtle overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-gray-900/10"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Minimal decorative accents */}
                                    <div className="absolute top-6 right-6 w-3 h-3 bg-violet-400/60 rounded-full animate-pulse"></div>
                                    <div className="absolute bottom-8 left-8 w-2 h-2 bg-purple-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                                    <div className="absolute top-1/3 left-4 w-1 h-8 bg-gradient-to-b from-violet-400/30 to-transparent rounded-full"></div>
                                    <div className="absolute bottom-1/3 right-4 w-1 h-6 bg-gradient-to-t from-purple-400/30 to-transparent rounded-full"></div>
                                </div>

                                {/* Bottom elegant accent */}
                                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;