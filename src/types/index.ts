export interface GiftItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'physical' | 'digital' | 'donation' | 'offset';
  sustainability_notes: string;
  image_url: string;
  carbon_impact?: string;
}

export interface CategoryGift {
  id: string;
  category_name: string;
  category_description: string;
  price: number;
  sustainability_notes: string;
  image_url: string;
  carbon_impact?: string;
  options: GiftOption[];
}

export interface GiftOption {
  id: string;
  name: string;
  brand?: string;
  description: string;
  image_url: string;
  sustainability_notes: string;
  carbon_impact?: string;
}

export interface Gift {
  id: string;
  sender_name: string;
  sender_email: string;
  recipient_email: string;
  recipient_phone?: string;
  message: string;
  budget: number;
  gift_type: 'specific' | 'category';
  branding?: {
    logo_url?: string;
    primary_color?: string;
    company_name?: string;
  };
  status: 'sent' | 'redeemed' | 'expired';
  selected_item?: GiftItem;
  selected_category?: CategoryGift;
  recipient_choice?: {
    item_id: string;
    option_id?: string;
    address?: {
      name: string;
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
  created_at: Date;
  redeemed_at?: Date;
  expires_at: Date;
}

export interface Campaign {
  id: string;
  name: string;
  total_gifts: number;
  redeemed_gifts: number;
  total_spent: number;
  carbon_saved: string;
  created_at: Date;
}