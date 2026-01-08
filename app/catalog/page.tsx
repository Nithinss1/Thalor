'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf, Gift, Heart, TreePine, ShoppingCart, Check, Eye } from "lucide-react"
import { mockGiftItems, mockCategoryGifts } from "@/src/data/mockData"
import { GiftItem, CategoryGift } from "@/src/types"
import { useCart } from '@/contexts/CartContext'

export default function GiftCatalogPage() {
  const { addToCart } = useCart()
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())

  const handleAddToCart = (item: GiftItem | CategoryGift, type: 'gift_item' | 'category_gift') => {
    addToCart(item, type)
    setAddedItems(prev => new Set(prev).add(item.id))
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(item.id)
        return newSet
      })
    }, 2000)
  }
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'physical': return <Gift className="size-4" />
      case 'digital': return <Leaf className="size-4" />
      case 'donation': return <Heart className="size-4" />
      case 'offset': return <TreePine className="size-4" />
      default: return <Gift className="size-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'physical': return 'bg-blue-100 text-blue-800'
      case 'digital': return 'bg-green-100 text-green-800'
      case 'donation': return 'bg-purple-100 text-purple-800'
      case 'offset': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Sustainable Gift Catalog</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Curated eco-friendly gifts, charity donations, and carbon offsets.
          Every option is sustainably sourced and environmentally conscious.
        </p>
      </div>

      {/* Category Gift Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Category Gifts - Let Recipients Choose</h2>
        <p className="text-gray-600 mb-6">
          Send a category of gifts and let recipients select their preferred option.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategoryGifts.map((categoryGift) => (
            <Card key={categoryGift.id} className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-purple-200">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={categoryGift.image_url}
                  alt={categoryGift.category_name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-purple-100 text-purple-800">
                    <Gift className="size-4" />
                    <span className="ml-1">Category Gift</span>
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900">
                    ${categoryGift.price}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900 text-xs">
                    {categoryGift.options.length} options available
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{categoryGift.category_name}</CardTitle>
                <p className="text-sm text-gray-600">{categoryGift.category_description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="mb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <Leaf className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{categoryGift.sustainability_notes}</p>
                  </div>
                  {categoryGift.carbon_impact && (
                    <div className="bg-green-50 rounded-lg p-3 mt-3">
                      <p className="text-sm font-medium text-green-800">
                        Carbon Impact: {categoryGift.carbon_impact}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(categoryGift, 'category_gift')}
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                      disabled={addedItems.has(categoryGift.id)}
                    >
                      {addedItems.has(categoryGift.id) ? (
                        <>
                          <Check className="mr-2 size-4" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 size-4" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                    <Link href={`/gift/${categoryGift.id}?type=category`}>
                      <Button variant="outline" size="icon" className="border-purple-200 hover:bg-purple-50">
                        <Eye className="size-4" />
                      </Button>
                    </Link>
                  </div>
                  <Link href="/send-gift" className="block">
                    <Button variant="outline" className="w-full">
                      Send Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Individual Gift Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Individual Gifts - Specific Items</h2>
        <p className="text-gray-600 mb-6">
          Send specific sustainable products directly to recipients.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGiftItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={getCategoryColor(item.category)}>
                    {getCategoryIcon(item.category)}
                    <span className="ml-1 capitalize">{item.category}</span>
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900">
                    ${item.price}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <p className="text-sm text-gray-600">{item.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="mb-4">
                  <div className="flex items-start gap-2 mb-2">
                    <Leaf className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{item.sustainability_notes}</p>
                  </div>
                  {item.carbon_impact && (
                    <div className="bg-green-50 rounded-lg p-3 mt-3">
                      <p className="text-sm font-medium text-green-800">
                        Carbon Impact: {item.carbon_impact}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(item, 'gift_item')}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      disabled={addedItems.has(item.id)}
                    >
                      {addedItems.has(item.id) ? (
                        <>
                          <Check className="mr-2 size-4" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 size-4" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                    <Link href={`/gift/${item.id}?type=item`}>
                      <Button variant="outline" size="icon" className="border-green-200 hover:bg-green-50">
                        <Eye className="size-4" />
                      </Button>
                    </Link>
                  </div>
                  <Link href="/send-gift" className="block">
                    <Button variant="outline" className="w-full">
                      Send Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-0">
            <h3 className="text-2xl font-bold mb-4">Can&apos;t Find What You&apos;re Looking For?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our catalog is constantly growing. Contact us to suggest new sustainable products
              or partner with us to add your eco-friendly offerings.
            </p>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              Contact Us
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
