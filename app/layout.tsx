// "use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "../components/Header" 
import Sidebar from "../components/Sidebar"
import { AppProvider } from './context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dever Admin',
  description: 'Generated by create next app',
}

export default function RootLayout(
  {children,}: {children: React.ReactNode}
  ) {
  return (
    <html lang="en"  suppressHydrationWarning={true}>
      <body className={inter.className}  suppressHydrationWarning={true}>
        <AppProvider>
          <Header></Header>
          <Sidebar></Sidebar>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
