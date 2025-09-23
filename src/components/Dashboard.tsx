import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Gift, 
  TrendingUp, 
  Users, 
  Leaf, 
  Eye, 
  Calendar,
  DollarSign,
  Mail,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import { mockGifts, mockCampaigns } from "../data/mockData";
import { format } from "../utils/date-fns";

interface DashboardProps {
  onNavigate: (page: string, giftItem?: any, categoryGift?: any, orderData?: any) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const totalGifts = mockGifts.length;
  const redeemedGifts = mockGifts.filter(g => g.status === 'redeemed').length;
  const redemptionRate = Math.round((redeemedGifts / totalGifts) * 100);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'redeemed': return <CheckCircle className="size-4 text-green-600" />;
      case 'sent': return <Clock className="size-4 text-yellow-600" />;
      case 'expired': return <XCircle className="size-4 text-red-600" />;
      default: return <Clock className="size-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'redeemed': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gift Dashboard</h1>
          <p className="text-gray-600">
            Track your sustainable gifting campaigns and impact
          </p>
        </div>
        <Button 
          onClick={() => onNavigate('send-gift')}
          className="bg-green-600 hover:bg-green-700"
        >
          <Gift className="mr-2 size-4" />
          Send New Gift
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gifts Sent</CardTitle>
            <Gift className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGifts}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Redemption Rate</CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{redemptionRate}%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recipients Reached</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGifts}</div>
            <p className="text-xs text-muted-foreground">
              Across 8 campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Impact</CardTitle>
            <Leaf className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">235 kg</div>
            <p className="text-xs text-muted-foreground">
              CO₂ saved this month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="gifts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="gifts">Recent Gifts</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="gifts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Gifts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockGifts.map((gift) => (
                  <div key={gift.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(gift.status)}
                        <Badge className={getStatusColor(gift.status)}>
                          {gift.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-medium">{gift.recipient_email}</p>
                        <p className="text-sm text-gray-600">
                          From {gift.sender_name} • Budget: ${gift.budget}
                        </p>
                        <p className="text-xs text-gray-500">
                          Sent {format(gift.created_at, 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="size-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Gift Campaigns</CardTitle>
              <Button variant="outline" size="sm">
                Create Campaign
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCampaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{campaign.name}</h4>
                      <Badge variant="outline">
                        {Math.round((campaign.redeemed_gifts / campaign.total_gifts) * 100)}% redeemed
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Total Gifts</p>
                        <p className="font-medium">{campaign.total_gifts}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Redeemed</p>
                        <p className="font-medium">{campaign.redeemed_gifts}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total Spent</p>
                        <p className="font-medium">${campaign.total_spent}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Carbon Saved</p>
                        <p className="font-medium text-green-600">{campaign.carbon_saved}</p>
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
            <Card>
              <CardHeader>
                <CardTitle>Impact Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total CO₂ Saved</span>
                  <span className="font-semibold text-green-600">235.1 kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Trees Planted</span>
                  <span className="font-semibold">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ocean Plastic Removed</span>
                  <span className="font-semibold">15.2 lbs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Renewable Energy Supported</span>
                  <span className="font-semibold">2.3 MWh</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gift Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Charity Donations</span>
                      <span className="text-sm">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Physical Gifts</span>
                      <span className="text-sm">30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Carbon Offsets</span>
                      <span className="text-sm">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Digital Products</span>
                      <span className="text-sm">10%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}