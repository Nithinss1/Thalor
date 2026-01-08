import { NextResponse } from 'next/server'
import { mockGiftItems, mockCategoryGifts } from '@/src/data/mockData'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const giftItem = mockGiftItems.find(item => item.id === id)
  const categoryGift = mockCategoryGifts.find(cat => cat.id === id)

  const gift = giftItem || categoryGift

  if (!gift) {
    return NextResponse.json({ error: 'Gift not found' }, { status: 404 })
  }

  return NextResponse.json(gift)
}
