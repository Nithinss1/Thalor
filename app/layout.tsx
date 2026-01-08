import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { CartProvider } from '@/contexts/CartContext'

export const metadata: Metadata = {
  title: 'Thalor - Sustainable Gifting Platform',
  description: 'Send meaningful, sustainable gifts that make an impact',
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          {modal}
        </CartProvider>
      </body>
    </html>
  )
}
