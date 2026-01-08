import { NextResponse } from 'next/server'
import { mockGiftItems, mockCategoryGifts } from '@/src/data/mockData'

export async function GET() {
  return NextResponse.json({
    giftItems: mockGiftItems,
    categoryGifts: mockCategoryGifts,
  })
}
