import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Project, Certificate, TechStack, PortfolioItemProps } from '../types';
import Image from 'next/image'; // Add this import

const PortfolioItem: React.FC<PortfolioItemProps> = ({ item, index }) => {
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

    const handleProjectClick = (link: string) => {
        if (isProject(item)) {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    const handleCertificateClick = (credentialLink: string) => {
        if (isCertificate(item) && credentialLink) {
            window.open(credentialLink, '_blank', 'noopener,noreferrer');
        }
    };

    const renderTechnologies = () => {
        if (isProject(item) || isTechStack(item)) {
            return (
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
            );
        }
        return null;
    };

    return (
        <div
            className={`group relative overflow-visible`}
            style={{
                animationDelay: `${index * 150}ms`,
                animation: 'slideInUp 0.8s ease-out forwards',
                padding: '1px'
            }}
        >
            {isCertificate(item) ? (
                // Certificate View - Only show image
                <div 
                    className="relative cursor-pointer overflow-hidden rounded-xl border border-violet-600/20 hover:border-violet-500/50 transition-all duration-300 aspect-video"
                    onClick={() => handleCertificateClick(item.credentialLink)}
                >
                    <Image 
                        src={item.imageUrl}
                        alt={item.title}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                            console.error('Error loading image:', item.imageUrl);
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            ) : (
                // Project and TechStack View
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
                                <div 
                                    className="p-1.5 sm:p-2 bg-violet-600/20 rounded-full opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleProjectClick(item.link);
                                    }}
                                >
                                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 cursor-pointer hover:text-violet-300" />
                                </div>
                            )}
                        </div>

                        <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base group-hover:text-gray-200 transition-colors duration-300">
                            {item.description}
                        </p>

                        {/* Render technologies only for Project and TechStack */}
                        {renderTechnologies()}
                    </div>

                    {/* Hover effect border */}
                    <div className="absolute -inset-[1px] rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-violet-600/50 via-purple-600/50 to-fuchsia-600/50 blur-xl transform scale-105" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortfolioItem;