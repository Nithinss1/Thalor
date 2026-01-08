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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Gift, Leaf, CheckCircle, MapPin } from "lucide-react"
import { mockCategoryGifts } from "@/src/data/mockData"
import { GiftOption } from "@/src/types"

export default function CategoryRedeemPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [redeemed, setRedeemed] = useState(false)
  const [selectedCategory] = useState(mockCategoryGifts[0]) // Use first category as example
  const [selectedOption, setSelectedOption] = useState<GiftOption | null>(null)
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
    if (!selectedOption) return
    setRedeemed(true)
  }

  if (redeemed && selectedOption) {
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
              <p className="font-semibold mb-2">{selectedOption.name}</p>
              {selectedOption.brand && (
                <p className="text-sm text-gray-500 mb-2">by {selectedOption.brand}</p>
              )}
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
        <h1 className="text-3xl font-bold mb-2">Redeem Your Category Gift</h1>
        <p className="text-gray-600">
          You&apos;ve received a category gift! Choose your preferred option below.
        </p>
        <p className="text-sm text-gray-500 mt-1">Gift ID: {id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Info */}
          <Card>
            <CardHeader>
              <CardTitle>Your Category Gift</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-bold text-lg mb-1">{selectedCategory.category_name}</h3>
              <p className="text-sm text-gray-600 mb-3">{selectedCategory.category_description}</p>
              <div className="flex items-center gap-4">
                <Badge className="bg-purple-100 text-purple-800">
                  <Gift className="size-3 mr-1" />
                  {selectedCategory.options.length} options available
                </Badge>
                {selectedCategory.carbon_impact && (
                  <Badge className="bg-green-100 text-green-800">
                    <Leaf className="size-3 mr-1" />
                    {selectedCategory.carbon_impact}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Gift Options Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Gift</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedOption?.id || ''}
                onValueChange={(value) => {
                  const option = selectedCategory.options.find(opt => opt.id === value)
                  setSelectedOption(option || null)
                }}
              >
                <div className="space-y-4">
                  {selectedCategory.options.map((option) => (
                    <div key={option.id} className="relative">
                      <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedOption?.id === option.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <div className="flex items-start gap-4">
                          <RadioGroupItem
                            value={option.id}
                            id={option.id}
                            className="mt-1"
                          />
                          <Label
                            htmlFor={option.id}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex gap-4">
                              <div className="relative w-24 h-24 flex-shrink-0">
                                <Image
                                  src={option.image_url}
                                  alt={option.name}
                                  fill
                                  className="object-cover rounded-lg"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold mb-1">{option.name}</h4>
                                {option.brand && (
                                  <p className="text-sm text-gray-500 mb-1">by {option.brand}</p>
                                )}
                                <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                                <div className="flex items-start gap-2">
                                  <Leaf className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <p className="text-xs text-gray-700">{option.sustainability_notes}</p>
                                </div>
                                {option.carbon_impact && (
                                  <p className="text-xs text-green-600 mt-1">
                                    🌱 {option.carbon_impact}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              {!selectedOption && (
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Please select one of the options above to continue
                </p>
              )}
            </CardContent>
          </Card>

          {/* Shipping Form */}
          {selectedOption && (
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

              <Button
                type="submit"
                className="w-full mt-6 bg-green-600 hover:bg-green-700"
                disabled={!selectedOption}
              >
                <Gift className="mr-2 size-4" />
                Confirm & Redeem Gift
              </Button>
            </form>
          )}
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
                <p className="text-sm text-gray-600">{selectedCategory.sustainability_notes}</p>
              </div>
              <Separator />
              {selectedOption && (
                <>
                  <div>
                    <h4 className="font-semibold mb-1">Your Selection</h4>
                    <p className="text-sm font-medium text-green-700">{selectedOption.name}</p>
                    {selectedOption.brand && (
                      <p className="text-xs text-gray-500">by {selectedOption.brand}</p>
                    )}
                  </div>
                  <Separator />
                </>
              )}
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
