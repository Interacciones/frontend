'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from './context/AuthContext'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
      <html lang="es">
        <link rel="icon" href="/icon.ico" sizes="any" />
        <body className={inter.className}>
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </body>
      </html>
    )
}
