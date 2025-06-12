// types/index.ts
export interface Project {
    title: string;
    description: string;
    technologies: string[];
    link: string;
}

export interface Certificate {
    title: string;       // For alt text and accessibility
    imageUrl: string;    // Required now, not optional
    credentialLink: string;
}

export interface TechStack {
    category: string;
    description: string;
    technologies: string[];
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