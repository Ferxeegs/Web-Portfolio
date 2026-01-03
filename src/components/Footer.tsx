import React from 'react';

const Footer: React.FC = () => {
    // Mendapatkan tahun saat ini secara dinamis
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 sm:py-12 text-center border-t border-gray-800/50 backdrop-blur-sm">
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg px-4">
                © {currentYear} Ferxcode | All Rights Reserved
            </p>
        </footer>
    );
};

export default Footer;