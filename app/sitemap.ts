import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Ganti dengan URL domain production Anda nantinya (misal: https://shazclinic.com)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://shazclinic.com';

  // Daftar rute (halaman) utama yang ingin diindeks oleh Google
  const routes = [
    '',
    '/about',
    '/doctor',
    '/treatment',
    '/packages',
    '/promotion',
    '/reviews',
    '/locations',
    '/faq',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    // Beri prioritas dan frekuensi perubahan yang sesuai
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
