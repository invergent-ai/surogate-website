import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './providers';
import { PostHogProvider } from '@/components/PostHogProvider';
import { siteGraph, JsonLd } from './structured-data';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'opsz'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

// Public identifier, embedded in the page like the GA measurement ID above —
// it is not a secret. Created in the OpenAI Ads Manager conversions tab.
const OPENAI_PIXEL_ID =
  process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID || 'NzmC825U3hg31ri2zxR6DK';

export const viewport = {
  themeColor: '#09090b',
};

export const metadata = {
  title: 'Surogate - Autonomous AI agents that work for you 24/7',
  description: 'Deploy autonomous AI agents that run in the cloud around the clock - built from how you already work and powered by expert models you own. No code required.',
  keywords: 'autonomous AI agents, AI agent platform, cloud AI agents, AI agents that work 24/7, expert models, custom LLM fine-tuning, agent automation, monetize AI agents, no-code AI agents',
  authors: [{ name: 'Surogate' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://surogate.ai/',
    title: 'Surogate - Autonomous AI agents that work for you 24/7',
    description: 'Deploy one agent or hundreds. They run in the cloud 24/7, built from how you work and powered by expert models you own.',
    siteName: 'Surogate',
    images: [
      {
        url: 'https://surogate.ai/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Surogate - Multiply yourself. Train expert models you own. Run autonomous agents 24/7.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surogate - Autonomous AI agents that work for you 24/7',
    description: 'Deploy one agent or hundreds. They run in the cloud 24/7, built from how you work and powered by expert models you own.',
    images: ['https://surogate.ai/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://surogate.ai/',
  },
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://region1.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://region1.google-analytics.com" />
        <link rel="preconnect" href="https://bzrcdn.openai.com" />
        <link rel="dns-prefetch" href="https://bzrcdn.openai.com" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QDJWS8ZM50"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QDJWS8ZM50');
          `}
        </Script>
        {/*
          OpenAI measurement pixel. The loader is OpenAI's snippet verbatim: it
          stubs window.oaiq into a queue so calls made before the SDK lands are
          replayed, then appends the real script.

          beforeInteractive, not the lazyOnload the analytics above use: this
          renders into the static head, which is where OpenAI's instructions put
          it and what the measurement needs. The SDK reads `oppref` off the
          landing URL to attribute the click, so it has to run on the page
          someone arrives on — deferring to hydration or idle drops whoever
          leaves first, which are exactly the visitors ad spend is being judged
          on. The inline part only queues calls and appends an async script, so
          nothing blocking is bought with it.
        */}
        <Script id="openai-pixel" strategy="beforeInteractive">
          {`
            (function (w, d, s, u) {
              if (w.oaiq) return;
              var q = function () { q.q.push(arguments); };
              q.q = [];
              w.oaiq = q;
              var js = d.createElement(s);
              js.async = true;
              js.src = u;
              var f = d.getElementsByTagName(s)[0];
              f.parentNode.insertBefore(js, f);
            })(window, document, "script", "https://bzrcdn.openai.com/sdk/oaiq.min.js");

            oaiq("init", { pixelId: "${OPENAI_PIXEL_ID}" });
          `}
        </Script>
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <JsonLd data={siteGraph} />
        <PostHogProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
