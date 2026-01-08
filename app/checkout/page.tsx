'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Shield, CheckCircle, Loader2, Leaf } from "lucide-react"
import { useCart } from "@/contexts/CartContext"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, getCartTotal, getCartItemCount, clearCart } = useCart()
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: ''
  })
  const [processing, setProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  const cartTotal = getCartTotal()
  const processingFee = cartTotal * 0.05
  const totalWithFees = cartTotal + processingFee
  const itemCount = getCartItemCount()

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(' ') : v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setPaymentData({ ...paymentData, cardNumber: formatted })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      setPaymentComplete(true)
      clearCart()
    }, 2000)
  }

  // Redirect to cart if empty
  useEffect(() => {
    if (cart.length === 0 && !paymentComplete) {
      router.push('/cart')
    }
  }, [cart.length, paymentComplete, router])

  if (paymentComplete) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-8 text-center bg-green-50 border-green-200">
          <CardContent className="p-0">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="size-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-green-800">Payment Successful!</h2>
            <p className="text-gray-700 mb-6">
              Your payment of ${totalWithFees.toFixed(2)} has been processed successfully. {itemCount} {itemCount === 1 ? 'gift' : 'gifts'} will be sent to recipients within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dashboard">
                <Button className="bg-green-600 hover:bg-green-700">
                  View Dashboard
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <CreditCard className="size-8" />
          Secure Checkout
        </h1>
        <p className="text-gray-600">
          Complete your payment using your corporate card
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Alert>
              <Shield className="size-4" />
              <AlertDescription>
                Your payment information is encrypted and secure. We never store your card details.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="4111 1111 1111 1111"
                    maxLength={19}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    value={paymentData.cardholderName}
                    onChange={(e) => setPaymentData({...paymentData, cardholderName: e.target.value})}
                    placeholder="John Smith"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="billingAddress">Street Address</Label>
                  <Input
                    id="billingAddress"
                    value={paymentData.billingAddress}
                    onChange={(e) => setPaymentData({...paymentData, billingAddress: e.target.value})}
                    placeholder="123 Main St"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={paymentData.city}
                      onChange={(e) => setPaymentData({...paymentData, city: e.target.value})}
                      placeholder="San Francisco"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={paymentData.state}
                      onChange={(e) => setPaymentData({...paymentData, state: e.target.value})}
                      placeholder="CA"
                      maxLength={2}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={paymentData.zipCode}
                    onChange={(e) => setPaymentData({...paymentData, zipCode: e.target.value})}
                    placeholder="94105"
                    maxLength={10}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={processing}
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 size-4" />
                  Complete Payment
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cart.map((cartItem) => (
                  <div key={cartItem.id} className="flex gap-3 pb-3 border-b">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={cartItem.item.image_url}
                        alt={'name' in cartItem.item ? cartItem.item.name : cartItem.item.category_name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {'name' in cartItem.item ? cartItem.item.name : cartItem.item.category_name}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {cartItem.quantity}</p>
                      <p className="text-sm font-semibold">${(cartItem.item.price * cartItem.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Processing Fee (5%)</span>
                  <span className="font-medium">${processingFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">${totalWithFees.toFixed(2)}</span>
                </div>
              </div>

              {/* Sustainability Impact */}
              <div className="bg-green-50 rounded-lg p-3 mt-4">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="size-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-800">Environmental Impact</span>
                </div>
                <p className="text-xs text-gray-700">
                  This order saves ~{(cart.length * 2.5).toFixed(1)} kg CO₂
                </p>
              </div>

              <p className="text-xs text-gray-500 pt-2">
                Tax will be calculated based on your location
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
