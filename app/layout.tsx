'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import { ReduxProvider } from "./store/ReduxProvider";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isOwnerPage = pathname?.startsWith('/pages/owner');
  const isDoctorPage = pathname?.startsWith('/pages/doctor/') || pathname === '/pages/doctor';
  const isManagerPage = pathname?.startsWith('/pages/manager');

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <LanguageProvider>
            <ThemeProvider>
              {!isDoctorPage && <Navbar />}
              {children}
              {!isOwnerPage && !isDoctorPage && !isManagerPage && <Footer />}
            </ThemeProvider>
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
