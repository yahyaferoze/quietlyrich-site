import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { FantasyModeProvider } from './components/FantasyModeContext';
import BodyWithFantasyMode from './components/BodyWithFantasyMode';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuietlyRich – Faceless Video Scripts & AI Content',
  description: 'Turn any idea into a scroll-stopping, faceless video script powered by AI. Try it free.',
};

<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FantasyModeProvider>
          <BodyWithFantasyMode>
            {/* ✅ Global Navigation */}
            <nav className="text-center py-4 border-b border-[#222] mb-6">
            <Link href="#how-it-works" className="text-[#C2886D] mx-4 underline">How It Works</Link>
            <Link href="#try-demo" className="text-[#C2886D] mx-4 underline">Try Demo</Link>
            </nav>

            {/* Main App */}
            {children}
          </BodyWithFantasyMode>
        </FantasyModeProvider>
      </body>
    </html>
  );
}
