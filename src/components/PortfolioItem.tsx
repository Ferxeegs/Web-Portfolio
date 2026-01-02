import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Project, Certificate, TechStack, Publication, PortfolioItemProps } from '../types';

const PortfolioItem: React.FC<PortfolioItemProps> = ({ item, type, index }) => {
    const isPublication = (item: Project | Certificate | TechStack | Publication): item is Publication => {
        return 'venue' in item || 'year' in item || 'description' in item && !('technologies' in item);
    };

    const isProject = (item: Project | Certificate | TechStack | Publication): item is Project => {
        return 'technologies' in item && 'link' in item;
    };

    const isCertificate = (item: Project | Certificate | TechStack | Publication): item is Certificate => {
        return 'issuer' in item;
    };

    const slugify = (s: string) =>
        s
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+|-+$/g, '');

    const handleCertificateClick = (credentialLink: string) => {
        if (isCertificate(item) && credentialLink) {
            window.open(credentialLink, '_blank', 'noopener,noreferrer');
        }
    };

    // Fungsi untuk menangani klik external link agar tidak memicu Link parent
    const handleExternalClick = (e: React.MouseEvent, url: string) => {
        e.preventDefault(); // Mencegah navigasi Link Next.js
        e.stopPropagation(); // Mencegah event bubbling ke parent
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleProjectImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = '/images/project-placeholder.png';
    };

    const handleCertificateImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = '/images/certificate-placeholder.png';
    };

    const renderTechnologies = () => {
        if (isProject(item)) {
            return (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-24 overflow-hidden">
                    {item.technologies.slice(0, 6).map((tech: string, techIndex: number) => (
                        <span
                            key={techIndex}
                            className="px-2 py-1 sm:px-2.5 sm:py-1 bg-gray-800/50 text-gray-300 rounded-full text-xs sm:text-sm border border-gray-700/50 hover:bg-violet-600/20 hover:text-violet-300 hover:border-violet-500/50 transition-all duration-300 cursor-default backdrop-blur-sm"
                        >
                            {tech}
                        </span>
                    ))}
                    {item.technologies.length > 6 && (
                        <span className="px-2 py-1 sm:px-2.5 sm:py-1 bg-gray-800/30 text-gray-400 rounded-full text-xs sm:text-sm border border-gray-700/30 cursor-default backdrop-blur-sm">
                            +{item.technologies.length - 6}
                        </span>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div
            className={`group relative overflow-visible ${type === 'techstack' ? 'tech-pop' : 'animate-float-up'} ${type === 'projects' ? 'h-full' : ''}`}
            style={{ animationDelay: `${index * (type === 'techstack' ? 50 : 150)}ms` }}
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
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white font-bold text-base sm:text-lg mb-1">{item.title}</h3>
                        <p className="text-gray-300 text-xs sm:text-sm">{item.issuer}</p>
                    </div>
                </div>
            ) : isProject(item) ? (
                (() => {
                    const projectSlug = slugify(item.title);
                    return (
                        <Link
                            href={`/projects/${projectSlug}`}
                            className="relative block h-full bg-black/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 group-hover:transform group-hover:-translate-y-2 group-hover:border-violet-500/50 group-hover:shadow-2xl group-hover:shadow-violet-500/20 cursor-pointer flex flex-col"
                        >
                            {(item as Project).imageUrl && (
                                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden flex-shrink-0">
                                    <img
                                        src={(item as Project).imageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                        onError={handleProjectImageError}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                    {/* PERBAIKAN: Mengganti <a> menjadi <button> */}
                                    <button
                                        onClick={(e) => handleExternalClick(e, item.link)}
                                        className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 z-20"
                                    >
                                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </button>

                                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                                        <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl mb-2 tracking-tight drop-shadow-lg">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            )}

                            <div className="relative p-4 sm:p-6 lg:p-8 flex-1 flex flex-col">
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 via-purple-600/0 to-fuchsia-600/0 group-hover:from-violet-600/10 group-hover:via-purple-600/5 group-hover:to-fuchsia-600/10 transition-all duration-700" />
                                <div className="relative z-10 flex-1 flex flex-col">
                                    {!(item as Project).imageUrl && (
                                        <div className="flex justify-between items-start mb-4 sm:mb-6">
                                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-violet-300 transition-all duration-300 tracking-tight pr-2">
                                                {item.title}
                                            </h3>
                                            {/* PERBAIKAN: Mengganti <a> menjadi <button> */}
                                            <button
                                                onClick={(e) => handleExternalClick(e, item.link)}
                                                className="p-1.5 sm:p-2 bg-violet-600/20 rounded-full opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 z-20"
                                            >
                                                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 hover:text-violet-300" />
                                            </button>
                                        </div>
                                    )}
                                    <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base group-hover:text-gray-200 transition-colors duration-300 line-clamp-3 flex-shrink-0">
                                        {item.description}
                                    </p>
                                    <div className="mt-auto">
                                        {renderTechnologies()}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -inset-[1px] rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-violet-600/50 via-purple-600/50 to-fuchsia-600/50 blur-xl transform scale-105" />
                            </div>
                        </Link>
                    );
                })()
            ) : isPublication(item) ? (
                <article className="group/pub relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-900/40 via-gray-900/60 to-black/40 border border-gray-800/50 hover:border-violet-500/30 transition-all duration-500 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 blur-[50px] rounded-full -mr-16 -mt-16 group-hover/pub:bg-violet-600/10 transition-colors duration-500" />

                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 relative z-10">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] uppercase tracking-wider font-semibold">
                                    {item.year}
                                </span>
                                <span className="text-gray-500 text-xs font-medium">
                                    {item.venue}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white group-hover/pub:text-violet-300 transition-colors duration-300 leading-tight">
                                {item.title}
                            </h3>
                        </div>

                        {item.link && (
                            <button
                                onClick={(e) => handleExternalClick(e, item.link!)}
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-violet-600 text-gray-300 hover:text-white rounded-xl border border-white/10 hover:border-violet-400 transition-all duration-300 text-sm group/btn"
                            >
                                <span>Read Paper</span>
                                <ExternalLink className="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </button>
                        )}
                    </div>

                    <div className="mt-4 relative z-10">
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed line-clamp-3 group-hover/pub:text-gray-300 transition-colors duration-300">
                            {item.description}
                        </p>
                    </div>

                    {/* Bottom Border Accent */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-violet-600 to-purple-600 group-hover/pub:w-full transition-all duration-700" />
                </article>
            ) : (
                <div className="relative bg-black/40 backdrop-blur-xl border border-gray-800/50 rounded-xl p-4 transition-all duration-300 group-hover:transform group-hover:-translate-y-2 group-hover:rotate-2 group-hover:border-violet-500/50 group-hover:shadow-lg group-hover:shadow-violet-500/20">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-violet-600/10 rounded-xl border border-violet-600/20 group-hover:border-violet-500/50 transition-all duration-300 p-2 sm:p-3 group-hover:rotate-[-2deg] group-hover:scale-110">
                            <img
                                src={(item as TechStack).imageUrl}
                                alt={`${(item as TechStack).name} logo`}
                                className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
                            />
                        </div>
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