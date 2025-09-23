import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Gift, Mail, Phone, DollarSign, Palette, Copy, CheckCircle } from "lucide-react";
import { mockGiftItems } from "../data/mockData";
import { GiftItem, CategoryGift } from "../types";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SendGiftFormProps {
  preselectedItem?: GiftItem;
  preselectedCategory?: CategoryGift;
  onNavigate: (page: string, giftItem?: GiftItem, categoryGift?: CategoryGift, orderData?: any) => void;
}

export function SendGiftForm({ preselectedItem, preselectedCategory, onNavigate }: SendGiftFormProps) {
  const [selectedItem, setSelectedItem] = useState<GiftItem | null>(preselectedItem || null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryGift | null>(preselectedCategory || null);
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    recipient_email: '',
    recipient_phone: '',
    message: '',
    budget: preselectedItem?.price || preselectedCategory?.price || 50,
    company_name: '',
    primary_color: '#2563eb'
  });
  const [giftSent, setGiftSent] = useState(false);
  const [giftLink] = useState('https://thalor.com/redeem/abc123xyz');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to checkout with order data
    const orderData = {
      type: 'single' as const,
      recipientCount: 1,
      totalAmount: formData.budget,
      giftName: selectedItem?.name || selectedCategory?.category_name || 'Custom Gift',
      companyName: formData.company_name || 'Your Company',
      senderName: formData.sender_name,
      senderEmail: formData.sender_email,
      recipientEmail: formData.recipient_email,
      message: formData.message
    };
    onNavigate('checkout', undefined, undefined, orderData);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(giftLink);
  };

  if (giftSent) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-8 text-center bg-green-50 border-green-200">
          <CardContent className="p-0">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="size-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-green-800">Gift Sent Successfully!</h2>
            <p className="text-gray-700 mb-6">
              Your sustainable gift has been sent to {formData.recipient_email}. 
              They'll receive an email with redemption instructions.
            </p>
            
            <div className="bg-white rounded-lg p-4 border mb-6">
              <Label className="text-sm font-medium text-gray-600">Gift Redemption Link</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input value={giftLink} readOnly className="font-mono text-sm" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="flex-shrink-0"
                >
                  <Copy className="size-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => onNavigate('dashboard')} className="bg-green-600 hover:bg-green-700">
                View Dashboard
              </Button>
              <Button variant="outline" onClick={() => setGiftSent(false)}>
                Send Another Gift
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Send a Sustainable Gift</h1>
        <p className="text-gray-600">
          Create a meaningful gift experience that aligns with your values
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gift Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="size-5" />
              Gift Selection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedItem ? (
              <div className="border rounded-lg p-4 bg-green-50">
                <div className="flex gap-4">
                  <ImageWithFallback
                    src={selectedItem.image_url}
                    alt={selectedItem.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{selectedItem.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{selectedItem.description}</p>
                    <Badge variant="secondary">${selectedItem.price}</Badge>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => setSelectedItem(null)}
                >
                  Change Selection
                </Button>
              </div>
            ) : selectedCategory ? (
              <div className="border rounded-lg p-4 bg-purple-50">
                <div className="flex gap-4">
                  <ImageWithFallback
                    src={selectedCategory.image_url}
                    alt={selectedCategory.category_name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{selectedCategory.category_name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{selectedCategory.category_description}</p>
                    <div className="flex gap-2">
                      <Badge variant="secondary">${selectedCategory.price}</Badge>
                      <Badge className="bg-purple-100 text-purple-800">
                        {selectedCategory.options.length} options
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => setSelectedCategory(null)}
                >
                  Change Selection
                </Button>
              </div>
            ) : (
              <div>
                <Label>Choose a Gift Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gift type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">Physical Gifts</SelectItem>
                    <SelectItem value="digital">Digital Products</SelectItem>
                    <SelectItem value="donation">Charity Donations</SelectItem>
                    <SelectItem value="offset">Carbon Offsets</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-3"
                  onClick={() => onNavigate('catalog')}
                >
                  Browse Gift Catalog
                </Button>
              </div>
            )}

            <div>
              <Label htmlFor="budget">Budget Range</Label>
              <div className="flex items-center gap-2 mt-1">
                <DollarSign className="size-4 text-gray-400" />
                <Input
                  id="budget"
                  type="number"
                  min="10"
                  max="500"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})}
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recipient & Message */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="size-5" />
              Recipient & Message
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sender_name">Your Name</Label>
                <Input
                  id="sender_name"
                  value={formData.sender_name}
                  onChange={(e) => setFormData({...formData, sender_name: e.target.value})}
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <Label htmlFor="sender_email">Your Email</Label>
                <Input
                  id="sender_email"
                  type="email"
                  value={formData.sender_email}
                  onChange={(e) => setFormData({...formData, sender_email: e.target.value})}
                  placeholder="john@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="recipient_email">Recipient Email</Label>
              <Input
                id="recipient_email"
                type="email"
                value={formData.recipient_email}
                onChange={(e) => setFormData({...formData, recipient_email: e.target.value})}
                placeholder="recipient@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="recipient_phone">Recipient Phone (Optional)</Label>
              <Input
                id="recipient_phone"
                type="tel"
                value={formData.recipient_phone}
                onChange={(e) => setFormData({...formData, recipient_phone: e.target.value})}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="message">Personal Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Thank you for your outstanding work..."
                rows={4}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Branding & Customization */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="size-5" />
              Branding & Customization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input
                    id="company_name"
                    value={formData.company_name}
                    onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <Label htmlFor="primary_color">Brand Color</Label>
                  <div className="flex items-center gap-3 mt-1">
                    <Input
                      id="primary_color"
                      type="color"
                      value={formData.primary_color}
                      onChange={(e) => setFormData({...formData, primary_color: e.target.value})}
                      className="w-16 h-10 p-1 border-2"
                    />
                    <Input
                      value={formData.primary_color}
                      onChange={(e) => setFormData({...formData, primary_color: e.target.value})}
                      placeholder="#2563eb"
                      className="flex-1 font-mono"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium mb-3">Preview</h4>
                <div 
                  className="bg-white rounded-lg p-4 border-l-4"
                  style={{ borderLeftColor: formData.primary_color }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: formData.primary_color }}
                    >
                      <Gift className="size-4 text-white" />
                    </div>
                    <span className="font-medium">{formData.company_name || 'Your Company'}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    You've received a sustainable gift! Click to redeem your eco-friendly selection.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="lg:col-span-2">
          <Separator className="mb-6" />
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">
                Gift will expire in 30 days if not redeemed. Unused budget will be automatically refunded.
              </p>
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => onNavigate('catalog')}>
                Back to Catalog
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 px-8">
                Send Gift
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}