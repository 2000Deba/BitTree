import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "BitTree | All Your Links in One Place",
  description: "BitTree is your personal hub to share multiple links in one place. Create, customize, and manage your digital identity easily.",
  keywords: [
    "BitTree",
    "link sharing",
    "profile links",
    "bio link tool",
    "link in bio",
    "Next.js",
    "MongoDB",
    "TailwindCSS",
    "NextAuth",
  ],
  authors: [{ name: "Debasish Seal" }],
  creator: "Debasish Seal",
  publisher: "Debasish Seal",
  metadataBase: new URL("https://bittree-deba.vercel.app"),
  openGraph: {
    title: "BitTree | All Your Links in One Place",
    description: "Create your BitTree profile and share multiple links in one place. Organize your digital identity effortlessly.",
    url: "https://bittree-deba.vercel.app",
    siteName: "BitTree",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BitTree - Share All Your Links",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BitTree | All Your Links in One Place",
    description:
      "BitTree makes link management simple — build your profile and share links seamlessly.",
    images: ["/og-image.png"],
    creator: "@ShilDebasish",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
