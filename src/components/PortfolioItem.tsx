import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
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

    const renderProjectTechnologies = (project: Project) => (
        <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech) => (
                <span
                    key={tech}
                    className="rounded-md border border-gray-700/70 bg-gray-900/80 px-2 py-0.5 text-[11px] text-gray-200 transition-colors duration-300 group-hover:border-violet-500/40 group-hover:text-violet-100 sm:text-xs"
                >
                    {tech}
                </span>
            ))}
            {project.technologies.length > 5 && (
                <span className="rounded-md border border-gray-700/50 bg-gray-900/60 px-2 py-0.5 text-[11px] text-gray-300 sm:text-xs">
                    +{project.technologies.length - 5}
                </span>
            )}
        </div>
    );

    return (
        <div
            className={`group relative overflow-visible ${type === 'techstack' ? 'tech-pop' : ''} ${type === 'projects' ? 'h-full' : ''}`}
            style={type === 'techstack' ? { animationDelay: `${index * 50}ms` } : undefined}
        >
            {isCertificate(item) ? (
                <div
                    className="relative cursor-pointer overflow-hidden rounded-xl border border-violet-600/20 hover:border-violet-500/50 transition-all duration-300 aspect-video max-h-[200px] sm:max-h-[220px] lg:max-h-[240px]"
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
                    const project = item as Project;
                    const projectSlug = slugify(project.title);

                    return (
                        <Link
                            href={`/projects/${projectSlug}`}
                            className="project-card group/project relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-800/60 bg-black/35 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-violet-500/35 hover:shadow-xl hover:shadow-violet-500/10"
                        >
                            {project.imageUrl && (
                                <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover/project:scale-[1.04]"
                                        onError={handleProjectImageError}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-80" />

                                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                                        {project.category && (
                                            <span className="rounded-md border border-violet-400/50 bg-gray-950/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-100 shadow-lg shadow-black/30 backdrop-blur-sm sm:text-[11px]">
                                                {project.category}
                                            </span>
                                        )}
                                        {project.timeline && (
                                            <span className="rounded-md border border-white/20 bg-gray-950/90 px-2.5 py-1 text-[10px] font-medium text-gray-100 shadow-lg shadow-black/30 backdrop-blur-sm sm:text-[11px]">
                                                {project.timeline}
                                            </span>
                                        )}
                                    </div>

                                    <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-all duration-300 group-hover/project:opacity-100">
                                        <button
                                            type="button"
                                            onClick={(e) => handleExternalClick(e, project.link)}
                                            aria-label="View GitHub repository"
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-700/60 bg-black/50 text-gray-300 backdrop-blur-md transition-colors hover:border-violet-500/40 hover:text-white"
                                        >
                                            <Github className="h-3.5 w-3.5" />
                                        </button>
                                        {project.liveDemo && (
                                            <button
                                                type="button"
                                                onClick={(e) => handleExternalClick(e, project.liveDemo!)}
                                                aria-label="Open live demo"
                                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-700/60 bg-black/50 text-gray-300 backdrop-blur-md transition-colors hover:border-violet-500/40 hover:text-white"
                                            >
                                                <ExternalLink className="h-3.5 w-3.5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                                <div className="mb-3 flex items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-base font-bold leading-snug text-white transition-colors duration-300 group-hover/project:text-violet-100 sm:text-lg">
                                            {project.title}
                                        </h3>
                                        {project.role && (
                                            <p className="mt-1 text-xs font-medium text-violet-300 sm:text-sm">
                                                {project.role}
                                            </p>
                                        )}
                                    </div>
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-800/60 bg-gray-900/40 text-gray-500 transition-all duration-300 group-hover/project:border-violet-500/30 group-hover/project:bg-violet-500/10 group-hover/project:text-violet-300">
                                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/project:translate-x-0.5 group-hover/project:-translate-y-0.5" />
                                    </span>
                                </div>

                                <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover/project:text-gray-300">
                                    {project.description}
                                </p>

                                <div className="mt-auto space-y-4 border-t border-gray-800/50 pt-4">
                                    {renderProjectTechnologies(project)}
                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-violet-300 transition-colors duration-300 group-hover/project:text-violet-200">
                                        View case study
                                        <ArrowUpRight className="h-3 w-3" />
                                    </span>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 transition-all duration-500 group-hover/project:w-full" />
                        </Link>
                    );
                })()
            ) : isPublication(item) ? (
                <article className="group/pub relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-900/40 via-gray-900/60 to-black/40 border border-gray-800/50 hover:border-violet-500/30 transition-all duration-500 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 blur-[50px] rounded-full -mr-16 -mt-16 group-hover/pub:bg-violet-600/10 transition-colors duration-500" />

                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 relative z-10">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="rounded-full border border-violet-400/35 bg-violet-950/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-100">
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