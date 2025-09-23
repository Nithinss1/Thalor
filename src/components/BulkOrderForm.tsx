import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import {
  Gift, Mail, Upload, Plus, Trash2, DollarSign,
  Palette, Copy, CheckCircle, Users, FileText,
  Download, AlertCircle, BarChart3
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { mockGiftItems } from "../data/mockData";
import { GiftItem, CategoryGift } from "../types";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BulkOrderFormProps {
  preselectedItem?: GiftItem;
  preselectedCategory?: CategoryGift;
  onNavigate: (page: string, giftItem?: GiftItem, categoryGift?: CategoryGift, orderData?: any) => void;
}

interface Recipient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  personalMessage?: string;
}

export function BulkOrderForm({ preselectedItem, preselectedCategory, onNavigate }: BulkOrderFormProps) {
  const [selectedItem, setSelectedItem] = useState<GiftItem | null>(preselectedItem || null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryGift | null>(preselectedCategory || null);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    company_name: '',
    budget: preselectedItem?.price || preselectedCategory?.price || 50,
    primary_color: '#2563eb',
    global_message: ''
  });
  const [orderSent, setOrderSent] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('manual');
  const [orderSummary] = useState({
    orderId: 'BO-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    totalRecipients: 0,
    totalBudget: 0
  });

  const addRecipient = () => {
    const newRecipient: Recipient = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      email: '',
      phone: '',
      personalMessage: ''
    };
    setRecipients([...recipients, newRecipient]);
  };

  const removeRecipient = (id: string) => {
    setRecipients(recipients.filter(r => r.id !== id));
  };

  const updateRecipient = (id: string, field: keyof Recipient, value: string) => {
    setRecipients(recipients.map(r =>
      r.id === id ? { ...r, [field]: value } : r
    ));
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].toLowerCase().split(',').map(h => h.trim());

      const newRecipients: Recipient[] = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        if (values.length >= 2) {
          const recipient: Recipient = {
            id: Math.random().toString(36).substr(2, 9),
            name: values[headers.indexOf('name')] || values[0] || '',
            email: values[headers.indexOf('email')] || values[1] || '',
            phone: values[headers.indexOf('phone')] || values[2] || '',
            personalMessage: values[headers.indexOf('message')] || ''
          };
          if (recipient.email) {
            newRecipients.push(recipient);
          }
        }
      }
      setRecipients([...recipients, ...newRecipients]);
    };
    reader.readAsText(file);
  };

  const downloadCSVTemplate = () => {
    const csvContent = "name,email,phone,message\nJohn Doe,john@company.com,+1-555-0123,Thank you for your hard work!\nJane Smith,jane@company.com,+1-555-0124,Congratulations on the promotion!";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_gift_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recipients.length === 0) return;

    // Navigate to checkout with bulk order data
    const orderData = {
      type: 'bulk' as const,
      recipientCount: recipients.length,
      totalAmount: totalBudget,
      giftName: selectedItem?.name || selectedCategory?.category_name || 'Custom Gift Package',
      companyName: formData.company_name || 'Your Company',
      senderName: formData.sender_name,
      senderEmail: formData.sender_email,
      recipients: recipients,
      globalMessage: formData.global_message
    };
    onNavigate('checkout', undefined, undefined, orderData);
  };

  const totalBudget = recipients.length * formData.budget;

  if (orderSent) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-8 text-center bg-green-50 border-green-200">
          <CardContent className="p-0">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="size-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-green-800">Bulk Order Submitted Successfully!</h2>
            <p className="text-gray-700 mb-6">
              Your bulk gift order for {recipients.length} recipients has been processed.
              Each recipient will receive an email with their personalized redemption link.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-2xl font-bold text-green-600">{recipients.length}</div>
                <div className="text-sm text-gray-600">Recipients</div>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-2xl font-bold text-green-600">${totalBudget}</div>
                <div className="text-sm text-gray-600">Total Budget</div>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-2xl font-bold text-green-600">{orderSummary.orderId}</div>
                <div className="text-sm text-gray-600">Order ID</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => onNavigate('dashboard')} className="bg-green-600 hover:bg-green-700">
                <BarChart3 className="mr-2 size-4" />
                View Dashboard
              </Button>
              <Button variant="outline" onClick={() => setOrderSent(false)}>
                <Plus className="mr-2 size-4" />
                Create Another Bulk Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Users className="size-8" />
          Bulk Gift Orders
        </h1>
        <p className="text-gray-600">
          Send sustainable gifts to multiple recipients at once - perfect for employee recognition, client appreciation, or team rewards
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
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
                    <Badge variant="secondary">${selectedItem.price} per gift</Badge>
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
                      <Badge variant="secondary">${selectedCategory.price} per gift</Badge>
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
                    <SelectValue placeholder="Select gift type for bulk order" />
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
              <Label htmlFor="budget">Budget Per Gift</Label>
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
                {recipients.length > 0 && (
                  <Badge variant="outline" className="text-sm">
                    Total: ${totalBudget}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sender Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="size-5" />
              Sender Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div>
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                  placeholder="Your Company"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="global_message">Global Message (Optional)</Label>
              <Textarea
                id="global_message"
                value={formData.global_message}
                onChange={(e) => setFormData({...formData, global_message: e.target.value})}
                placeholder="This message will be sent to all recipients (they can still have individual messages)"
                rows={3}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recipients Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5" />
              Recipients ({recipients.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Tab Selection */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <Button
                type="button"
                variant={activeTab === 'manual' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('manual')}
                className="flex-1"
              >
                <Plus className="size-4 mr-2" />
                Manual Entry
              </Button>
              <Button
                type="button"
                variant={activeTab === 'upload' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('upload')}
                className="flex-1"
              >
                <Upload className="size-4 mr-2" />
                CSV Upload
              </Button>
            </div>

            {activeTab === 'upload' && (
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="size-4" />
                  <AlertDescription>
                    Upload a CSV file with recipient information. Required columns: name, email. Optional: phone, message
                  </AlertDescription>
                </Alert>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={downloadCSVTemplate}
                    className="flex-1"
                  >
                    <Download className="size-4 mr-2" />
                    Download Template
                  </Button>
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={handleCSVUpload}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'manual' && (
              <Button
                type="button"
                onClick={addRecipient}
                variant="outline"
                className="w-full"
              >
                <Plus className="size-4 mr-2" />
                Add Recipient
              </Button>
            )}

            {recipients.length > 0 && (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Personal Message</TableHead>
                      <TableHead className="w-16"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recipients.map((recipient) => (
                      <TableRow key={recipient.id}>
                        <TableCell>
                          <Input
                            value={recipient.name}
                            onChange={(e) => updateRecipient(recipient.id, 'name', e.target.value)}
                            placeholder="Name"
                            className="min-w-0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="email"
                            value={recipient.email}
                            onChange={(e) => updateRecipient(recipient.id, 'email', e.target.value)}
                            placeholder="email@company.com"
                            className="min-w-0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={recipient.phone || ''}
                            onChange={(e) => updateRecipient(recipient.id, 'phone', e.target.value)}
                            placeholder="+1-555-0123"
                            className="min-w-0"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={recipient.personalMessage || ''}
                            onChange={(e) => updateRecipient(recipient.id, 'personalMessage', e.target.value)}
                            placeholder="Personal note..."
                            className="min-w-0"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRecipient(recipient.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {recipients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="size-12 mx-auto mb-3 opacity-50" />
                <p>No recipients added yet</p>
                <p className="text-sm">Add recipients manually or upload a CSV file</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Branding */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="size-5" />
              Branding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Order Summary & Submit */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{recipients.length}</div>
                <div className="text-sm text-gray-600">Recipients</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">${formData.budget}</div>
                <div className="text-sm text-gray-600">Per Gift</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">${totalBudget}</div>
                <div className="text-sm text-gray-600">Total Budget</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">30</div>
                <div className="text-sm text-gray-600">Days to Redeem</div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  All gifts will expire in 30 days if not redeemed. Unused budgets will be automatically refunded.
                </p>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => onNavigate('catalog')}>
                  Back to Catalog
                </Button>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-8"
                  disabled={recipients.length === 0}
                >
                  <Users className="size-4 mr-2" />
                  Send {recipients.length} Gifts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}