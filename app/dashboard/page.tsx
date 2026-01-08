'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Gift,
  TrendingUp,
  Users,
  Leaf,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  ShoppingCart,
  BarChart3,
  Sparkles,
  Package,
  Heart,
  TreePine
} from "lucide-react"
import { useCart } from '@/contexts/CartContext'
import { mockGifts, mockCampaigns } from "@/src/data/mockData"
import { format } from "@/src/utils/date-fns"

interface SentGift {
  id: string
  recipient_email: string
  sender_name: string
  budget: number
  status: 'sent' | 'redeemed' | 'expired'
  created_at: string
  gift_type: string
}

export default function DashboardPage() {
  const { cart } = useCart()
  const [sentGifts, setSentGifts] = useState<SentGift[]>([])

  // Load sent gifts from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('sentGifts')
    if (stored) {
      setSentGifts(JSON.parse(stored))
    } else {
      // Initialize with mock data if no stored gifts
      setSentGifts(mockGifts)
    }
  }, [])

  // Calculate stats from actual data
  const totalGifts = sentGifts.length
  const redeemedGifts = sentGifts.filter(g => g.status === 'redeemed').length
  const pendingGifts = sentGifts.filter(g => g.status === 'sent').length
  const redemptionRate = totalGifts > 0 ? Math.round((redeemedGifts / totalGifts) * 100) : 0

  // Calculate total spent and carbon impact
  const totalSpent = sentGifts.reduce((sum, gift) => sum + gift.budget, 0)
  const carbonSaved = totalGifts * 2.5 // 2.5 kg CO₂ per gift

  // Calculate cart value
  const cartValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'redeemed': return <CheckCircle className="size-4 text-green-600" />
      case 'sent': return <Clock className="size-4 text-yellow-600" />
      case 'expired': return <XCircle className="size-4 text-red-600" />
      default: return <Clock className="size-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'redeemed': return 'bg-green-100 text-green-800 border-green-200'
      case 'sent': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'expired': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'physical': return <Package className="size-4 text-blue-600" />
      case 'donation': return <Heart className="size-4 text-purple-600" />
      case 'offset': return <TreePine className="size-4 text-orange-600" />
      default: return <Gift className="size-4 text-green-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
              <BarChart3 className="size-4" />
              <span className="text-sm font-semibold">Analytics Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Gift Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Track your sustainable gifting campaigns and environmental impact
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/cart">
              <Button variant="outline" className="border-2 relative">
                <ShoppingCart className="mr-2 size-4" />
                Cart
                {cartItems > 0 && (
                  <Badge className="ml-2 bg-green-600">{cartItems}</Badge>
                )}
              </Button>
            </Link>
            <Link href="/send-gift">
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-md">
                <Gift className="mr-2 size-4" />
                Send New Gift
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="text-sm font-semibold">Total Gifts Sent</CardTitle>
              <div className="bg-blue-600 p-2 rounded-lg">
                <Gift className="size-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-gray-900">{totalGifts}</div>
              <p className="text-sm text-gray-600 mt-1">
                {pendingGifts} pending • {redeemedGifts} redeemed
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle className="text-sm font-semibold">Redemption Rate</CardTitle>
              <div className="bg-green-600 p-2 rounded-lg">
                <TrendingUp className="size-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-gray-900">{redemptionRate}%</div>
              <p className="text-sm text-gray-600 mt-1">
                {redeemedGifts} of {totalGifts} gifts
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-50 to-purple-100">
              <CardTitle className="text-sm font-semibold">Total Spent</CardTitle>
              <div className="bg-purple-600 p-2 rounded-lg">
                <Users className="size-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-gray-900">${totalSpent.toLocaleString()}</div>
              <p className="text-sm text-gray-600 mt-1">
                Across {mockCampaigns.length} campaigns
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-orange-50 to-orange-100">
              <CardTitle className="text-sm font-semibold">Carbon Impact</CardTitle>
              <div className="bg-orange-600 p-2 rounded-lg">
                <Leaf className="size-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-gray-900">{carbonSaved.toFixed(1)} kg</div>
              <p className="text-sm text-gray-600 mt-1">
                CO₂ saved this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cart Preview (if items in cart) */}
        {cartItems > 0 && (
          <Card className="mb-8 border-2 border-green-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-green-600 p-2 rounded-lg">
                    <ShoppingCart className="size-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Active Cart</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {cartItems} item{cartItems !== 1 ? 's' : ''} ready to send
                    </p>
                  </div>
                </div>
                <Link href="/cart">
                  <Button className="bg-green-600 hover:bg-green-700">
                    View Cart
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">
                  ${cartValue.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">
                  Potential carbon savings: {(cartItems * 2.5).toFixed(1)} kg CO₂
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="gifts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 border-2">
            <TabsTrigger value="gifts" className="data-[state=active]:bg-white">
              Recent Gifts
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-white">
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gifts" className="space-y-6">
            <Card className="border-2 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="text-xl">Recent Gifts</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Track all gifts you've sent and their redemption status
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                {sentGifts.length === 0 ? (
                  <div className="text-center py-12">
                    <Gift className="size-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No gifts sent yet</p>
                    <Link href="/send-gift">
                      <Button className="bg-green-600 hover:bg-green-700">
                        Send Your First Gift
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sentGifts.map((gift) => (
                      <div key={gift.id} className="flex items-center justify-between p-4 border-2 rounded-xl hover:bg-gray-50 transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(gift.status)}
                            <Badge className={`${getStatusColor(gift.status)} border`}>
                              {gift.status}
                            </Badge>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getCategoryIcon(gift.gift_type)}
                              <p className="font-semibold text-gray-900">{gift.recipient_email}</p>
                            </div>
                            <p className="text-sm text-gray-600">
                              From {gift.sender_name} • Budget: ${gift.budget}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Sent {format(gift.created_at, 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="hover:bg-gray-200">
                          <Eye className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card className="border-2 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100">
                <div>
                  <CardTitle className="text-xl">Gift Campaigns</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage bulk gifting campaigns for teams and clients
                  </p>
                </div>
                <Link href="/bulk-order">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Sparkles className="mr-2 size-4" />
                    Create Campaign
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {mockCampaigns.map((campaign) => (
                    <div key={campaign.id} className="p-5 border-2 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{campaign.name}</h4>
                        <Badge variant="outline" className="border-2 text-base">
                          {Math.round((campaign.redeemed_gifts / campaign.total_gifts) * 100)}% redeemed
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <p className="text-sm text-gray-600 mb-1">Total Gifts</p>
                          <p className="text-xl font-bold text-gray-900">{campaign.total_gifts}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <p className="text-sm text-gray-600 mb-1">Redeemed</p>
                          <p className="text-xl font-bold text-green-700">{campaign.redeemed_gifts}</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                          <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                          <p className="text-xl font-bold text-purple-700">${campaign.total_spent}</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                          <p className="text-sm text-gray-600 mb-1">Carbon Saved</p>
                          <p className="text-xl font-bold text-orange-700">{campaign.carbon_saved}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Leaf className="size-5 text-green-600" />
                    Impact Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-6">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Total CO₂ Saved</span>
                    <span className="font-bold text-green-600 text-lg">{carbonSaved.toFixed(1)} kg</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Trees Planted</span>
                    <span className="font-bold text-lg">{Math.floor(totalGifts / 5)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Ocean Plastic Removed</span>
                    <span className="font-bold text-lg">{(totalGifts * 0.5).toFixed(1)} lbs</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium">Renewable Energy Supported</span>
                    <span className="font-bold text-lg">{(totalGifts * 0.1).toFixed(1)} MWh</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-100">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BarChart3 className="size-5 text-blue-600" />
                    Gift Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Charity Donations</span>
                      <span className="text-sm font-bold">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full shadow-sm" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Physical Gifts</span>
                      <span className="text-sm font-bold">30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-sm" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Carbon Offsets</span>
                      <span className="text-sm font-bold">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full shadow-sm" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Digital Products</span>
                      <span className="text-sm font-bold">10%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full shadow-sm" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
