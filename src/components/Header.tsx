import { Button } from "./ui/button";
import { Leaf } from "lucide-react";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, giftItem?: any, categoryGift?: any, orderData?: any) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <div className="bg-green-600 p-2 rounded-lg">
            <Leaf className="size-6 text-white" />
          </div>
          <span className="text-xl font-semibold">Thalor</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => onNavigate('home')}
            className={`hover:text-green-600 transition-colors ${
              currentPage === 'home' ? 'text-green-600 font-medium' : 'text-gray-600'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('catalog')}
            className={`hover:text-green-600 transition-colors ${
              currentPage === 'catalog' ? 'text-green-600 font-medium' : 'text-gray-600'
            }`}
          >
            Gift Catalog
          </button>
          <button 
            onClick={() => onNavigate('dashboard')}
            className={`hover:text-green-600 transition-colors ${
              currentPage === 'dashboard' ? 'text-green-600 font-medium' : 'text-gray-600'
            }`}
          >
            Dashboard
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('send-gift')}
          >
            Send Gift
          </Button>
          <Button 
            onClick={() => onNavigate('dashboard')}
            className="bg-green-600 hover:bg-green-700"
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}