import React, { useState } from 'react';
import PortfolioItem from './PortfolioItem';
import { projects, certificates, techStack } from './Data';

interface PortfolioSectionProps {
    visibleElements: Set<string>;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ visibleElements }) => {
    const [activeSection, setActiveSection] = useState('projects');

    return (
        <section id="portfolio" className="py-16 sm:py-24 lg:py-32 px-4 relative">
            <div className="max-w-6xl mx-auto">
                <div className={`animate-on-scroll transition-all duration-1000 ${
                    visibleElements.has('portfolio-content') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`} id="portfolio-content">
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
                            {[
                                { key: 'projects', label: 'Projects' },
                                { key: 'certificates', label: 'Certificates' },
                                { key: 'techstack', label: 'Tech Stack' }
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveSection(tab.key)}
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
    );
};

export default PortfolioSection;