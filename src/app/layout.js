import './globals.css'
import ClientLayout from './client-layout'

export const metadata = {
  title: 'Vikas Gulia — Data Scientist & Developer',
  description: 'Portfolio of Vikas Gulia — Data Scientist, Full Stack Developer, and ML Engineer based in Delhi, India.',
  keywords: 'portfolio, data science, AI, ML, full stack developer, React, Next.js, Python',
  authors: [{ name: 'Vikas Gulia' }],
  openGraph: {
    title: 'Vikas Gulia — Data Scientist & Developer',
    description: 'Portfolio of Vikas Gulia — Data Scientist, Full Stack Developer, and ML Engineer.',
    type: 'website',
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
