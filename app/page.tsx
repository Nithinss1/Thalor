'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Gift, BarChart3, Heart, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Sustainable Gifting for
            <span className="text-green-600"> Modern Teams</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Send meaningful, eco-friendly gifts to employees, clients, and partners.
            Recipients choose from curated sustainable products, charity donations, or carbon offsets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/send-gift">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 px-8 py-6 text-lg"
              >
                <Gift className="mr-2 size-5" />
                Send Your First Gift
              </Button>
            </Link>
            <Link href="/bulk-order">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg"
              >
                <Users className="mr-2 size-5" />
                Bulk Order for Teams
              </Button>
            </Link>
            <Link href="/catalog">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg"
              >
                Browse Gift Catalog
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">2.3M kg</div>
              <div className="text-gray-600">CO₂ Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">50K+</div>
              <div className="text-gray-600">Gifts Sent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="text-gray-600">Recipient Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 bg-white rounded-3xl mx-4 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-12">How Thalor Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Gift className="size-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Send</h3>
            <p className="text-gray-600">
              Choose your budget, add a personal message, and send to recipients via email or phone.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Heart className="size-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Choose</h3>
            <p className="text-gray-600">
              Recipients select from sustainable products, charity donations, or carbon offsets.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <BarChart3 className="size-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Track</h3>
            <p className="text-gray-600">
              Monitor redemption rates, carbon impact, and ROI through your analytics dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Thalor?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center border-green-200 hover:border-green-400 transition-colors">
            <CardContent className="p-0">
              <Leaf className="size-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">100% Sustainable</h3>
              <p className="text-sm text-gray-600">
                Every option in our catalog is eco-friendly and carbon conscious.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 text-center border-blue-200 hover:border-blue-400 transition-colors">
            <CardContent className="p-0">
              <Gift className="size-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Waste</h3>
              <p className="text-sm text-gray-600">
                Recipients choose what they want, eliminating unwanted gifts.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 text-center border-purple-200 hover:border-purple-400 transition-colors">
            <CardContent className="p-0">
              <BarChart3 className="size-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Track Impact</h3>
              <p className="text-sm text-gray-600">
                See your carbon savings and environmental impact in real-time.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 text-center border-orange-200 hover:border-orange-400 transition-colors">
            <CardContent className="p-0">
              <Heart className="size-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Meaningful</h3>
              <p className="text-sm text-gray-600">
                Gifts that align with values and make a positive impact.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Gifting Sustainably?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of companies reducing their environmental impact while delighting recipients.
          </p>
          <Link href="/send-gift">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg"
            >
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
