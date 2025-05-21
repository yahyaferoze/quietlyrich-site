import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FantasyModeProvider } from "./components/FantasyModeContext";
import BodyWithFantasyMode from "./components/BodyWithFantasyMode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quietly Rich",
  description: "Build viral dreams without ever showing your face.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <FantasyModeProvider>
        <BodyWithFantasyMode>
          {children}
        </BodyWithFantasyMode>
      </FantasyModeProvider>
    </html>
  );
}