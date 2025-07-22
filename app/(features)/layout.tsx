import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Providers from "@/shared/lib/providers";

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const metadata: Metadata = {
  title: "Web App Settler",
  description: "Web App Settler",
};

const poppin = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppin.variable}>
        <NextTopLoader showSpinner={false} color="#2563EB" />
        <GoogleOAuthProvider clientId={clientId}>
          <Providers>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            {children}
          </Providers>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
