import './globals.css'
import { Inter } from 'next/font/google'
import { LessonProvider } from '@/contexts/LessonContext'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Unity Notes',
  description: 'Aplicativo para aulas da Escola Dominical',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased transition-colors">
        <LessonProvider>
          {children}
        </LessonProvider>
      </body>
    </html>
  )
}