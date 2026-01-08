import { NextResponse } from 'next/server'
import { mockCategoryGifts } from '@/src/data/mockData'

export async function GET() {
  return NextResponse.json(mockCategoryGifts)
}
