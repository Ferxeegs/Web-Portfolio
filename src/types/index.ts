// types/index.ts
export interface Project {
    title: string;
    description: string;
    technologies: string[];
    link: string;
    imageUrl?: string;
}

export interface Certificate {
    title: string;       // For alt text and accessibility
    imageUrl: string;    // Required now, not optional
    credentialLink: string;
    issuer: string;      // Added to provide more context
}

export interface TechStack {
    name: string;
    imageUrl: string; // Changed from icon to imageUrl
}

export interface SocialLink {
    Icon: any; // Lucide React Icon component
    href: string;
    label: string;
}

export type PortfolioItemType = 'projects' | 'certificates' | 'techstack';

export interface PortfolioItemProps {
    item: Project | Certificate | TechStack;
    type: PortfolioItemType;
    index: number;
}