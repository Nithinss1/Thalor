'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Leaf, ShoppingCart } from "lucide-react"
import { useCart } from '@/contexts/CartContext'

export function Header() {
  const pathname = usePathname()
  const { getCartItemCount } = useCart()
  const itemCount = getCartItemCount()

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-green-600 p-2 rounded-lg">
            <Leaf className="size-6 text-white" />
          </div>
          <span className="text-xl font-semibold">Thalor</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`hover:text-green-600 transition-colors ${
              pathname === '/' ? 'text-green-600 font-medium' : 'text-gray-600'
            }`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`hover:text-green-600 transition-colors ${
              pathname === '/catalog' ? 'text-green-600 font-medium' : 'text-gray-600'
            }`}
          >
            Gift Catalog
          </Link>
          <Link
            href="/dashboard"
            className={`hover:text-green-600 transition-colors ${
              pathname === '/dashboard' ? 'text-green-600 font-medium' : 'text-gray-600'
            }`}
          >
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="size-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/send-gift">
            <Button variant="outline">
              Send Gift
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-green-600 hover:bg-green-700">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
