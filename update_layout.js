const fs = require('fs');
let code = fs.readFileSync('app/layout.tsx', 'utf8');

// Add import
if (!code.includes("getSiteContent")) {
  code = code.replace(
    "import './globals.css';",
    "import './globals.css';\nimport { getSiteContent } from '@/lib/content';"
  );
}

// Convert RootLayout to async
code = code.replace(
  "export default function RootLayout({",
  "export default async function RootLayout({"
);

// Fetch content inside RootLayout
code = code.replace(
  "  children: React.ReactNode;\n}) {\n  return (",
  "  children: React.ReactNode;\n}) {\n  const content = await getSiteContent();\n  const gaId = content.google_analytics_id || 'G-G8N9PTDF15';\n  return ("
);

// Inject dynamic GA ID
code = code.replace(
  /<Script src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-G8N9PTDF15" strategy="afterInteractive" \/>/g,
  "{gaId && <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy=\"afterInteractive\" />}"
);

code = code.replace(
  /gtag\('config', 'G-G8N9PTDF15'\);/g,
  "gtag('config', '${gaId}');"
);

// Inject Google Search Console
code = code.replace(
  /<head>/,
  "<head>\n        {content.google_site_verification && <meta name=\"google-site-verification\" content={content.google_site_verification} />}"
);

fs.writeFileSync('app/layout.tsx', code);
console.log('done layout');
