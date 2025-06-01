import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { FantasyModeProvider } from './components/FantasyModeContext';
import BodyWithFantasyMode from './components/BodyWithFantasyMode';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuietlyRich – Faceless Video Scripts & AI Content',
  description: 'Turn any idea into a scroll-stopping, faceless video script powered by AI. Try it free.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FantasyModeProvider>
          <BodyWithFantasyMode>
            {children}
          </BodyWithFantasyMode>
        </FantasyModeProvider>
      </body>
    </html>
  );
}
