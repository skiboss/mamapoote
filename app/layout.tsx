import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { CartProvider } from "@/contexts/CartContext"
import { Toaster } from "@/components/ui/toaster"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mamapoote - Authentic African Cuisine",
  description:
    "Experience the rich taste of traditional African cuisine at Mamapoote. Order online for delivery or pickup.",
  // generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <Suspense fallback={null}>{children}</Suspense>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
        {/* <Suspense fallback={null}>{children}</Suspense>
        <Analytics /> */}
      </body>
    </html>
  )
}
