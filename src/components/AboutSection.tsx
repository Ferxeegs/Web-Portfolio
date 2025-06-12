// components/AboutSection.tsx
import React from 'react';
import { socialLinks } from './Data';

interface AboutSectionProps {
    visibleElements: Set<string>;
}

const AboutSection: React.FC<AboutSectionProps> = ({ visibleElements }) => {
    return (
        <section id="about" className="py-16 sm:py-24 lg:py-32 px-4 relative">
            <div className="max-w-7xl mx-auto">
                <div className={`grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center animate-on-scroll transition-all duration-1000 ${
                    visibleElements.has('about-content') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
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
    );
};

export default AboutSection;