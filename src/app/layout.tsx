import Header from '@/components/sections/header'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/sections/footer'
import Provider from './context/AuthContext'
import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Proflex',
  description: 'A platform to showcase developer projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Header />
          <>
          {children}
          <Toaster />
          </>
        </Provider>
        {/* <Footer /> */}
        </body>
    </html>
  )
}
