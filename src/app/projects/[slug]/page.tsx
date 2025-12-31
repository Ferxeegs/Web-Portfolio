// src/app/projects/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, Github, ArrowLeft, Code2, Layers, Calendar, User, Star } from 'lucide-react';
import { projects } from '../../../constants/Data';
import ProjectGallery from '../../../components/ProjectGallery';
import { Project } from '../../../types';


const slugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '');

export default function ProjectDetailPage(props: unknown) {
    const { params } = props as { params: { slug: string } };
    const project = projects.find((p) => slugify(p.title) === params.slug) as Project | undefined;

    if (!project) return notFound();

    return (
        <div className="min-h-screen bg-black text-gray-100 pb-20">
            {/* Enhanced Background Decor */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] left-[-15%] w-[40%] h-[40%] bg-violet-600/10 blur-[140px] rounded-full animate-pulse" />
                <div className="absolute bottom-[5%] right-[-15%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[140px] rounded-full animate-pulse" />
                <div className="absolute top-[40%] right-[10%] w-[25%] h-[25%] bg-blue-500/5 blur-[100px] rounded-full" />
            </div>

            {/* Gradient Mesh Overlay */}
            <div className="fixed inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 relative z-10">
                {/* Enhanced Back Button */}
                <Link
                    href="/#portfolio"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 hover:border-violet-500/50 hover:from-violet-500/10 hover:to-fuchsia-500/10 transition-all duration-300 mb-10 shadow-lg hover:shadow-violet-500/20"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Portfolio</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                    {/* Left Column: Image Gallery & Description */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Gallery */}
                        <ProjectGallery
                            images={
                                project && project.images && project.images.length
                                    ? project.images
                                    : [project?.imageUrl ?? '/images/project-placeholder.png', project?.imageUrl ?? '/images/project-placeholder.png', project?.imageUrl ?? '/images/project-placeholder.png']
                            }
                            alt={project?.title ?? 'Project image'}
                        />

                        {/* Project Header */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white via-violet-200 to-fuchsia-300 bg-clip-text text-transparent leading-tight">
                                    {project.title}
                                </h1>
                            </div>

                            {/* Description */}
                            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-700/50">
                                <div className="absolute -top-3 -left-3 w-16 h-16 bg-violet-500/10 blur-2xl rounded-full" />

                                {/* Menggunakan div sebagai container dan space-y untuk jarak antar paragraf */}
                                <div className="relative z-10 space-y-4 text-justify">
                                    {project.longDescription && project.longDescription.length > 0 ? (
                                        project.longDescription.map((paragraph, i) => (
                                            <p key={i} className="text-lg text-gray-300 leading-relaxed">
                                                {paragraph}
                                            </p>
                                        ))
                                    ) : (
                                        // Fallback jika longDescription kosong, gunakan deskripsi singkat
                                        <p className="text-lg text-gray-300 leading-relaxed">
                                            {project.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Key Features */}
                        {project.features && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
                                        <Layers className="w-5 h-5 text-violet-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Key Features</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.features.map((feature, i) => (
                                        <div
                                            key={i}
                                            className="group relative p-5 rounded-2xl bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:border-violet-500/50 transition-all duration-300 hover:scale-[1.02]"
                                        >
                                            <div className="absolute -top-2 -left-2 w-20 h-20 bg-violet-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="flex items-start gap-3 relative z-10">
                                                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0 mt-0.5">
                                                    <div className="w-2 h-2 rounded-full bg-white" />
                                                </div>
                                                <span className="text-gray-200 text-sm leading-relaxed">{feature}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Enhanced Metadata & Actions */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="sticky top-24 space-y-6">
                            {/* Project Info Card */}
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
                                <div className="relative p-7 rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 space-y-6 shadow-2xl">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full" />
                                        Project Details
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50">
                                            <div className="p-2 rounded-lg bg-violet-500/10">
                                                <User className="w-4 h-4 text-violet-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Role</p>
                                                <p className="text-sm text-white font-semibold">{project.role || 'Full Stack Developer'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50">
                                            <div className="p-2 rounded-lg bg-fuchsia-500/10">
                                                <Calendar className="w-4 h-4 text-fuchsia-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Timeline</p>
                                                <p className="text-sm text-white font-semibold">{project.timeline || '2024 - 2025'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50">
                                            <div className="p-2 rounded-lg bg-blue-500/10">
                                                <Code2 className="w-4 h-4 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400">Category</p>
                                                <p className="text-sm text-white font-semibold">{project.category || 'Web Application'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold uppercase tracking-wider text-violet-400 flex items-center gap-2">
                                            <div className="w-1 h-4 bg-violet-500 rounded-full" />
                                            Tech Stack
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 text-violet-300 rounded-xl text-xs font-semibold hover:border-violet-400/50 hover:scale-105 transition-all duration-200 cursor-default"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group/btn relative flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold transition-all shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.02] overflow-hidden"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                                                <Github className="w-5 h-5 relative z-10" />
                                                <span className="relative z-10">View Repository</span>
                                            </a>
                                        )}
                                        {project.liveDemo && (
                                            <a
                                                href={project.liveDemo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group/btn relative flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-transparent border-2 border-gray-700 hover:border-violet-500 hover:bg-violet-500/10 text-white font-bold transition-all hover:scale-[1.02]"
                                            >
                                                <ExternalLink className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced CTA Card */}
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity animate-pulse" />
                                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-violet-600/20 via-fuchsia-600/20 to-pink-600/20 backdrop-blur-xl border border-violet-500/30 text-center space-y-4">
                                    <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-2">
                                        <Star className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-2">Love This Project?</h4>
                                        <p className="text-sm text-gray-300">Let&apos;s build something amazing together</p>
                                    </div>
                                    <Link
                                        href="/#contact"
                                        className="group/cta relative block w-full text-center py-4 rounded-2xl bg-white text-black font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/20 to-violet-500/0 translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700" />
                                        <span className="relative z-10">Let&apos;s Talk →</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}