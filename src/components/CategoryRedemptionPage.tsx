import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Gift, Heart, TreePine, Leaf, MapPin, CheckCircle, ShoppingBag } from "lucide-react";
import { mockCategoryGifts } from "../data/mockData";
import { CategoryGift, GiftOption } from "../types";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CategoryRedemptionPageProps {
  giftId?: string;
}

export function CategoryRedemptionPage({ giftId = 'gift-2' }: CategoryRedemptionPageProps) {
  const [selectedOption, setSelectedOption] = useState<GiftOption | null>(null);
  const [addressInfo, setAddressInfo] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'US'
  });
  const [step, setStep] = useState<'select' | 'address' | 'complete'>('select');

  // Mock gift data based on giftId
  const giftData = {
    sender_name: 'Mike Johnson',
    company_name: 'GreenStart',
    message: 'Welcome to our partnership! Choose your perfect sustainable backpack.',
    budget: 75,
    primary_color: '#16a34a',
    category: mockCategoryGifts[0], // Sustainable Backpack category
    received_date: 'September 22, 2025'
  };

  const handleOptionSelect = (option: GiftOption) => {
    setSelectedOption(option);
    setStep('address');
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
            
            {selectedOption && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <ImageWithFallback
                    src={selectedOption.image_url}
                    alt={selectedOption.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">{selectedOption.name}</h4>
                    <p className="text-sm text-gray-600">{selectedOption.brand}</p>
                    <p className="text-gray-600">{selectedOption.description}</p>
                  </div>
                </div>
                
                {selectedOption.carbon_impact && (
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-800">
                      Environmental Impact: {selectedOption.carbon_impact}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="mb-6">
              <p className="text-gray-700">
                Your sustainable {giftData.category.category_name.toLowerCase()} will be shipped to the address provided within 3-5 business days. 
                You'll receive tracking information via email.
              </p>
            </div>

            <div className="text-sm text-gray-600">
              <p>Thank you for choosing sustainable options!</p>
              <p className="mt-2">
                Gift from <span className="font-medium">{giftData.sender_name}</span> at{' '}
                <span className="font-medium">{giftData.company_name}</span>
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
            {selectedOption && (
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src={selectedOption.image_url}
                    alt={selectedOption.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium">{selectedOption.name}</p>
                    <p className="text-sm text-gray-600">{selectedOption.brand}</p>
                  </div>
                </div>
              </div>
            )}
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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Gift Header */}
        <Card className="mb-8 border-l-4" style={{ borderLeftColor: giftData.primary_color }}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Hi there, Enjoy the {giftData.category.category_name}
                </h1>
                <p className="text-gray-600">Received on {giftData.received_date}</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-2">
                  From {giftData.sender_name}
                </Badge>
                <p className="text-sm text-gray-600">{giftData.company_name}</p>
              </div>
            </div>

            {/* Carbon Neutral Banner */}
            <div className="bg-green-100 rounded-lg p-4 mb-4 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="bg-green-600 p-2 rounded-full">
                  <Leaf className="size-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-green-800">
                    This gift was made carbon neutral by {giftData.company_name}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-green-600 text-green-600">
                  Learn more
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 italic">"{giftData.message}"</p>
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Choose your perfect {giftData.category.category_name}
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            {giftData.category.category_description}
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {giftData.category.options.map((option) => (
            <Card 
              key={option.id} 
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer border-2 hover:border-green-300 bg-white"
              onClick={() => handleOptionSelect(option)}
            >
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src={option.image_url}
                  alt={option.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-gray-900">
                    <ShoppingBag className="size-3 mr-1" />
                    Free
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-1">{option.name}</h3>
                  {option.brand && (
                    <p className="text-sm text-green-600 font-medium mb-2">by {option.brand}</p>
                  )}
                  <p className="text-gray-600 mb-3">{option.description}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Leaf className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{option.sustainability_notes}</p>
                  </div>
                  
                  {option.carbon_impact && (
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-green-800">
                        Environmental Impact: {option.carbon_impact}
                      </p>
                    </div>
                  )}
                </div>
                
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  Select This Option
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Impact Summary */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Environmental Impact</h3>
            <p className="text-gray-700 mb-4">
              {giftData.category.sustainability_notes}
            </p>
            <div className="bg-green-100 rounded-lg p-3 inline-block">
              <p className="font-medium text-green-800">
                {giftData.category.carbon_impact}
              </p>
            </div>
          </CardContent>
        </Card>

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