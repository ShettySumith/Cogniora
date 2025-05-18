import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/sidebar-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { CustomCursor } from "@/components/custom-cursor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cogniora | Advanced Cognitive Learning Platform",
  description: "Enhance your learning potential with our intelligent spaced repetition system. Cogniora helps you master any subject through scientifically-proven learning techniques.",
  keywords: "spaced repetition, flashcards, learning platform, cognitive enhancement, memory improvement",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <CustomCursor />
          <SidebarProvider>
            <div className="flex w-full h-screen overflow-hidden bg-gradient-to-br from-background to-background/90">
              <AppSidebar />
              <main className="flex-1 w-full overflow-auto">{children}</main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
