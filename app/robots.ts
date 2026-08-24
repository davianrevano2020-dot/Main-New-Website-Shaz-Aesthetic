import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://shazclinic.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Cegah mesin pencari mengindeks halaman admin/back-office dan API
      disallow: ['/back-office/', '/api/'], 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
