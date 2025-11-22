import { Geist, Geist_Mono } from "next/font/google";
import MyNavBar from "@/components/my-nav";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Auth0Provider } from "@auth0/nextjs-auth0/client";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Iman Anooshehpour Portfolio",
  description: "Portfolio website of Iman Anooshehpour, a software developer, Instructor, Youtuber, and tech content creator.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MyNavBar />
        <Auth0Provider>
          {children}
        </Auth0Provider>
        <Toaster />
      </body>
    </html>
  );
}
