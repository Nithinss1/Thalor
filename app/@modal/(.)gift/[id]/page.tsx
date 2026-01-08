import { use } from 'react'
import { GiftModal } from '@/components/GiftModal'
import { mockGiftItems, mockCategoryGifts } from '@/src/data/mockData'

export default function GiftModalPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ type?: string }>
}) {
  const { id } = use(params)
  const { type } = use(searchParams)

  const isCategory = type === 'category'
  const gift = isCategory
    ? mockCategoryGifts.find((g) => g.id === id)
    : mockGiftItems.find((g) => g.id === id)

  if (!gift) {
    return null
  }

  return <GiftModal gift={gift} type={isCategory ? 'category_gift' : 'gift_item'} />
}
