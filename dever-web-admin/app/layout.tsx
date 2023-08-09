import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dever Admin',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header></Header>
        <Sidebar></Sidebar>
        {children}
        </body>
    </html>
  )
}
