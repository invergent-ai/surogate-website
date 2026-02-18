import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './providers';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport = {
  themeColor: '#09090b',
};

export const metadata = {
  title: 'Surogate — High-performance LLM training',
  description: 'Accelerate your AI development with Surogate\'s high-performance LLM training platform. Scalable, efficient, and built for modern machine learning workflows.',
  keywords: 'LLM training, AI training, machine learning, deep learning, neural networks, model training, artificial intelligence, GPU training',
  authors: [{ name: 'Surogate' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://surogate.ai/',
    title: 'Surogate — Insanely fast LLM training and fine-tuning',
    description: 'Train and fine-tune LLMs at practical hardware limits.',
    siteName: 'Surogate',
    images: [
      {
        url: 'https://surogate.ai/og-image.jpg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surogate — Insanely fast LLM training and fine-tuning',
    description: 'Train and fine-tune LLMs at practical hardware limits.',
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://region1.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://region1.google-analytics.com" />
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
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
