import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Berlaku untuk semua bot (Google, Bing, dll)
      allow: '/',      // Izinkan semua halaman diakses
    },
    // Menautkan sitemap agar Google langsung menemukan daftar project-mu
    sitemap: 'https://ferxcode.my.id/sitemap.xml', 
  }
}