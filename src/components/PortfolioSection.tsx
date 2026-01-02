import React, { useState, useEffect } from 'react';
import PortfolioItem from './PortfolioItem';
import { projects, certificates, techStack, portfolioTabs, publications } from '../constants/Data';
import { PortfolioItemType } from '../types';

interface PortfolioSectionProps {
    visibleElements: Set<string>;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ }) => {
    const [activeSection, setActiveSection] = useState<PortfolioItemType>('projects');
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

        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
            observer.observe(portfolioSection);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="portfolio" className="py-8 sm:py-12 lg:py-20 px-4 relative">
            <div className="max-w-6xl mx-auto">
                <div className={`transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                    <div className="text-center mb-4 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                            Portfolio
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto px-4">
                            A collection of my best work showcasing skills and creativity
                        </p>
                    </div>

                    {/* Portfolio Navigation */}
                    <div className="flex justify-center mb-8 sm:mb-12 px-4">
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 bg-black/40 backdrop-blur-xl rounded-xl sm:rounded-2xl p-2 border border-gray-800/50 w-full sm:w-auto">
                            {portfolioTabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveSection(tab.key as PortfolioItemType)}
                                    className={`px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                                        activeSection === tab.key
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
                    <div className={`grid gap-4 sm:gap-6 p-1 items-stretch ${
                        activeSection === 'techstack' 
                            ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6' 
                            : activeSection === 'publications'
                                ? 'grid-cols-1'
                                : 'sm:grid-cols-2 lg:grid-cols-3'
                    }`}>
                        {activeSection === 'projects' && projects.map((project, index) => (
                            <PortfolioItem 
                                key={project.title} 
                                item={project} 
                                type="projects" 
                                index={index} 
                            />
                        ))}
                        {activeSection === 'certificates' && certificates.map((cert, index) => (
                            <PortfolioItem 
                                key={cert.title} 
                                item={cert} 
                                type="certificates" 
                                index={index} 
                            />
                        ))}
                        {activeSection === 'techstack' && techStack.map((tech, index) => (
                            <PortfolioItem 
                                key={tech.name} 
                                item={tech} 
                                type="techstack" 
                                index={index} 
                            />
                        ))}
                        {activeSection === 'publications' && publications.map((pub, i) => (
                            <PortfolioItem key={`pub-${i}`} item={pub} type="publications" index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioSection;