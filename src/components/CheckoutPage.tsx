import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import {
  CreditCard, Shield, Lock, DollarSign, Building2,
  CheckCircle, Calendar, User, Mail, AlertCircle
} from "lucide-react";

interface CheckoutPageProps {
  orderData: {
    type: 'single' | 'bulk';
    recipientCount: number;
    totalAmount: number;
    giftName?: string;
    companyName: string;
    senderName: string;
    senderEmail: string;
  };
  onPaymentComplete: () => void;
  onBack: () => void;
}

export function CheckoutPage({ orderData, onPaymentComplete, onBack }: CheckoutPageProps) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    saveCard: false
  });
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!paymentData.cardNumber.replace(/\s/g, '') || paymentData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!paymentData.expiryDate || paymentData.expiryDate.length < 5) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }

    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!paymentData.cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter the cardholder name';
    }

    if (!paymentData.billingAddress.trim()) {
      newErrors.billingAddress = 'Please enter billing address';
    }

    if (!paymentData.city.trim()) {
      newErrors.city = 'Please enter city';
    }

    if (!paymentData.state.trim()) {
      newErrors.state = 'Please enter state';
    }

    if (!paymentData.zipCode.trim()) {
      newErrors.zipCode = 'Please enter ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onPaymentComplete();
    }, 2000);
  };

  const getCardType = (number: string) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'Visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'Mastercard';
    if (cleanNumber.startsWith('3')) return 'American Express';
    return 'Credit Card';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <CreditCard className="size-8" />
          Corporate Payment
        </h1>
        <p className="text-gray-600">
          Complete your {orderData.type === 'bulk' ? 'bulk gift order' : 'gift'} payment using your corporate card
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Security Notice */}
            <Alert>
              <Shield className="size-4" />
              <AlertDescription>
                Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
              </AlertDescription>
            </Alert>

            {/* Card Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="size-5" />
                  Card Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({
                        ...paymentData,
                        cardNumber: formatCardNumber(e.target.value)
                      })}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={errors.cardNumber ? 'border-red-500' : ''}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                      {paymentData.cardNumber && getCardType(paymentData.cardNumber)}
                    </div>
                  </div>
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={(e) => setPaymentData({
                        ...paymentData,
                        expiryDate: formatExpiryDate(e.target.value)
                      })}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={errors.expiryDate ? 'border-red-500' : ''}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="password"
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData({
                        ...paymentData,
                        cvv: e.target.value.replace(/\D/g, '').substring(0, 4)
                      })}
                      placeholder="123"
                      maxLength={4}
                      className={errors.cvv ? 'border-red-500' : ''}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    value={paymentData.cardholderName}
                    onChange={(e) => setPaymentData({
                      ...paymentData,
                      cardholderName: e.target.value
                    })}
                    placeholder="John Smith"
                    className={errors.cardholderName ? 'border-red-500' : ''}
                  />
                  {errors.cardholderName && (
                    <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="size-5" />
                  Billing Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="billingAddress">Street Address</Label>
                  <Input
                    id="billingAddress"
                    value={paymentData.billingAddress}
                    onChange={(e) => setPaymentData({
                      ...paymentData,
                      billingAddress: e.target.value
                    })}
                    placeholder="123 Corporate Blvd"
                    className={errors.billingAddress ? 'border-red-500' : ''}
                  />
                  {errors.billingAddress && (
                    <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={paymentData.city}
                      onChange={(e) => setPaymentData({
                        ...paymentData,
                        city: e.target.value
                      })}
                      placeholder="San Francisco"
                      className={errors.city ? 'border-red-500' : ''}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select
                      value={paymentData.state}
                      onValueChange={(value) => setPaymentData({
                        ...paymentData,
                        state: value
                      })}
                    >
                      <SelectTrigger className={errors.state ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="WA">Washington</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                        <SelectItem value="PA">Pennsylvania</SelectItem>
                        <SelectItem value="OH">Ohio</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={paymentData.zipCode}
                      onChange={(e) => setPaymentData({
                        ...paymentData,
                        zipCode: e.target.value.replace(/\D/g, '').substring(0, 5)
                      })}
                      placeholder="94102"
                      maxLength={5}
                      className={errors.zipCode ? 'border-red-500' : ''}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={paymentData.country}
                      onValueChange={(value) => setPaymentData({
                        ...paymentData,
                        country: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Actions */}
            <div className="flex justify-between items-center pt-6">
              <Button type="button" variant="outline" onClick={onBack}>
                Back to Order
              </Button>
              <Button
                type="submit"
                disabled={processing}
                className="bg-green-600 hover:bg-green-700 px-8"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="size-4 mr-2" />
                    Complete Payment (${orderData.totalAmount})
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Type:</span>
                  <Badge variant={orderData.type === 'bulk' ? 'default' : 'secondary'}>
                    {orderData.type === 'bulk' ? 'Bulk Order' : 'Single Gift'}
                  </Badge>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Recipients:</span>
                  <span className="font-medium">{orderData.recipientCount}</span>
                </div>

                {orderData.giftName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gift:</span>
                    <span className="font-medium text-right">{orderData.giftName}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-green-600">${orderData.totalAmount}</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-green-700 font-medium">
                  <CheckCircle className="size-4" />
                  Corporate Benefits
                </div>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• Tax deductible business expense</li>
                  <li>• Detailed invoicing and reporting</li>
                  <li>• Carbon offset tracking</li>
                  <li>• Employee satisfaction analytics</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="size-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm text-gray-600">Company</Label>
                <p className="font-medium">{orderData.companyName}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Ordered By</Label>
                <p className="font-medium">{orderData.senderName}</p>
                <p className="text-sm text-gray-600">{orderData.senderEmail}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Order Date</Label>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Security Features */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-green-600 mb-3">
                <Shield className="size-5" />
                <span className="font-medium">Secure Payment</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 256-bit SSL encryption</li>
                <li>• PCI DSS compliant</li>
                <li>• Fraud protection</li>
                <li>• Money-back guarantee</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}