import type { Metadata } from 'next';
import Script from 'next/script';
import { Montserrat, Playfair_Display } from 'next/font/google';
import './globals.css';
import { getSiteContent } from '@/lib/content';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SHAZ Clinic & Salon | Beauty, Refined by Medical Expertise',
  description: 'Personalized aesthetic treatments and premium salon experiences designed around your unique beauty goals in Seminyak, Bali.',
  icons: {
    icon: 'https://shazaestheticbali.com/public/uploads/shaz-favico.jpg',
    shortcut: 'https://shazaestheticbali.com/public/uploads/shaz-favico.jpg',
    apple: 'https://shazaestheticbali.com/public/uploads/shaz-favico.jpg',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getSiteContent();
  const gaId = content.google_analytics_id || 'G-G8N9PTDF15';
  return (
    <html suppressHydrationWarning lang="en" className={`scroll-smooth ${montserrat.variable} ${playfair.variable}`}>
      <head>
        {content.google_site_verification && <meta name="google-site-verification" content={content.google_site_verification} />}
        <link rel="icon" href="https://shazaestheticbali.com/public/uploads/shaz-favico.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="https://shazaestheticbali.com/public/uploads/shaz-favico.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="https://shazaestheticbali.com/public/uploads/shaz-favico.jpg" />
      </head>
      <body className="font-sans bg-brand-white text-brand-charcoal antialiased" suppressHydrationWarning>
        {gaId && <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gaId}');
          `}
        </Script>
        <Script id="wa-conversion-tracking" strategy="afterInteractive">
          {`
            document.addEventListener('click', function(e) {
              var target = e.target.closest('a');
              if (target && target.href && (target.href.includes('wa.link') || target.href.includes('whatsapp'))) {
                gtag('event', 'conversion', {'send_to': 'AW-17296054207/kHgiCMbY3egaEL-vs7dA'});
              }
            });
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
