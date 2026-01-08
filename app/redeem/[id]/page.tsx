'use client'

import { useState } from "react"
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Gift, Leaf, CheckCircle, MapPin } from "lucide-react"
import { mockGiftItems } from "@/src/data/mockData"

export default function RedeemPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [redeemed, setRedeemed] = useState(false)
  const [selectedGift] = useState(mockGiftItems[0]) // Use first gift as example
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'US'
  })

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault()
    setRedeemed(true)
  }

  if (redeemed) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-8 text-center bg-green-50 border-green-200">
          <CardContent className="p-0">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="size-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-green-800">Gift Redeemed Successfully!</h2>
            <p className="text-gray-700 mb-6">
              Your sustainable gift has been confirmed. You&apos;ll receive a confirmation email with tracking information shortly.
            </p>
            <div className="bg-white rounded-lg p-4 border mb-6">
              <p className="font-semibold mb-2">{selectedGift.name}</p>
              <p className="text-sm text-gray-600">
                Delivering to: {address.street}, {address.city}, {address.state} {address.zip}
              </p>
            </div>
            <Link href="/">
              <Button className="bg-green-600 hover:bg-green-700">
                Done
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Redeem Your Gift</h1>
        <p className="text-gray-600">
          You&apos;ve received a sustainable gift! Complete the form below to redeem it.
        </p>
        <p className="text-sm text-gray-500 mt-1">Gift ID: {id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gift Preview */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Gift</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <Image
                    src={selectedGift.image_url}
                    alt={selectedGift.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{selectedGift.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{selectedGift.description}</p>
                  <Badge className="bg-green-100 text-green-800">
                    <Leaf className="size-3 mr-1" />
                    {selectedGift.category}
                  </Badge>
                  {selectedGift.carbon_impact && (
                    <p className="text-sm text-green-600 mt-2">
                      🌱 {selectedGift.carbon_impact}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Form */}
          <form onSubmit={handleRedeem}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="size-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={address.name}
                    onChange={(e) => setAddress({...address, name: e.target.value})}
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={address.street}
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                    placeholder="123 Main St, Apt 4B"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={address.city}
                      onChange={(e) => setAddress({...address, city: e.target.value})}
                      placeholder="San Francisco"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={address.state}
                      onChange={(e) => setAddress({...address, state: e.target.value})}
                      placeholder="CA"
                      maxLength={2}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    value={address.zip}
                    onChange={(e) => setAddress({...address, zip: e.target.value})}
                    placeholder="94105"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full mt-6 bg-green-600 hover:bg-green-700">
              <Gift className="mr-2 size-4" />
              Confirm & Redeem Gift
            </Button>
          </form>
        </div>

        {/* Info Sidebar */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>About This Gift</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-1">Sustainability</h4>
                <p className="text-sm text-gray-600">{selectedGift.sustainability_notes}</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-1">Delivery</h4>
                <p className="text-sm text-gray-600">
                  Your gift will be shipped carbon-neutral within 3-5 business days.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-1">Questions?</h4>
                <p className="text-sm text-gray-600">
                  Contact us at support@thalor.com for any questions about your gift.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
