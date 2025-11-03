// "is client";

import type React from "react"
import type { Metadata } from "next"
import { Suspense, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { CartProvider } from "@/contexts/CartContext"
import { Toaster } from "@/components/ui/toaster"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mamapoote - Authentic African Cuisine",
  description:
    "Experience the rich taste of traditional African cuisine at Mamapoote. Order online for delivery or pickup.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  // const [queryClient] = useState(
    //     () =>
    //       new QueryClient({
    //         defaultOptions: {
    //           queries: {
    //             staleTime: 60 * 1000, // 1 minute
    //             retry: 2,
    //             refetchOnWindowFocus: false,
    //           },
    //           mutations: {
    //             retry: 1,
    //           },
    //         },
    //       })
  // );

  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {/* <QueryClientProvider client={queryClient}> */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <Suspense fallback={null}>{children}</Suspense>
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
        {/* </QueryClientProvider> */}
        {/* <Suspense fallback={null}>{children}</Suspense>
        <Analytics /> */}
      </body>
    </html>
  )
}
