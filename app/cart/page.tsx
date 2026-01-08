'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2, Plus, Minus, Leaf } from "lucide-react"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()

  const cartTotal = getCartTotal()
  const processingFee = cartTotal * 0.05
  const totalWithFees = cartTotal + processingFee

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <div className="bg-gray-50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <ShoppingCart className="size-12 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">
          Browse our sustainable gift catalog and add items to your cart.
        </p>
        <Link href="/catalog">
          <Button className="bg-green-600 hover:bg-green-700">
            Browse Gift Catalog
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
        <Button variant="outline" onClick={clearCart} className="text-red-600 hover:text-red-700">
          <Trash2 className="size-4 mr-2" />
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((cartItem) => (
            <Card key={cartItem.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={cartItem.item.image_url}
                      alt={'name' in cartItem.item ? cartItem.item.name : cartItem.item.category_name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold">
                          {'name' in cartItem.item ? cartItem.item.name : cartItem.item.category_name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {'description' in cartItem.item
                            ? cartItem.item.description
                            : cartItem.item.category_description}
                        </p>
                        {cartItem.item.carbon_impact && (
                          <div className="flex items-center gap-1 mt-1">
                            <Leaf className="size-3 text-green-600" />
                            <span className="text-xs text-green-600">{cartItem.item.carbon_impact}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${cartItem.item.price}</p>
                        <p className="text-sm text-gray-500">per item</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                          disabled={cartItem.quantity <= 1}
                        >
                          <Minus className="size-4" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={cartItem.quantity}
                          onChange={(e) => updateQuantity(cartItem.id, parseInt(e.target.value) || 1)}
                          className="w-16 text-center"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <p className="font-semibold">
                          Total: ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(cartItem.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Fee (5%)</span>
                  <span className="font-medium">${processingFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">${totalWithFees.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="size-5 text-green-600" />
                  <span className="font-semibold text-green-800">Sustainability Impact</span>
                </div>
                <p className="text-sm text-gray-700">
                  Your order will save an estimated {(cart.length * 2.5).toFixed(1)} kg CO₂ compared to traditional gifts.
                </p>
              </div>

              <Link href="/checkout">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/catalog">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
