'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, ShoppingCart, X } from "lucide-react"
import { GiftItem, CategoryGift } from "@/src/types"
import { useCart } from '@/contexts/CartContext'

interface GiftModalProps {
  gift: GiftItem | CategoryGift
  type: 'gift_item' | 'category_gift'
}

export function GiftModal({ gift, type }: GiftModalProps) {
  const router = useRouter()
  const { addToCart } = useCart()

  const handleClose = () => {
    router.back()
  }

  const handleAddToCart = () => {
    addToCart(gift, type)
    setTimeout(() => {
      router.back()
    }, 500)
  }

  const isCategory = 'options' in gift
  const name = isCategory ? gift.category_name : gift.name
  const description = isCategory ? gift.category_description : gift.description

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <Image
              src={gift.image_url}
              alt={name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-white/90 text-gray-900 text-lg px-4 py-2">
                ${gift.price}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-600">{description}</p>
          </div>

          {/* Sustainability */}
          <div className="bg-green-50 rounded-lg p-4 border-2 border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="size-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Sustainability Notes</h3>
            </div>
            <p className="text-sm text-gray-700">{gift.sustainability_notes}</p>
            {gift.carbon_impact && (
              <div className="mt-3 bg-green-100 rounded-lg p-3">
                <p className="text-sm font-medium text-green-800">
                  🌱 Carbon Impact: {gift.carbon_impact}
                </p>
              </div>
            )}
          </div>

          {/* Options for Category Gifts */}
          {isCategory && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Available Options ({gift.options.length})</h3>
              <div className="grid grid-cols-2 gap-3">
                {gift.options.slice(0, 4).map((option) => (
                  <div key={option.id} className="border rounded-lg p-3 hover:border-green-500 transition-colors">
                    <div className="relative h-24 mb-2 rounded overflow-hidden">
                      <Image
                        src={option.image_url}
                        alt={option.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="font-medium text-sm">{option.name}</p>
                    {option.brand && (
                      <p className="text-xs text-gray-500">{option.brand}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              <ShoppingCart className="mr-2 size-4" />
              Add to Cart
            </Button>
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
