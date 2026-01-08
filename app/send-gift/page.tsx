'use client'

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Gift, Mail, DollarSign, Palette, Copy, CheckCircle, Sparkles } from "lucide-react"

export default function SendGiftPage() {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    recipient_email: '',
    recipient_phone: '',
    message: '',
    budget: 50,
    gift_type: '',
    company_name: '',
    primary_color: '#16a34a'
  })
  const [giftSent, setGiftSent] = useState(false)
  const [giftLink] = useState('https://thalor.com/redeem/abc123xyz')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setGiftSent(true)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(giftLink)
  }

  if (giftSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="p-8 text-center border-2 shadow-xl">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-green-400 to-green-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <CheckCircle className="size-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Gift Sent Successfully!
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Your sustainable gift has been sent to <span className="font-semibold text-gray-800">{formData.recipient_email}</span>.
                <br />They&apos;ll receive an email with redemption instructions.
              </p>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 mb-8">
                <Label className="text-sm font-semibold text-gray-700 mb-3 block">Gift Redemption Link</Label>
                <div className="flex items-center gap-2">
                  <Input value={giftLink} readOnly className="font-mono text-sm bg-white" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex-shrink-0 hover:bg-green-50"
                  >
                    <Copy className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-md">
                    View Dashboard
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => setGiftSent(false)} className="border-2">
                  Send Another Gift
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
            <Sparkles className="size-4" />
            <span className="text-sm font-semibold">Sustainable Gifting</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Send a Sustainable Gift
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create a meaningful gift experience that aligns with your values and makes a positive environmental impact
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gift Selection */}
            <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="bg-green-600 p-2 rounded-lg">
                    <Gift className="size-5 text-white" />
                  </div>
                  Gift Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-3">
                  <Label htmlFor="gift_type" className="text-base font-semibold">Choose a Gift Category</Label>
                  <Select value={formData.gift_type} onValueChange={(value) => setFormData({...formData, gift_type: value})}>
                    <SelectTrigger id="gift_type" className="h-12 text-base">
                      <SelectValue placeholder="Select gift type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-white border-2 shadow-xl">
                      <SelectItem value="physical" className="text-base py-3 bg-white hover:bg-gray-100">🎁 Physical Gifts</SelectItem>
                      <SelectItem value="digital" className="text-base py-3 bg-white hover:bg-gray-100">💻 Digital Products</SelectItem>
                      <SelectItem value="donation" className="text-base py-3 bg-white hover:bg-gray-100">❤️ Charity Donations</SelectItem>
                      <SelectItem value="offset" className="text-base py-3 bg-white hover:bg-gray-100">🌳 Carbon Offsets</SelectItem>
                    </SelectContent>
                  </Select>
                  <Link href="/catalog">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-2 border-2 hover:bg-green-50"
                    >
                      Browse Gift Catalog
                    </Button>
                  </Link>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="budget" className="text-base font-semibold">Budget Range</Label>
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <DollarSign className="size-5 text-gray-600" />
                    </div>
                    <Input
                      id="budget"
                      type="number"
                      min="10"
                      max="500"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})}
                      className="flex-1 h-12 text-base"
                    />
                  </div>
                  <p className="text-sm text-gray-500">Range: $10 - $500</p>
                </div>
              </CardContent>
            </Card>

            {/* Recipient & Message */}
            <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Mail className="size-5 text-white" />
                  </div>
                  Recipient & Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-3">
                    <Label htmlFor="sender_name" className="text-base font-semibold">Your Name</Label>
                    <Input
                      id="sender_name"
                      value={formData.sender_name}
                      onChange={(e) => setFormData({...formData, sender_name: e.target.value})}
                      placeholder="John Smith"
                      className="h-12 text-base"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="sender_email" className="text-base font-semibold">Your Email</Label>
                    <Input
                      id="sender_email"
                      type="email"
                      value={formData.sender_email}
                      onChange={(e) => setFormData({...formData, sender_email: e.target.value})}
                      placeholder="john@company.com"
                      className="h-12 text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="recipient_email" className="text-base font-semibold">Recipient Email</Label>
                  <Input
                    id="recipient_email"
                    type="email"
                    value={formData.recipient_email}
                    onChange={(e) => setFormData({...formData, recipient_email: e.target.value})}
                    placeholder="recipient@example.com"
                    className="h-12 text-base"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="recipient_phone" className="text-base font-semibold">
                    Recipient Phone <span className="text-gray-400 font-normal">(Optional)</span>
                  </Label>
                  <Input
                    id="recipient_phone"
                    type="tel"
                    value={formData.recipient_phone}
                    onChange={(e) => setFormData({...formData, recipient_phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-base font-semibold">Personal Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Thank you for your outstanding work..."
                    rows={4}
                    className="resize-none text-base"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Branding & Customization */}
          <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <Palette className="size-5 text-white" />
                </div>
                Branding & Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="company_name" className="text-base font-semibold">Company Name</Label>
                    <Input
                      id="company_name"
                      value={formData.company_name}
                      onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                      placeholder="Your Company"
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="primary_color" className="text-base font-semibold">Brand Color</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="primary_color"
                        type="color"
                        value={formData.primary_color}
                        onChange={(e) => setFormData({...formData, primary_color: e.target.value})}
                        className="w-20 h-12 p-1 border-2 cursor-pointer"
                      />
                      <Input
                        value={formData.primary_color}
                        onChange={(e) => setFormData({...formData, primary_color: e.target.value})}
                        placeholder="#16a34a"
                        className="flex-1 h-12 font-mono text-base"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2">
                  <h4 className="font-semibold mb-4 text-gray-700">Live Preview</h4>
                  <div
                    className="bg-white rounded-xl p-6 border-l-4 shadow-md"
                    style={{ borderLeftColor: formData.primary_color }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                        style={{ backgroundColor: formData.primary_color }}
                      >
                        <Gift className="size-5 text-white" />
                      </div>
                      <span className="font-bold text-lg">{formData.company_name || 'Your Company'}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      You&apos;ve received a sustainable gift! Click to redeem your eco-friendly selection.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="bg-white rounded-xl p-6 border-2 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-gray-600">
                  🌱 Gift will expire in 30 days if not redeemed
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Unused budget will be automatically refunded
                </p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <Link href="/catalog" className="flex-1 md:flex-none">
                  <Button type="button" variant="outline" className="w-full border-2">
                    Back to Catalog
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="flex-1 md:flex-none bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-8 shadow-md"
                >
                  <Gift className="mr-2 size-4" />
                  Send Gift
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
