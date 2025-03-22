import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local'

import '@rainbow-me/rainbowkit/styles.css';
import "./globals.css";

import Provider from "./providers";
import Navbar from "../components/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const myFont = localFont({
  src: '../../public/fonts/Futura Book font.ttf',
  variable: '--font-custom',
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${myFont.variable} bg-background`}
      >
        <Provider>
          <Navbar logo="/logo.svg" />
          {children}
        </Provider>
      </body>
    </html>
  );
}
