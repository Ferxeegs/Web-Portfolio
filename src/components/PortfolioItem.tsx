import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Project, Certificate, TechStack, PortfolioItemProps } from '../types';

const PortfolioItem: React.FC<PortfolioItemProps> = ({ item, type, index }) => {
    const isProject = (item: Project | Certificate | TechStack): item is Project => {
        return 'link' in item;
    };

    const isCertificate = (item: Project | Certificate | TechStack): item is Certificate => {
        return 'issuer' in item;
    };

    const isTechStack = (item: Project | Certificate | TechStack): item is TechStack => {
        return 'category' in item;
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

    const handleProjectImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        console.error('Project image failed to load:', (item as Project).imageUrl);
        e.currentTarget.src = '/images/project-placeholder.png';
    };

    const handleCertificateImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        console.error('Certificate image failed to load:', (item as Certificate).imageUrl);
        e.currentTarget.src = '/images/certificate-placeholder.png';
    };

    const renderTechnologies = () => {
        if (isProject(item)) {
            return (
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {item.technologies.map((tech: string, techIndex: number) => (
                        <span
                            key={techIndex}
                            className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 bg-gray-800/50 text-gray-300 rounded-full text-xs sm:text-sm border border-gray-700/50 hover:bg-violet-600/20 hover:text-violet-300 hover:border-violet-500/50 transition-all duration-300 cursor-default backdrop-blur-sm"
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
            className={`
                group relative overflow-visible 
                ${type === 'techstack' ? 'tech-pop' : 'animate-float-up'}
            `}
            style={{ 
                animationDelay: `${index * (type === 'techstack' ? 50 : 150)}ms`
            }}
        >
            {isCertificate(item) ? (
                <div 
                    className="relative cursor-pointer overflow-hidden rounded-xl border border-violet-600/20 hover:border-violet-500/50 transition-all duration-300 aspect-video max-h-[200px] sm:max-h-[220px] lg:max-h-[240px] animate-scale-in"
                    style={{ animationDelay: `${index * 100 + 200}ms` }}
                    onClick={() => handleCertificateClick(item.credentialLink)}
                >
                    <div className="relative w-full h-full">
                        <img 
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            onError={handleCertificateImageError}
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Certificate Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white font-bold text-base sm:text-lg mb-1">{item.title}</h3>
                        {isCertificate(item) && (
                            <p className="text-gray-300 text-xs sm:text-sm">{item.issuer}</p>
                        )}
                    </div>
                </div>
            ) : isProject(item) ? (
                // Enhanced Project View with Image
                <div 
                    className="relative bg-black/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 group-hover:transform group-hover:-translate-y-2 group-hover:border-violet-500/50 group-hover:shadow-2xl group-hover:shadow-violet-500/20 cursor-pointer"
                    onClick={() => handleProjectClick(item.link)}
                >
                    {/* Project Image Section */}
                    {(item as Project).imageUrl && (
                        <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                            <img 
                                src={(item as Project).imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                onError={handleProjectImageError}
                            />
                            
                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                            
                            {/* External Link Icon on Image */}
                            <div className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            
                            {/* Project Title Overlay on Image */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                                <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl mb-2 tracking-tight drop-shadow-lg">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    )}

                    {/* Project Content Section */}
                    <div className="relative p-4 sm:p-6 lg:p-8">
                        {/* Inner gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 via-purple-600/0 to-fuchsia-600/0 group-hover:from-violet-600/10 group-hover:via-purple-600/5 group-hover:to-fuchsia-600/10 transition-all duration-700" />

                        {/* Content */}
                        <div className="relative z-10">
                            {/* Title for projects without image */}
                            {!(item as Project).imageUrl && (
                                <div className="flex justify-between items-start mb-4 sm:mb-6">
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-violet-300 transition-all duration-300 tracking-tight pr-2">
                                        {item.title}
                                    </h3>
                                    <div className="p-1.5 sm:p-2 bg-violet-600/20 rounded-full opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0">
                                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 hover:text-violet-300" />
                                    </div>
                                </div>
                            )}

                            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base group-hover:text-gray-200 transition-colors duration-300">
                                {item.description}
                            </p>

                            {renderTechnologies()}
                        </div>
                    </div>

                    {/* Hover effect border */}
                    <div className="absolute -inset-[1px] rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-violet-600/50 via-purple-600/50 to-fuchsia-600/50 blur-xl transform scale-105" />
                    </div>
                </div>
            ) : (
                // Updated TechStack View with Image
                <div 
                    className="relative bg-black/40 backdrop-blur-xl border border-gray-800/50 rounded-xl p-4 transition-all duration-300 group-hover:transform group-hover:-translate-y-2 group-hover:rotate-2 group-hover:border-violet-500/50 group-hover:shadow-lg group-hover:shadow-violet-500/20"
                >
                    <div className="flex flex-col items-center gap-3">
                        {/* Tech Image */}
                        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-violet-600/10 rounded-xl border border-violet-600/20 group-hover:border-violet-500/50 transition-all duration-300 p-2 sm:p-3 group-hover:rotate-[-2deg] group-hover:scale-110">
                            <img 
                                src={(item as TechStack).imageUrl}
                                alt={`${(item as TechStack).name} logo`}
                                className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
                            />
                        </div>
                        
                        {/* Name */}
                        <h3 className="text-sm sm:text-base font-medium text-gray-300 group-hover:text-violet-300 transition-colors duration-300 text-center">
                            {(item as TechStack).name}
                        </h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortfolioItem;