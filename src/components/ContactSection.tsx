'use client';

import React, { useEffect, useState } from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Copy,
    Check,
    MessageCircle,
    Download,
    Linkedin,
    ArrowUpRight,
} from 'lucide-react';

interface ContactSectionProps {
    visibleElements: Set<string>;
}

const contactMethods = [
    {
        icon: Mail,
        label: 'Email',
        value: 'fadlilferdy88@gmail.com',
        type: 'email',
        href: 'mailto:fadlilferdy88@gmail.com',
        copyText: 'Email copied',
    },
    {
        icon: Phone,
        label: 'Phone',
        value: '+62 8213 3513 522',
        type: 'phone',
        href: 'tel:+6282133513522',
        copyText: 'Phone copied',
    },
    {
        icon: MapPin,
        label: 'Location',
        value: 'Semarang, Indonesia',
        type: 'location',
        href: 'https://maps.google.com/?q=Semarang,Indonesia',
        copyText: 'Location copied',
    },
] as const;

const quickLinks = [
    {
        title: 'WhatsApp',
        description: 'Start a conversation',
        icon: MessageCircle,
        href: 'https://wa.me/6282133513522?text=Hello%20Fadlil,%20I%20would%20like%20to%20discuss%20a%20project',
        accent: 'hover:border-emerald-500/35 hover:bg-emerald-500/[0.06]',
        iconClass: 'text-emerald-400',
    },
    {
        title: 'LinkedIn',
        description: 'Connect professionally',
        icon: Linkedin,
        href: 'https://linkedin.com/in/fadlilfer',
        accent: 'hover:border-blue-500/35 hover:bg-blue-500/[0.06]',
        iconClass: 'text-blue-400',
    },
    {
        title: 'Download CV',
        description: 'View my resume',
        icon: Download,
        action: 'cv' as const,
        accent: 'hover:border-violet-500/35 hover:bg-violet-500/[0.06]',
        iconClass: 'text-violet-400',
    },
];

const ContactSection: React.FC<ContactSectionProps> = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [copiedItem, setCopiedItem] = useState<string | null>(null);

    useEffect(() => {
        const section = document.getElementById('contact');
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1, rootMargin: '50px 0px' },
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    const copyToClipboard = async (text: string, type: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedItem(type);
            setTimeout(() => setCopiedItem(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = '/CV_Fadlil_Ferdiansyah.pdf';
        link.download = 'CV_Fadlil_Ferdiansyah.pdf';
        link.click();
    };

    const fadeUp = 'transition-all duration-700 ease-out';
    const visible = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6';

    return (
        <section id="contact" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-violet-600/[0.06] blur-3xl" />
                <div className="absolute -right-24 bottom-1/4 h-64 w-64 rounded-full bg-purple-600/[0.05] blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-5xl">
                <div
                    className={`mb-10 text-center sm:mb-14 ${fadeUp} ${visible}`}
                    style={{ transitionDelay: '0ms' }}
                >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-violet-400/80 sm:text-sm">
                        Get In Touch
                    </p>
                    <h2 className="mb-3 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl lg:text-4xl">
                        Let&apos;s Work Together
                    </h2>
                    <p className="mx-auto max-w-xl text-sm text-gray-400 sm:text-base">
                        Have a project in mind or want to collaborate? Reach out — I&apos;d love to hear from you.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
                    <div
                        className={`space-y-3 lg:col-span-3 ${fadeUp} ${visible}`}
                        style={{ transitionDelay: '120ms' }}
                    >
                        {contactMethods.map(({ icon: Icon, label, value, type, href, copyText }) => (
                            <div
                                key={type}
                                className="group relative flex items-center gap-4 rounded-2xl border border-gray-800/60 bg-black/35 p-4 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 hover:bg-black/50 sm:p-5"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10">
                                    <Icon className="h-5 w-5 text-violet-300" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                                        {label}
                                    </p>
                                    <p className="truncate text-sm font-medium text-gray-200 transition-colors group-hover:text-white sm:text-base">
                                        {value}
                                    </p>
                                </div>

                                <div className="flex shrink-0 gap-2">
                                    <a
                                        href={href}
                                        target={type === 'location' ? '_blank' : undefined}
                                        rel={type === 'location' ? 'noopener noreferrer' : undefined}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700/60 bg-gray-900/50 text-gray-400 transition-all duration-300 hover:border-violet-500/40 hover:text-violet-200"
                                        aria-label={`Open ${label}`}
                                    >
                                        <ArrowUpRight className="h-4 w-4" />
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => copyToClipboard(value, type)}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700/60 bg-gray-900/50 text-gray-400 transition-all duration-300 hover:border-violet-500/40 hover:text-violet-200"
                                        aria-label={`Copy ${label}`}
                                    >
                                        {copiedItem === type ? (
                                            <Check className="h-4 w-4 text-emerald-400" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>

                                {copiedItem === type && (
                                    <span className="absolute -top-2.5 right-4 rounded-md border border-emerald-500/30 bg-gray-950/95 px-2 py-0.5 text-[10px] font-medium text-emerald-300 shadow-lg">
                                        {copyText}
                                    </span>
                                )}

                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500 group-hover:w-full" />
                            </div>
                        ))}
                    </div>

                    <div
                        className={`space-y-4 lg:col-span-2 ${fadeUp} ${visible}`}
                        style={{ transitionDelay: '240ms' }}
                    >
                        <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] p-4 backdrop-blur-sm sm:p-5">
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-emerald-200">Available for projects</p>
                                    <p className="text-xs text-gray-400">Open to freelance & full-time opportunities</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {quickLinks.map((link) => {
                                const Icon = link.icon;
                                const content = (
                                    <>
                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-800/60 bg-gray-900/50 ${link.iconClass}`}
                                        >
                                            <Icon className="h-5 w-5" strokeWidth={1.75} />
                                        </div>
                                        <div className="min-w-0 flex-1 text-left">
                                            <p className="text-sm font-semibold text-gray-200">{link.title}</p>
                                            <p className="text-xs text-gray-500">{link.description}</p>
                                        </div>
                                        <ArrowUpRight className="h-4 w-4 shrink-0 text-gray-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-300" />
                                    </>
                                );

                                const className = `group flex w-full items-center gap-4 rounded-2xl border border-gray-800/60 bg-black/35 p-4 backdrop-blur-xl transition-all duration-300 ${link.accent}`;

                                if ('action' in link && link.action === 'cv') {
                                    return (
                                        <button key={link.title} type="button" onClick={handleDownloadCV} className={className}>
                                            {content}
                                        </button>
                                    );
                                }

                                return (
                                    <a
                                        key={link.title}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={className}
                                    >
                                        {content}
                                    </a>
                                );
                            })}
                        </div>

                        <p className="px-1 text-center text-xs text-gray-600 lg:text-left">
                            Typical response time: within 24 hours
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
