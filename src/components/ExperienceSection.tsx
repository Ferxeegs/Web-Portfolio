'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Building2, GraduationCap, MapPin } from 'lucide-react';
import { experiences } from '../constants/Data';
import { Experience, ExperienceAccent, ExperienceType } from '../types';

interface ExperienceSectionProps {
    visibleElements: Set<string>;
}

const accentStyles: Record<ExperienceAccent, {
    border: string;
    glow: string;
    badge: string;
    dot: string;
    icon: string;
    hover: string;
    bar: string;
}> = {
    violet: {
        border: 'border-violet-500/25',
        glow: 'bg-violet-600/10',
        badge: 'border-violet-500/25 bg-violet-500/10 text-violet-300',
        dot: 'bg-violet-400 shadow-violet-400/50',
        icon: 'from-violet-500 to-purple-600 shadow-violet-500/25',
        hover: 'group-hover:border-violet-500/40 group-hover:shadow-violet-500/10',
        bar: 'from-violet-500 to-purple-500',
    },
    cyan: {
        border: 'border-cyan-500/25',
        glow: 'bg-cyan-600/10',
        badge: 'border-cyan-500/25 bg-cyan-500/10 text-cyan-300',
        dot: 'bg-cyan-400 shadow-cyan-400/50',
        icon: 'from-cyan-500 to-blue-600 shadow-cyan-500/25',
        hover: 'group-hover:border-cyan-500/40 group-hover:shadow-cyan-500/10',
        bar: 'from-cyan-500 to-blue-500',
    },
    fuchsia: {
        border: 'border-fuchsia-500/25',
        glow: 'bg-fuchsia-600/10',
        badge: 'border-fuchsia-500/25 bg-fuchsia-500/10 text-fuchsia-300',
        dot: 'bg-fuchsia-400 shadow-fuchsia-400/50',
        icon: 'from-fuchsia-500 to-violet-600 shadow-fuchsia-500/25',
        hover: 'group-hover:border-fuchsia-500/40 group-hover:shadow-fuchsia-500/10',
        bar: 'from-fuchsia-500 to-violet-500',
    },
};

const typeIcons: Record<ExperienceType, typeof Briefcase> = {
    work: Briefcase,
    education: GraduationCap,
};

const RoleCard: React.FC<{
    item: Experience;
    isVisible: boolean;
    delay: number;
    featured?: boolean;
}> = ({ item, isVisible, delay, featured = false }) => {
    const accent = accentStyles[item.accent ?? 'violet'];
    const Icon = typeIcons[item.type];

    return (
        <article
            className={`experience-role group relative overflow-hidden rounded-2xl border bg-black/45 backdrop-blur-xl transition-all duration-500 ${accent.border} ${accent.hover} ${
                featured ? 'p-6 sm:p-7' : 'p-5 sm:p-6'
            } ${isVisible ? 'experience-role--visible' : 'experience-role--hidden'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl ${accent.glow}`} />

            <div className="relative z-10">
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div
                        className={`flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg ${accent.icon} ${
                            featured ? 'h-11 w-11' : 'h-10 w-10'
                        }`}
                    >
                        <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                    </div>
                    {item.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                            <span className={`h-1.5 w-1.5 animate-pulse rounded-full shadow ${accent.dot}`} />
                            Active
                        </span>
                    )}
                </div>

                <div className="space-y-1">
                    <h3 className={`font-bold text-white ${featured ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
                        {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-gray-200 sm:text-base">{item.organization}</p>
                    {item.subtitle && (
                        <p className="flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
                            <Building2 className="h-3.5 w-3.5 shrink-0 text-gray-600" />
                            {item.subtitle}
                        </p>
                    )}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 sm:text-sm">
                    <time className="font-medium text-gray-400">{item.period}</time>
                    <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-gray-600" />
                        {item.location}
                    </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-[15px]">
                    {item.description}
                </p>

                <ul className="mt-4 space-y-2">
                    {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2 text-sm leading-relaxed text-gray-300">
                            <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${accent.dot.split(' ')[0]}`} />
                            {highlight}
                        </li>
                    ))}
                </ul>

                {item.technologies && item.technologies.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-800/50 pt-4">
                        {item.technologies.map((tech) => (
                            <span
                                key={tech}
                                className={`rounded-lg border px-2.5 py-1 text-xs ${accent.badge}`}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r transition-all duration-700 group-hover:w-full ${accent.bar}`} />
        </article>
    );
};

const PastItem: React.FC<{ item: Experience; isVisible: boolean; delay: number; isLast: boolean }> = ({
    item,
    isVisible,
    delay,
    isLast,
}) => {
    const accent = accentStyles[item.accent ?? 'violet'];
    const Icon = typeIcons[item.type];
    const isEducation = item.type === 'education';

    return (
        <div
            className={`experience-past relative grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-6 ${
                isVisible ? 'experience-past--visible' : 'experience-past--hidden'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="flex flex-col items-center">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br sm:h-10 sm:w-10 ${accent.icon}`}>
                    <Icon className="h-4 w-4 text-white" strokeWidth={2} />
                </div>
                {!isLast && (
                    <div className="experience-past__connector mt-2 w-px flex-1 min-h-[2rem] bg-gradient-to-b from-gray-700/80 to-gray-800/20" />
                )}
            </div>

            <div className={`mb-8 sm:mb-10 ${isLast ? 'mb-0' : ''}`}>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${accent.badge}`}>
                        {isEducation ? 'Education' : 'Past Role'}
                    </span>
                    <time className="text-xs font-medium text-gray-500">{item.period}</time>
                </div>
                <h3 className="text-base font-bold text-white sm:text-lg">{item.title}</h3>
                <p className="text-sm text-violet-300/80">{item.organization}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-400 line-clamp-2 sm:line-clamp-none">
                    {item.description}
                </p>
            </div>
        </div>
    );
};

const ExperienceSection: React.FC<ExperienceSectionProps> = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const currentRoles = experiences.filter((e) => e.current);
    const pastEntries = experiences.filter((e) => !e.current);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.08, rootMargin: '40px 0px' },
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative overflow-hidden px-4 py-16 sm:py-20 lg:py-24"
        >
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/5 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-cyan-600/5 blur-3xl" />
            </div>

            <div className="mx-auto max-w-5xl">
                <div
                    className={`mb-10 text-center transition-all duration-1000 sm:mb-14 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-violet-400/80 sm:text-sm">
                        Career Journey
                    </p>
                    <h2 className="mb-3 bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl lg:text-4xl">
                        Experience
                    </h2>
                    <p className="mx-auto max-w-2xl text-sm text-gray-400 sm:text-base">
                        Currently contributing across academic and industry environments — building
                        production systems at Universitas Diponegoro and Jaya Techno.
                    </p>
                </div>

                {/* Dual current roles */}
                <div
                    className={`mb-12 transition-all duration-700 sm:mb-16 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`}
                    style={{ transitionDelay: '100ms' }}
                >
                    <div className="mb-5 flex items-center justify-center gap-3">
                        <div className="h-px flex-1 max-w-[4rem] bg-gradient-to-r from-transparent to-violet-500/40 sm:max-w-[6rem]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                            Currently Working At
                        </span>
                        <div className="h-px flex-1 max-w-[4rem] bg-gradient-to-l from-transparent to-cyan-500/40 sm:max-w-[6rem]" />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 md:gap-6">
                        {currentRoles.map((item, index) => (
                            <RoleCard
                                key={item.id}
                                item={item}
                                isVisible={isVisible}
                                delay={150 + index * 100}
                                featured
                            />
                        ))}
                    </div>
                </div>

                {/* Past experience */}
                {pastEntries.length > 0 && (
                    <div>
                        <div
                            className={`mb-6 flex items-center gap-3 transition-all duration-700 ${
                                isVisible ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{ transitionDelay: '350ms' }}
                        >
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-600">
                                Earlier Journey
                            </span>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
                        </div>

                        <div className="rounded-2xl border border-gray-800/50 bg-black/25 p-5 backdrop-blur-sm sm:p-8">
                            {pastEntries.map((item, index) => (
                                <PastItem
                                    key={item.id}
                                    item={item}
                                    isVisible={isVisible}
                                    delay={400 + index * 80}
                                    isLast={index === pastEntries.length - 1}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ExperienceSection;
