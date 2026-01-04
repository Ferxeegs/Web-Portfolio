// src/app/projects/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, Github, ArrowLeft, Code2, Layers, Calendar, User } from 'lucide-react';
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

// generateMetadata sudah benar menggunakan await params
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => slugify(p.title) === slug);

    if (!project) {
        return { title: 'Project Not Found | Ferxcode' };
    }

    return {
        title: `${project.title} | Ferxcode Project`,
        description: project.description,
        openGraph: {
            title: `${project.title} - Portfolio Fadlil Ferdiansyah`,
            description: project.description,
            url: `https://ferxcode.my.id/projects/${slug}`,
            siteName: 'Ferxcode Portfolio',
            images: [
                {
                    url: project.imageUrl ?? '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ],
            locale: 'id_ID',
            type: 'article',
        },
    };
}

// PERBAIKAN: Ubah fungsi menjadi async dan await params
export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    // Await params terlebih dahulu sebelum digunakan
    const { slug } = await params;
    
    const project = projects.find((p) => slugify(p.title) === slug) as Project | undefined;

    if (!project) return notFound();

    return (
        <div className="min-h-screen bg-black text-gray-100 pb-20">
            {/* Background Decor */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] left-[-15%] w-[40%] h-[40%] bg-violet-600/10 blur-[140px] rounded-full animate-pulse" />
                <div className="absolute bottom-[5%] right-[-15%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[140px] rounded-full animate-pulse" />
                <div className="absolute top-[40%] right-[10%] w-[25%] h-[25%] bg-blue-500/5 blur-[100px] rounded-full" />
            </div>

            <div className="fixed inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 relative z-10">
                <Link
                    href="/#portfolio"
                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 hover:border-violet-500/50 hover:from-violet-500/10 hover:to-fuchsia-500/10 transition-all duration-300 mb-10 shadow-lg hover:shadow-violet-500/20"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Portfolio</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                    <div className="lg:col-span-8 space-y-10">
                        <ProjectGallery
                            images={
                                project.images && project.images.length
                                    ? project.images
                                    : [project.imageUrl ?? '/images/project-placeholder.png', project.imageUrl ?? '/images/project-placeholder.png', project.imageUrl ?? '/images/project-placeholder.png']
                            }
                            alt={project.title}
                        />

                        <div className="space-y-6">
                            <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white via-violet-200 to-fuchsia-300 bg-clip-text text-transparent leading-tight">
                                {project.title}
                            </h1>

                            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-700/50">
                                <div className="absolute -top-3 -left-3 w-16 h-16 bg-violet-500/10 blur-2xl rounded-full" />
                                <div className="relative z-10 space-y-4 text-justify">
                                    {project.longDescription && project.longDescription.length > 0 ? (
                                        project.longDescription.map((paragraph, i) => (
                                            <p key={i} className="text-lg text-gray-300 leading-relaxed">
                                                {paragraph}
                                            </p>
                                        ))
                                    ) : (
                                        <p className="text-lg text-gray-300 leading-relaxed">
                                            {project.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

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

                    <div className="lg:col-span-4 space-y-6">
                        <div className="sticky top-24 space-y-6">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
                                <div className="relative p-7 rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 space-y-6 shadow-2xl">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <div className="w-1 h-6 bg-gradient-to-b from-violet-500 to-fuchsia-500 rounded-full" />
                                        Project Details
                                    </h3>

                                    <div className="space-y-4">
                                        <DetailItem icon={<User className="w-4 h-4 text-violet-400" />} label="Role" value={project.role} />
                                        <DetailItem icon={<Calendar className="w-4 h-4 text-fuchsia-400" />} label="Timeline" value={project.timeline} />
                                        <DetailItem icon={<Code2 className="w-4 h-4 text-blue-400" />} label="Category" value={project.category} />
                                    </div>

                                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold uppercase tracking-wider text-violet-400">Tech Stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, i) => (
                                                <span key={i} className="px-3 py-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 text-violet-300 rounded-xl text-xs font-semibold">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="group/btn relative flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold transition-all overflow-hidden shadow-lg shadow-violet-600/30">
                                                <Github className="w-5 h-5 relative z-10" />
                                                <span className="relative z-10">View Repository</span>
                                            </a>
                                        )}
                                        {project.liveDemo && (
                                            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="group/btn relative flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-transparent border-2 border-gray-700 text-white font-bold transition-all">
                                                <ExternalLink className="w-5 h-5" />
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Komponen Pembantu agar kode lebih bersih
function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50">
            <div className="p-2 rounded-lg bg-gray-900/50">{icon}</div>
            <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm text-white font-semibold">{value || 'N/A'}</p>
            </div>
        </div>
    );
}