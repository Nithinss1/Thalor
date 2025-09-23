import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Gift, Heart, TreePine, Leaf, MapPin, CheckCircle } from "lucide-react";
import { mockGiftItems } from "../data/mockData";
import { GiftItem } from "../types";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface RedemptionPageProps {
  giftId?: string;
}

export function RedemptionPage({ giftId = 'abc123xyz' }: RedemptionPageProps) {
  const [selectedItem, setSelectedItem] = useState<GiftItem | null>(null);
  const [addressInfo, setAddressInfo] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'US'
  });
  const [step, setStep] = useState<'select' | 'address' | 'complete'>('select');

  const senderInfo = {
    sender_name: 'Sarah Chen',
    company_name: 'TechCorp',
    message: 'Thank you for your outstanding work this quarter! Choose something meaningful that aligns with your values.',
    budget: 50,
    primary_color: '#2563eb'
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'physical': return <Gift className="size-4" />;
      case 'digital': return <Leaf className="size-4" />;
      case 'donation': return <Heart className="size-4" />;
      case 'offset': return <TreePine className="size-4" />;
      default: return <Gift className="size-4" />;
    }
  };

  const handleItemSelect = (item: GiftItem) => {
    setSelectedItem(item);
    if (item.category === 'physical') {
      setStep('address');
    } else {
      setStep('complete');
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('complete');
  };

  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 text-center bg-white shadow-xl">
          <CardContent className="p-0">
            <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="size-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-green-800">Gift Redeemed Successfully!</h2>
            
            {selectedItem && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <ImageWithFallback
                    src={selectedItem.image_url}
                    alt={selectedItem.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">{selectedItem.name}</h4>
                    <p className="text-gray-600">{selectedItem.description}</p>
                  </div>
                </div>
                
                {selectedItem.carbon_impact && (
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-800">
                      Environmental Impact: {selectedItem.carbon_impact}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="mb-6">
              {selectedItem?.category === 'physical' ? (
                <p className="text-gray-700">
                  Your sustainable gift will be shipped to the address provided within 3-5 business days. 
                  You'll receive tracking information via email.
                </p>
              ) : selectedItem?.category === 'digital' ? (
                <p className="text-gray-700">
                  Access details for your digital product have been sent to your email. 
                  Enjoy your eco-friendly selection!
                </p>
              ) : selectedItem?.category === 'donation' ? (
                <p className="text-gray-700">
                  Your donation has been processed! You'll receive a certificate and impact report 
                  showing the difference your contribution makes.
                </p>
              ) : (
                <p className="text-gray-700">
                  Your carbon offset has been registered! You'll receive a certificate 
                  verifying your environmental impact reduction.
                </p>
              )}
            </div>

            <div className="text-sm text-gray-600">
              <p>Thank you for choosing sustainable options!</p>
              <p className="mt-2">
                Gift from <span className="font-medium">{senderInfo.sender_name}</span> at{' '}
                <span className="font-medium">{senderInfo.company_name}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'address') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="size-5" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={addressInfo.name}
                  onChange={(e) => setAddressInfo({...addressInfo, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  value={addressInfo.street}
                  onChange={(e) => setAddressInfo({...addressInfo, street: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={addressInfo.city}
                    onChange={(e) => setAddressInfo({...addressInfo, city: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={addressInfo.state}
                    onChange={(e) => setAddressInfo({...addressInfo, state: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  value={addressInfo.zip}
                  onChange={(e) => setAddressInfo({...addressInfo, zip: e.target.value})}
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('select')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Complete Order
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Gift Header */}
        <Card className="mb-8 border-l-4" style={{ borderLeftColor: senderInfo.primary_color }}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: senderInfo.primary_color }}
              >
                <Gift className="size-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  Gift from {senderInfo.sender_name}
                </h2>
                <p className="text-gray-600">{senderInfo.company_name}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 italic">"{senderInfo.message}"</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Budget: ${senderInfo.budget}
              </Badge>
              <p className="text-sm text-gray-600">Choose your sustainable gift below</p>
            </div>
          </CardContent>
        </Card>

        {/* Gift Selection */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-4">Choose Your Sustainable Gift</h3>
          <p className="text-gray-600 mb-6">
            Select from curated eco-friendly options that align with your values and make a positive impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockGiftItems
            .filter(item => item.price <= senderInfo.budget)
            .map((item) => (
              <Card 
                key={item.id} 
                className="overflow-hidden hover:shadow-lg transition-all cursor-pointer border-2 hover:border-green-300"
                onClick={() => handleItemSelect(item)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <ImageWithFallback
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-gray-900">
                      {getCategoryIcon(item.category)}
                      <span className="ml-1 capitalize">{item.category}</span>
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-gray-900">
                      ${item.price}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-2">{item.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Leaf className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{item.sustainability_notes}</p>
                    </div>
                    
                    {item.carbon_impact && (
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-green-800">
                          Environmental Impact: {item.carbon_impact}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                    Select This Gift
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            Powered by <span className="font-semibold text-green-600">Thalor</span> • 
            Sustainable Gifting Platform
          </p>
        </div>
      </div>
    </div>
  );
}