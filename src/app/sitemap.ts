import { MetadataRoute } from 'next';
import { projects } from '@/constants/Data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ferxcode.my.id';

  // Fungsi untuk mengubah Title menjadi Slug URL
  const slugify = (text: string) => 
    text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  const projectEntries = projects.map((project) => ({
    url: `${baseUrl}/projects/${slugify(project.title)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    ...projectEntries,
  ];
}