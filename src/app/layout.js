import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from './client-layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vikas - Portfolio',
  description: 'AI/ML Engineer and Full Stack Developer Portfolio',
  keywords: 'portfolio, AI, ML, full stack developer, React, Next.js',
  authors: [{ name: 'Vikas' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
