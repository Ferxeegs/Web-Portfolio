import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactSectionProps {
    visibleElements: Set<string>;
}

const ContactSection: React.FC<ContactSectionProps> = ({ }) => {
    const [isVisible, setIsVisible] = useState(false);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you! Your message has been sent.');
    };

    const contactInfo = [
        { icon: Mail, text: "fadlilferdy88@gmail.com" },
        { icon: Phone, text: "+62 8213 3513 522" },
        { icon: MapPin, text: "Semarang, Indonesia" }
    ];

    const formFields = [
        { label: "Name", type: "text", placeholder: "Your Name" },
        { label: "Email", type: "email", placeholder: "email@example.com" }
    ];

    return (
        <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 relative">
            <div className="max-w-5xl mx-auto">
                <div className={`transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}>
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                            Contact Me
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto px-4">
                            Let&apos;s collaborate to bring your dream project to life with cutting-edge technology
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
                        {/* Contact Information */}
                        <div className="space-y-6 sm:space-y-8">
                            {contactInfo.map(({ icon: Icon, text }, index) => (
                                <div key={index} className="flex items-center space-x-4 sm:space-x-6 group cursor-pointer">
                                    <div className="p-3 sm:p-4 bg-gray-800/30 rounded-xl sm:rounded-2xl border border-gray-700/50 group-hover:bg-violet-600/20 group-hover:border-violet-500/50 transition-all duration-300 flex-shrink-0">
                                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />
                                    </div>
                                    <span className="text-gray-200 text-base sm:text-lg group-hover:text-white transition-colors duration-300 break-all">
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            {formFields.map(({ label, type, placeholder }, index) => (
                                <div key={index}>
                                    <label className="block text-gray-200 mb-2 sm:mb-3 font-medium text-sm sm:text-base">
                                        {label}
                                    </label>
                                    <input
                                        type={type}
                                        required
                                        className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black/40 border border-gray-700/50 rounded-xl sm:rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-black/60 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                                        placeholder={placeholder}
                                    />
                                </div>
                            ))}
                            
                            <div>
                                <label className="block text-gray-200 mb-2 sm:mb-3 font-medium text-sm sm:text-base">
                                    Message
                                </label>
                                <textarea
                                    rows={5}
                                    required
                                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black/40 border border-gray-700/50 rounded-xl sm:rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-black/60 transition-all duration-300 backdrop-blur-sm resize-none text-sm sm:text-base"
                                    placeholder="Write your message here..."
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl sm:rounded-2xl text-white font-semibold hover:from-violet-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-violet-500/50 border border-violet-500/20 text-sm sm:text-base"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;