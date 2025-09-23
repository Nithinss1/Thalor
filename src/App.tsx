import { useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { GiftCatalog } from "./components/GiftCatalog";
import { SendGiftForm } from "./components/SendGiftForm";
import { BulkOrderForm } from "./components/BulkOrderForm";
import { CheckoutPage } from "./components/CheckoutPage";
import { Dashboard } from "./components/Dashboard";
import { RedemptionPage } from "./components/RedemptionPage";
import { CategoryRedemptionPage } from "./components/CategoryRedemptionPage";
import { GiftItem, CategoryGift } from "./types";

type Page = 'home' | 'catalog' | 'send-gift' | 'bulk-order' | 'checkout' | 'dashboard' | 'redeem';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [preselectedGift, setPreselectedGift] = useState<GiftItem | undefined>();
  const [preselectedCategory, setPreselectedCategory] = useState<CategoryGift | undefined>();
  const [orderData, setOrderData] = useState<any>(undefined);
  const [giftSent, setGiftSent] = useState(false);

  const handleNavigate = (page: string, giftItem?: GiftItem, categoryGift?: CategoryGift, orderDataParam?: any) => {
    setCurrentPage(page as Page);
    if (giftItem) {
      setPreselectedGift(giftItem);
      setPreselectedCategory(undefined);
    } else if (categoryGift) {
      setPreselectedCategory(categoryGift);
      setPreselectedGift(undefined);
    } else {
      setPreselectedGift(undefined);
      setPreselectedCategory(undefined);
    }

    if (orderDataParam) {
      setOrderData(orderDataParam);
    }
  };

  const handlePaymentComplete = () => {
    setGiftSent(true);
    setCurrentPage('dashboard');
  };

  const handleBackToOrder = () => {
    if (orderData?.type === 'bulk') {
      setCurrentPage('bulk-order');
    } else {
      setCurrentPage('send-gift');
    }
  };

  // Special routes for redemption (would normally be separate URLs)
  if (window.location.pathname.includes('/redeem/')) {
    const giftId = window.location.pathname.split('/redeem/')[1];
    // Check if it's a category gift (gift-2, gift-3) or specific gift (gift-1)
    if (giftId === 'gift-2' || giftId === 'gift-3') {
      return <CategoryRedemptionPage giftId={giftId} />;
    }
    return <RedemptionPage giftId={giftId} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'catalog' && <GiftCatalog onNavigate={handleNavigate} />}
      {currentPage === 'send-gift' && (
        <SendGiftForm
          preselectedItem={preselectedGift}
          preselectedCategory={preselectedCategory}
          onNavigate={handleNavigate}
        />
      )}
      {currentPage === 'bulk-order' && (
        <BulkOrderForm
          preselectedItem={preselectedGift}
          preselectedCategory={preselectedCategory}
          onNavigate={handleNavigate}
        />
      )}
      {currentPage === 'checkout' && orderData && (
        <CheckoutPage
          orderData={orderData}
          onPaymentComplete={handlePaymentComplete}
          onBack={handleBackToOrder}
        />
      )}
      {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
    </div>
  );
}