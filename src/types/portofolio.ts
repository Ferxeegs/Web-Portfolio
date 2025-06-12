export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

export interface Certificate {
  title: string;
  description: string;
  technologies: string[];
  issuer: string;
}

export interface TechStack {
  category: string;
  description: string;
  technologies: string[];
}

export type PortfolioItemType = 'projects' | 'certificates' | 'techstack';