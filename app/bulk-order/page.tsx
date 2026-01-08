'use client'

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Users, Upload, FileText, DollarSign, CheckCircle, Sparkles, Leaf, Mail } from "lucide-react"

export default function BulkOrderPage() {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    contact_email: '',
    recipient_count: 10,
    budget_per_gift: 50,
    campaign_name: '',
    message: '',
    csv_file: null as File | null
  })
  const [orderPlaced, setOrderPlaced] = useState(false)

  const totalCost = formData.recipient_count * formData.budget_per_gift

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, csv_file: e.target.files[0] })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="p-8 text-center border-2 shadow-xl">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <CheckCircle className="size-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bulk Order Received!
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Your bulk gift order for <span className="font-semibold text-gray-800">{formData.recipient_count} recipients</span> has been submitted.
                <br />Our team will review and process your order within 24 hours.
              </p>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 mb-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Recipients</p>
                    <p className="text-2xl font-bold text-gray-800">{formData.recipient_count}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Total Cost</p>
                    <p className="text-2xl font-bold text-blue-600">${totalCost.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 justify-center">
                    <Leaf className="size-4 text-green-600" />
                    <p className="text-sm text-gray-700">
                      Environmental Impact: ~{(formData.recipient_count * 2.5).toFixed(1)} kg CO₂ saved
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md">
                    View Dashboard
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => setOrderPlaced(false)} className="border-2">
                  Place Another Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-4">
            <Sparkles className="size-4" />
            <span className="text-sm font-semibold">Bulk Gifting at Scale</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bulk Gift Orders
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Send sustainable gifts to your entire team or client list. Streamline your corporate gifting with our bulk ordering system.
          </p>
        </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Information */}
        <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Users className="size-5 text-white" />
              </div>
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <Label htmlFor="company_name" className="text-base font-semibold">Company Name</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                  placeholder="Acme Corp"
                  className="h-12 text-base"
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="campaign_name" className="text-base font-semibold">Campaign Name</Label>
                <Input
                  id="campaign_name"
                  value={formData.campaign_name}
                  onChange={(e) => setFormData({...formData, campaign_name: e.target.value})}
                  placeholder="Q1 2024 Employee Recognition"
                  className="h-12 text-base"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <Label htmlFor="contact_name" className="text-base font-semibold">Contact Name</Label>
                <Input
                  id="contact_name"
                  value={formData.contact_name}
                  onChange={(e) => setFormData({...formData, contact_name: e.target.value})}
                  placeholder="Jane Smith"
                  className="h-12 text-base"
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="contact_email" className="text-base font-semibold">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
                  placeholder="jane@acme.com"
                  className="h-12 text-base"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recipients */}
        <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Upload className="size-5 text-white" />
              </div>
              Upload Recipients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-3">
              <Label htmlFor="csv_file" className="text-base font-semibold">Recipient List (CSV)</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="csv_file"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="flex-1 h-12 text-base"
                />
                <Button type="button" variant="outline" size="sm" className="h-12 border-2">
                  <FileText className="size-4 mr-2" />
                  Template
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                Upload a CSV with columns: name, email, phone (optional)
              </p>
              {formData.csv_file && (
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-sm font-medium text-green-800">
                    ✓ {formData.csv_file.name} uploaded successfully
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <Label htmlFor="recipient_count" className="text-base font-semibold">Number of Recipients</Label>
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Users className="size-5 text-gray-600" />
                </div>
                <Input
                  id="recipient_count"
                  type="number"
                  min="1"
                  value={formData.recipient_count}
                  onChange={(e) => setFormData({...formData, recipient_count: Number(e.target.value)})}
                  className="flex-1 h-12 text-base"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gift Budget */}
        <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="bg-green-600 p-2 rounded-lg">
                <DollarSign className="size-5 text-white" />
              </div>
              Budget & Message
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-3">
              <Label htmlFor="budget_per_gift" className="text-base font-semibold">Budget Per Gift</Label>
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <DollarSign className="size-5 text-gray-600" />
                </div>
                <Input
                  id="budget_per_gift"
                  type="number"
                  min="10"
                  max="500"
                  value={formData.budget_per_gift}
                  onChange={(e) => setFormData({...formData, budget_per_gift: Number(e.target.value)})}
                  className="flex-1 h-12 text-base"
                  required
                />
              </div>
              <p className="text-sm text-gray-500">Range: $10 - $500 per recipient</p>
            </div>
            <div className="space-y-3">
              <Label htmlFor="message" className="text-base font-semibold">Personalized Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Thank you for your hard work this quarter..."
                rows={4}
                className="resize-none text-base"
              />
              <p className="text-sm text-gray-500">This message will be included with each gift</p>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="border-2 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="size-5 text-white" />
              </div>
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-base">
                <span className="text-gray-700 font-medium">Recipients:</span>
                <span className="font-bold text-gray-900">{formData.recipient_count}</span>
              </div>
              <div className="flex justify-between items-center text-base">
                <span className="text-gray-700 font-medium">Budget per gift:</span>
                <span className="font-bold text-gray-900">${formData.budget_per_gift}</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total Cost:</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${totalCost.toLocaleString()}
                </span>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200 mt-4">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="size-5 text-green-600" />
                  <span className="text-sm font-semibold text-green-800">Environmental Impact</span>
                </div>
                <p className="text-sm text-gray-700">
                  Estimated carbon savings: ~{(formData.recipient_count * 2.5).toFixed(1)} kg CO₂
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="bg-white rounded-xl p-6 border-2 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-600">
                🎁 Orders typically processed within 24 hours
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Our team will contact you to finalize details
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
                className="flex-1 md:flex-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 shadow-md"
              >
                <Users className="mr-2 size-4" />
                Place Bulk Order
              </Button>
            </div>
          </div>
        </div>
      </form>
      </div>
    </div>
  )
}
