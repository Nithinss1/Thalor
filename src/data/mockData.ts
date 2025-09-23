import { GiftItem, Gift, Campaign, CategoryGift, GiftOption } from '../types';

export const mockGiftItems: GiftItem[] = [
  {
    id: '1',
    name: 'Organic Cotton Tote Bag',
    description: 'Sustainably sourced organic cotton tote bag with custom branding',
    price: 25,
    category: 'physical',
    sustainability_notes: 'Made from 100% organic cotton, biodegradable packaging, carbon-neutral shipping',
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    carbon_impact: '2.1 kg CO₂ saved vs traditional swag'
  },
  {
    id: '2',
    name: 'Bamboo Desk Set',
    description: 'Eco-friendly bamboo desk organizer with phone stand and pen holder',
    price: 35,
    category: 'physical',
    sustainability_notes: 'Sustainable bamboo, plastic-free packaging, locally sourced',
    image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
    carbon_impact: '3.5 kg CO₂ saved vs plastic alternatives'
  },
  {
    id: '3',
    name: 'Digital Wellness Course',
    description: 'Online mindfulness and productivity course bundle',
    price: 40,
    category: 'digital',
    sustainability_notes: '100% digital delivery, zero physical waste, carbon-neutral hosting',
    image_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400',
    carbon_impact: '15.2 kg CO₂ saved vs physical course materials'
  },
  {
    id: '4',
    name: 'Tree Planting Donation',
    description: 'Plant 10 trees through verified reforestation partners',
    price: 20,
    category: 'donation',
    sustainability_notes: 'Verified tree planting, 25-year growth guarantee, biodiversity impact tracking',
    image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    carbon_impact: '220 kg CO₂ sequestered over tree lifetime'
  },
  {
    id: '5',
    name: 'Ocean Cleanup Donation',
    description: 'Support ocean plastic removal and marine conservation',
    price: 30,
    category: 'donation',
    sustainability_notes: 'Removes 5 lbs of ocean plastic, marine habitat restoration',
    image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    carbon_impact: '8.3 kg CO₂ impact through plastic removal'
  },
  {
    id: '6',
    name: 'Carbon Offset Credits',
    description: 'Verified carbon credits from renewable energy projects',
    price: 15,
    category: 'offset',
    sustainability_notes: 'Gold Standard certified, renewable energy projects, transparent tracking',
    image_url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400',
    carbon_impact: '1 ton CO₂ offset from atmosphere'
  }
];

export const mockCategoryGifts: CategoryGift[] = [
  {
    id: 'cat-1',
    category_name: 'Sustainable Backpack',
    category_description: 'Choose from premium eco-friendly backpacks made from recycled materials',
    price: 65,
    sustainability_notes: 'All options made from recycled materials with carbon-neutral shipping',
    image_url: 'https://images.unsplash.com/photo-1724253275111-fe0fa7611ffe?w=400',
    carbon_impact: '4.2 kg CO₂ saved vs traditional backpacks',
    options: [
      {
        id: 'bp-1',
        name: 'EcoTrail Explorer',
        brand: 'GreenPack',
        description: 'Premium hiking backpack made from 100% recycled ocean plastic',
        image_url: 'https://images.unsplash.com/photo-1724253275111-fe0fa7611ffe?w=400',
        sustainability_notes: 'Made from 45 recycled plastic bottles, PFC-free DWR coating',
        carbon_impact: '4.2 kg CO₂ saved vs traditional backpacks'
      },
      {
        id: 'bp-2',
        name: 'Urban Commuter Pro',
        brand: 'SustainablePack',
        description: 'Stylish laptop backpack crafted from recycled materials',
        image_url: 'https://images.unsplash.com/photo-1724253275111-fe0fa7611ffe?w=400',
        sustainability_notes: 'Recycled polyester fabric, solar-powered manufacturing',
        carbon_impact: '3.8 kg CO₂ saved vs traditional backpacks'
      },
      {
        id: 'bp-3',
        name: 'Campus Classic',
        brand: 'EcoStudy',
        description: 'Student-friendly backpack made from organic hemp and recycled cotton',
        image_url: 'https://images.unsplash.com/photo-1724253275111-fe0fa7611ffe?w=400',
        sustainability_notes: 'Organic hemp exterior, biodegradable zippers, fair trade certified',
        carbon_impact: '5.1 kg CO₂ saved vs traditional backpacks'
      },
      {
        id: 'bp-4',
        name: 'Adventure Daypack',
        brand: 'WildEco',
        description: 'Lightweight daypack perfect for outdoor adventures',
        image_url: 'https://images.unsplash.com/photo-1724253275111-fe0fa7611ffe?w=400',
        sustainability_notes: 'Recycled ripstop nylon, tree planted for every purchase',
        carbon_impact: '3.5 kg CO₂ saved vs traditional backpacks'
      }
    ]
  },
  {
    id: 'cat-2',
    category_name: 'Eco Coffee Experience',
    category_description: 'Choose your perfect sustainable coffee option from premium roasters',
    price: 25,
    sustainability_notes: 'All options are fair trade, organic, and carbon-neutral shipped',
    image_url: 'https://images.unsplash.com/photo-1666779484300-eca00b798c3e?w=400',
    carbon_impact: '1.8 kg CO₂ saved vs conventional coffee',
    options: [
      {
        id: 'cf-1',
        name: 'Ethiopian Single Origin',
        brand: 'Verde Coffee Co.',
        description: 'Premium single-origin beans with reusable bamboo travel mug',
        image_url: 'https://images.unsplash.com/photo-1666779484300-eca00b798c3e?w=400',
        sustainability_notes: 'Fair trade certified, biodegradable packaging, bamboo mug included',
        carbon_impact: '2.1 kg CO₂ saved vs conventional coffee + plastic mug'
      },
      {
        id: 'cf-2',
        name: 'Rainforest Blend',
        brand: 'EcoRoast',
        description: 'Rainforest Alliance certified blend supporting forest conservation',
        image_url: 'https://images.unsplash.com/photo-1666779484300-eca00b798c3e?w=400',
        sustainability_notes: 'Rainforest Alliance certified, compostable pods, forest conservation donation',
        carbon_impact: '1.9 kg CO₂ saved + forest protection'
      },
      {
        id: 'cf-3',
        name: 'Cold Brew Starter Kit',
        brand: 'SustainBrew',
        description: 'DIY cold brew kit with glass bottles and organic beans',
        image_url: 'https://images.unsplash.com/photo-1666779484300-eca00b798c3e?w=400',
        sustainability_notes: 'Reusable glass bottles, organic beans, plastic-free packaging',
        carbon_impact: '3.2 kg CO₂ saved vs bottled cold brew'
      },
      {
        id: 'cf-4',
        name: 'Artisan Espresso Set',
        brand: 'GreenBean Roasters',
        description: 'Premium espresso beans with ceramic cup set',
        image_url: 'https://images.unsplash.com/photo-1666779484300-eca00b798c3e?w=400',
        sustainability_notes: 'Organic certified, ceramic cups, carbon-neutral roasting',
        carbon_impact: '1.6 kg CO₂ saved vs conventional espresso'
      }
    ]
  },
  {
    id: 'cat-3',
    category_name: 'Sustainable Water Bottle',
    category_description: 'Select from premium reusable water bottles that eliminate single-use plastic',
    price: 35,
    sustainability_notes: 'All bottles eliminate 1000+ single-use plastic bottles per year',
    image_url: 'https://images.unsplash.com/photo-1556814086-bd749c2ceabd?w=400',
    carbon_impact: '12.3 kg CO₂ saved annually vs single-use bottles',
    options: [
      {
        id: 'wb-1',
        name: 'Insulated Steel Classic',
        brand: 'HydroEco',
        description: '32oz stainless steel bottle with 24-hour temperature retention',
        image_url: 'https://images.unsplash.com/photo-1556814086-bd749c2ceabd?w=400',
        sustainability_notes: 'Recycled stainless steel, BPA-free, lifetime warranty',
        carbon_impact: '12.3 kg CO₂ saved annually'
      },
      {
        id: 'wb-2',
        name: 'Glass Pure Bottle',
        brand: 'ClearFlow',
        description: 'Borosilicate glass bottle with silicone protective sleeve',
        image_url: 'https://images.unsplash.com/photo-1556814086-bd749c2ceabd?w=400',
        sustainability_notes: 'Pure borosilicate glass, recyclable silicone sleeve, dishwasher safe',
        carbon_impact: '10.8 kg CO₂ saved annually'
      },
      {
        id: 'wb-3',
        name: 'Smart Hydration Tracker',
        brand: 'TechH2O',
        description: 'Smart bottle with hydration tracking and temperature display',
        image_url: 'https://images.unsplash.com/photo-1556814086-bd749c2ceabd?w=400',
        sustainability_notes: 'Solar-powered sensors, recycled materials, app integration',
        carbon_impact: '11.5 kg CO₂ saved annually'
      },
      {
        id: 'wb-4',
        name: 'Collapsible Travel Bottle',
        brand: 'FlexFlow',
        description: 'Space-saving collapsible bottle perfect for travel',
        image_url: 'https://images.unsplash.com/photo-1556814086-bd749c2ceabd?w=400',
        sustainability_notes: 'Food-grade silicone, space-saving design, leak-proof guarantee',
        carbon_impact: '9.2 kg CO₂ saved annually'
      }
    ]
  }
];

export const mockGifts: Gift[] = [
  {
    id: 'gift-1',
    sender_name: 'Sarah Chen',
    sender_email: 'sarah.chen@company.com',
    recipient_email: 'john.doe@example.com',
    message: 'Thank you for your outstanding work this quarter!',
    budget: 50,
    gift_type: 'specific',
    branding: {
      company_name: 'TechCorp',
      primary_color: '#2563eb'
    },
    status: 'redeemed',
    selected_item: mockGiftItems[0],
    created_at: new Date('2024-01-15'),
    redeemed_at: new Date('2024-01-16'),
    expires_at: new Date('2024-02-15')
  },
  {
    id: 'gift-2',
    sender_name: 'Mike Johnson',
    sender_email: 'mike.j@company.com',
    recipient_email: 'jane.smith@client.com',
    message: 'Welcome to our partnership! Choose your perfect sustainable backpack.',
    budget: 75,
    gift_type: 'category',
    branding: {
      company_name: 'GreenStart',
      primary_color: '#16a34a'
    },
    status: 'sent',
    selected_category: mockCategoryGifts[0],
    created_at: new Date('2024-01-20'),
    expires_at: new Date('2024-02-20')
  },
  {
    id: 'gift-3',
    sender_name: 'Lisa Rodriguez',
    sender_email: 'lisa.r@company.com',
    recipient_email: 'alex.morgan@example.com',
    message: 'Enjoy your sustainable coffee experience!',
    budget: 35,
    gift_type: 'category',
    branding: {
      company_name: 'EcoTech Solutions',
      primary_color: '#059669'
    },
    status: 'sent',
    selected_category: mockCategoryGifts[1],
    created_at: new Date('2024-01-22'),
    expires_at: new Date('2024-02-22')
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: 'campaign-1',
    name: 'Q1 Employee Recognition',
    total_gifts: 45,
    redeemed_gifts: 38,
    total_spent: 1890,
    carbon_saved: '156.7 kg CO₂',
    created_at: new Date('2024-01-01')
  },
  {
    id: 'campaign-2',
    name: 'Client Onboarding',
    total_gifts: 23,
    redeemed_gifts: 20,
    total_spent: 920,
    carbon_saved: '78.3 kg CO₂',
    created_at: new Date('2024-01-10')
  }
];