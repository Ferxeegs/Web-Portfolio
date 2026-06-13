'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Github, Linkedin, Instagram, Phone } from 'lucide-react';
import HeroSolarSystem from './HeroSolarSystem';

interface HeroSectionProps {
    scrollToSection: (sectionId: string) => void;
}

const socialLinks = [
    { href: 'https://github.com/Ferxeegs', icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com/in/fadlilfer/', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://instagram.com/fadlilfer_', icon: Instagram, label: 'Instagram' },
    { href: 'https://wa.me/6282133513522', icon: Phone, label: 'WhatsApp' },
] as const;

const workplaces = [
    { name: 'Universitas Diponegoro', remote: false },
    { name: 'Jaya Techno', remote: true },
];

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const fadeUp = 'transition-all duration-700 ease-out';
    const visible = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5';

    return (
        <section
            id="home"
            className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
        >
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-violet-600/[0.07] blur-3xl" />
                <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-600/[0.06] blur-3xl" />
                <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-600/[0.04] blur-3xl" />
            </div>

            <div className="mx-auto w-full max-w-6xl">
                <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 xl:gap-16">
                    <div className="order-2 space-y-7 text-center lg:order-1 lg:text-left">
                        <div
                            className={`inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.08] px-3.5 py-1.5 backdrop-blur-sm ${fadeUp} ${visible}`}
                            style={{ transitionDelay: '0ms' }}
                        >
                            {/* <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-100 sm:text-xs">
                                Open to opportunities
                            </span> */}
                        </div>

                        <div className="space-y-3" style={{ transitionDelay: '80ms' }}>
                            <p
                                className={`text-sm font-medium tracking-wide text-violet-300/90 sm:text-base ${fadeUp} ${visible}`}
                                style={{ transitionDelay: '80ms' }}
                            >
                                Hello, I&apos;m
                            </p>
                            <h1
                                className={`text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl xl:text-[3.25rem] ${fadeUp} ${visible}`}
                                style={{ transitionDelay: '160ms' }}
                            >
                                <span className="bg-gradient-to-r from-white via-violet-100 to-gray-300 bg-clip-text text-transparent">
                                    Fadlil Ferdiansyah
                                </span>
                            </h1>
                            <p
                                className={`text-lg font-semibold sm:text-xl lg:text-2xl ${fadeUp} ${visible}`}
                                style={{ transitionDelay: '240ms' }}
                            >
                                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                                    Full-Stack Developer
                                </span>
                            </p>
                        </div>

                        <div
                            className={`flex flex-wrap items-center justify-center gap-2 lg:justify-start ${fadeUp} ${visible}`}
                            style={{ transitionDelay: '320ms' }}
                        >
                            <span className="rounded-lg border border-gray-700/60 bg-gray-900/60 px-3 py-1 text-xs text-gray-200 backdrop-blur-sm sm:text-sm">
                                Computer Engineering
                            </span>
                            <span className="text-gray-600">·</span>
                            <span className="rounded-lg border border-gray-700/60 bg-gray-900/60 px-3 py-1 text-xs text-gray-200 backdrop-blur-sm sm:text-sm">
                                Diponegoro University
                            </span>
                        </div>

                        <div
                            className={`flex flex-wrap justify-center gap-2 lg:justify-start ${fadeUp} ${visible}`}
                            style={{ transitionDelay: '400ms' }}
                        >
                            {workplaces.map((place) => (
                                <span
                                    key={place.name}
                                    className="rounded-full border border-cyan-400/35 bg-cyan-950/70 px-3 py-1 text-[11px] font-medium text-cyan-100 sm:text-xs"
                                >
                                    {place.name}
                                    {place.remote && (
                                        <span className="ml-1.5 text-cyan-300/80">· Remote</span>
                                    )}
                                </span>
                            ))}
                        </div>

                        <p
                            className={`mx-auto max-w-lg text-sm leading-relaxed text-gray-400 sm:text-base lg:mx-0 ${fadeUp} ${visible}`}
                            style={{ transitionDelay: '480ms' }}
                        >
                            Building and managing digital platforms within the UNDIP ecosystem — bridging
                            software development with production infrastructure, from containerized
                            deployments to polished user experiences.
                        </p>

                        <div
                            className={`flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start ${fadeUp} ${visible}`}
                            style={{ transitionDelay: '560ms' }}
                        >
                            <button
                                onClick={() => scrollToSection('portfolio')}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-300 hover:from-violet-500 hover:to-purple-500 hover:shadow-violet-500/30 sm:w-auto sm:text-base"
                            >
                                View My Work
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                            <button
                                onClick={() => scrollToSection('experience')}
                                className="w-full rounded-xl border border-gray-700/60 bg-black/20 px-7 py-3.5 text-sm font-semibold text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/[0.06] hover:text-white sm:w-auto sm:text-base"
                            >
                                Experience
                            </button>
                        </div>

                        <div
                            className={`flex justify-center lg:justify-start ${fadeUp} ${visible}`}
                            style={{ transitionDelay: '640ms' }}
                        >
                            <div className="flex gap-2.5">
                                {socialLinks.map(({ href, icon: Icon, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-800/60 bg-black/30 text-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/35 hover:bg-violet-500/10 hover:text-violet-300 sm:h-11 sm:w-11"
                                    >
                                        <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div
                        className={`order-1 flex items-center justify-center lg:order-2 ${fadeUp} ${visible}`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        <HeroSolarSystem />
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={() => scrollToSection('about')}
                aria-label="Scroll to about section"
                className={`absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-gray-600 transition-all duration-700 hover:text-violet-400 sm:flex ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: '900ms' }}
            >
                <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
                <span className="flex h-9 w-5 items-start justify-center rounded-full border border-gray-700/60 p-1.5">
                    <span className="h-1.5 w-1 animate-bounce rounded-full bg-violet-400/80" />
                </span>
            </button>
        </section>
    );
};

export default HeroSection;
