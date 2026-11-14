import type { Metadata } from 'next';
import './globals.css';
import { FounderProvider } from '@/lib/FounderContext';

export const metadata: Metadata = {
  title: 'Maya Hospital - Founder Control Centre',
  description: 'Executive Control, Telemetry & Hospital Operations Platform for Founder & Senior Leadership',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-[#fcfaff] text-[#3b284c]">
        <FounderProvider>
          {children}
        </FounderProvider>
      </body>
    </html>
  );
}
