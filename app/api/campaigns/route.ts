import { NextResponse } from 'next/server'
import { mockCampaigns } from '@/src/data/mockData'

export async function GET() {
  return NextResponse.json(mockCampaigns)
}
