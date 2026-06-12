'use client';

import React, { useEffect, useState } from 'react';
import { Download, ArrowRight, Calendar, Award, MapPin, Server } from 'lucide-react';

interface AboutSectionProps {
    visibleElements: Set<string>;
}

const stats = [
    { icon: Calendar, label: 'Experience', value: '2+ Years' },
    { icon: Award, label: 'Projects', value: '10+' },
    { icon: Server, label: 'Focus', value: 'Full Stack & Infra' },
    { icon: MapPin, label: 'Based in', value: 'Semarang, ID' },
];

const focusAreas = [
    'Containerized full-stack systems on institutional VM environments',
    'Database architecture, API design, and production deployment workflows',
    'Bridging software engineering with server and infrastructure management',
];

const AboutSection: React.FC<AboutSectionProps> = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1, rootMargin: '50px 0px' },
        );

        const aboutSection = document.getElementById('about');
        if (aboutSection) observer.observe(aboutSection);
        return () => observer.disconnect();
    }, []);

    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = '/CV_Fadlil_Ferdiansyah.pdf';
        link.download = 'CV_Fadlil_Ferdiansyah.pdf';
        link.click();
    };

    const handleViewPortfolio = () => {
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    };

    const fadeUp = 'transition-all duration-700 ease-out';
    const visible = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6';

    return (
        <section
            id="about"
            className="relative flex min-h-screen items-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
        >
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-violet-600/[0.06] blur-3xl" />
                <div className="absolute -right-24 bottom-1/4 h-64 w-64 rounded-full bg-purple-600/[0.05] blur-3xl" />
            </div>

            <div className="mx-auto w-full max-w-6xl">
                <div
                    className={`mb-10 text-center lg:mb-14 lg:text-left ${fadeUp} ${visible}`}
                    style={{ transitionDelay: '0ms' }}
                >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-violet-400/80 sm:text-sm">
                        Get to Know Me
                    </p>
                    <h2 className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl lg:text-4xl">
                        About Me
                    </h2>
                </div>

                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
                    <div
                        className={`order-2 space-y-7 lg:order-1 ${fadeUp} ${visible}`}
                        style={{ transitionDelay: '120ms' }}
                    >
                        <div className="space-y-4">
                            <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                                A <span className="font-medium text-violet-300">Full Stack Developer</span> and{' '}
                                <span className="font-medium text-purple-300">Computer Engineering</span> graduate
                                from Diponegoro University. I currently build and manage digital platforms across
                                the <span className="font-medium text-violet-300">UNDIP ecosystem</span> and{' '}
                                <span className="font-medium text-cyan-300">Jaya Techno (Remote)</span> — combining application
                                development with hands-on production infrastructure.
                            </p>
                            <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
                                With over two years in web development, I focus on shipping containerized systems,
                                optimizing database architectures, and turning complex institutional requirements into
                                reliable, high-performance products through clean and maintainable code.
                            </p>
                        </div>

                        <ul className="space-y-3">
                            {focusAreas.map((area) => (
                                <li key={area} className="flex gap-3 text-sm text-gray-400 sm:text-[15px]">
                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                                    {area}
                                </li>
                            ))}
                        </ul>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-xl border border-gray-800/60 bg-black/30 p-3.5 backdrop-blur-sm transition-colors duration-300 hover:border-violet-500/25 sm:p-4"
                                >
                                    <stat.icon className="mb-2 h-4 w-4 text-violet-400/80" />
                                    <p className="text-sm font-semibold text-white sm:text-base">{stat.value}</p>
                                    <p className="text-[11px] text-gray-500 sm:text-xs">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                            <button
                                onClick={handleDownloadCV}
                                className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-300 hover:from-violet-500 hover:to-purple-500 sm:text-base"
                            >
                                <Download className="h-4 w-4" />
                                Download CV
                            </button>
                            <button
                                onClick={handleViewPortfolio}
                                className="group flex items-center justify-center gap-2 rounded-xl border border-gray-700/60 bg-black/20 px-6 py-3 text-sm font-semibold text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/[0.06] hover:text-white sm:text-base"
                            >
                                View Portfolio
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>

                    <div
                        className={`order-1 flex justify-center lg:order-2 ${fadeUp} ${visible}`}
                        style={{ transitionDelay: '240ms' }}
                    >
                        <div className="group relative">
                            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-violet-600/15 via-purple-600/10 to-transparent opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/30 via-purple-500/20 to-fuchsia-500/10 p-[1.5px]">
                                    <div className="h-full w-full rounded-full bg-gray-950 p-1.5">
                                        <div className="relative h-full w-full overflow-hidden rounded-full border border-gray-700/30">
                                            <img
                                                src="/B3re.jpg"
                                                alt="Fadlil Ferdiansyah"
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/30 via-transparent to-transparent" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-violet-500/30 bg-gray-950/90 px-4 py-1.5 text-xs font-medium text-violet-100 shadow-lg shadow-black/30 backdrop-blur-md">
                                Full Stack Developer
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
