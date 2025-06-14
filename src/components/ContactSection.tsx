import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, MessageCircle, Download, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
    visibleElements: Set<string>;
}

const ContactSection: React.FC<ContactSectionProps> = ({ }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [copiedItem, setCopiedItem] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px 0px' }
        );

        const contactSection = document.getElementById('contact');
        if (contactSection) {
            observer.observe(contactSection);
        }

        return () => observer.disconnect();
    }, []);

    const copyToClipboard = async (text: string, type: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedItem(type);
            setTimeout(() => setCopiedItem(null), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = '/CV-Fadlil_Ferdiansyah.pdf';
        link.download = 'CV-Fadlil-Ferdiansyah.pdf';
        link.click();
    };

    const contactInfo = [
        {
            icon: Mail,
            text: "fadlilferdy88@gmail.com",
            type: "email",
            action: () => window.open("mailto:fadlilferdy88@gmail.com", "_blank"),
            copyText: "Email copied!"
        },
        {
            icon: Phone,
            text: "+62 8213 3513 522",
            type: "phone",
            action: () => window.open("tel:+6282133513522", "_blank"),
            copyText: "Phone number copied!"
        },
        {
            icon: MapPin,
            text: "Semarang, Indonesia",
            type: "location",
            action: () => window.open("https://maps.google.com/?q=Semarang,Indonesia", "_blank"),
            copyText: "Location copied!"
        }
    ];

    const quickActions = [
        {
            title: "WhatsApp Chat",
            description: "Quick message via WhatsApp",
            icon: MessageCircle,
            action: () => window.open("https://wa.me/6282133513522?text=Hello%20Fadlil,%20I%20would%20like%20to%20discuss%20a%20project", "_blank"),
            gradient: "from-green-500/20 to-emerald-600/20",
            border: "border-green-500/50 hover:border-emerald-400",
            iconColor: "text-green-500 group-hover:text-emerald-400"
        },
        {
            title: "Download CV",
            description: "Get my latest resume",
            icon: Download,
            action: handleDownloadCV,
            gradient: "from-blue-500/20 to-cyan-600/20",
            border: "border-blue-500/50 hover:border-cyan-400",
            iconColor: "text-blue-500 group-hover:text-cyan-400"
        },
        {
            title: "View LinkedIn",
            description: "Professional network",
            icon: ExternalLink,
            action: () => window.open("https://linkedin.com/in/fadlilfer", "_blank"),
            gradient: "from-indigo-500/20 to-purple-600/20",
            border: "border-indigo-500/50 hover:border-purple-400",
            iconColor: "text-indigo-500 group-hover:text-purple-400"
        }
    ];

    return (
        <section id="contact" className="py-8 sm:py-12 lg:py-20 px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-violet-500/3 rounded-full blur-3xl -translate-x-16 sm:-translate-x-32 -translate-y-16 sm:-translate-y-32"></div>
                <div className="absolute bottom-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-purple-500/3 rounded-full blur-3xl translate-x-16 sm:translate-x-32 translate-y-16 sm:translate-y-32"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                    }`}>
                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Let&apos;s Work Together
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto px-4 leading-relaxed">
                            Ready to bring your ideas to life? Get in touch and let&apos;s create something amazing together.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                        {/* Contact Information */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Contact Information</h3>

                            <div className="grid sm:grid-cols-1 gap-4 sm:gap-6">
                                {contactInfo.map(({ icon: Icon, text, type, action, copyText }, index) => (
                                    <div key={index} className="group relative">
                                        <div className="flex items-center justify-between p-4 sm:p-6 bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl hover:bg-black/60 hover:border-violet-500/50 transition-all duration-300">
                                            <div className="flex items-center space-x-4 sm:space-x-6 flex-1 min-w-0">
                                                <div className="p-3 sm:p-4 bg-gradient-to-br from-violet-600/20 to-purple-600/20 rounded-xl border border-violet-500/30 flex-shrink-0">
                                                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <span className="text-gray-200 text-sm sm:text-base lg:text-lg break-all group-hover:text-white transition-colors duration-300">
                                                        {text}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex space-x-2 ml-4 flex-shrink-0">
                                                <button
                                                    onClick={action}
                                                    className="p-2 sm:p-3 bg-violet-600/20 hover:bg-violet-600/40 rounded-lg border border-violet-500/30 transition-all duration-300 hover:scale-105"
                                                    title="Open"
                                                >
                                                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                                                </button>
                                                <button
                                                    onClick={() => copyToClipboard(text, type)}
                                                    className="p-2 sm:p-3 bg-purple-600/20 hover:bg-purple-600/40 rounded-lg border border-purple-500/30 transition-all duration-300 hover:scale-105"
                                                    title="Copy"
                                                >
                                                    {copiedItem === type ? (
                                                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                                                    ) : (
                                                        <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Copy notification */}
                                        {copiedItem === type && (
                                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-green-600 text-white px-3 py-1 rounded-lg text-xs sm:text-sm font-medium animate-pulse">
                                                {copyText}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-4 sm:space-y-6">
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Quick Actions</h3>

                            {/* Quick Actions Grid - Updated to vertical layout */}
                            <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
                                {quickActions.map((action, index) => (
                                    <button
                                        key={index}
                                        onClick={action.action}
                                        className={`group w-full relative p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300
                    bg-gray-900/20 hover:bg-gray-900/30
                    ${action.border}
                `}
                                    >
                                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${action.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                                        
                                        <div className="relative flex items-center gap-6">
                                            <div className={`p-3 rounded-xl bg-gray-900/50 border border-gray-800/50 ${action.iconColor} transition-colors duration-300 flex-shrink-0`}>
                                                {React.createElement(action.icon, { size: 24, strokeWidth: 1.5 })}
                                            </div>
                                            
                                            <div className="text-left">
                                                <h3 className="text-lg font-semibold text-gray-200 group-hover:text-white">
                                                    {action.title}
                                                </h3>
                                                <p className="text-sm text-gray-400 group-hover:text-gray-300">
                                                    {action.description}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Availability Status */}
                            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-black/40 backdrop-blur-sm border border-green-500/30 rounded-xl sm:rounded-2xl">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <div>
                                        <p className="text-green-400 font-semibold text-sm sm:text-base">Available for Projects</p>
                                        <p className="text-gray-400 text-xs sm:text-sm">Currently accepting new opportunities</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;