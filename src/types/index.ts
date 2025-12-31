// types/index.ts
import { LucideIcon } from 'lucide-react';

export interface Project {
    title: string;
    description: string;
    longDescription?: string[];
    technologies: string[];
    link: string;
    imageUrl?: string;
    images?: string[];
    role?: string;
    timeline?: string;
    features?: string[];
    liveDemo?: string;
    category?: string;
}

export interface Certificate {
    title: string;       // For alt text and accessibility
    imageUrl: string;    // Required now, not optional
    credentialLink: string;
    issuer: string;      // Added to provide more context
}

export interface TechStack {
    name: string;
    imageUrl: string;
}

export interface SocialLink {
    Icon: LucideIcon;    // Changed from 'any' to proper Lucide icon type
    href: string;
    label: string;
}

export type PortfolioItemType = 'projects' | 'certificates' | 'techstack';

export interface PortfolioItemProps {
    item: Project | Certificate | TechStack;
    type: PortfolioItemType;
    index: number;
}