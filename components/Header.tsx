
import React, { useState } from 'react';

interface HeaderProps {
  onAdminOpen: () => void;
  promoText: string;
}

const Header: React.FC<HeaderProps> = ({ onAdminOpen, promoText }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="bg-black text-white text-[9px] font-black tracking-[0.3em] uppercase py-2 text-center overflow-hidden">
        <div className="animate-pulse">{promoText}</div>
      </div>
      <div className="container mx-auto px-4 h-24 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 group cursor-pointer h-full py-4" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="bg-red-600 text-white font-black text-3xl px-5 py-2 -skew-x-12 transform group-hover:bg-black transition-all shadow-lg">
            <span className="inline-block skew-x-12">EMTOP</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-10">
          {[
            {label: 'INICIO', id: 'home'}, 
            {label: 'PRODUCTOS', id: 'catalog'}, 
            {label: 'SERIE INDUSTRIAL', id: 'industrial'}, 
            {label: 'SOPORTE', id: 'footer'}
          ].map(item => (
            <button 
              key={item.label} 
              onClick={() => scrollToSection(item.id)}
              className="text-[11px] font-black tracking-widest text-gray-900 hover:text-red-600 transition-all py-2 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onAdminOpen}
            className="flex items-center gap-3 bg-gray-100 text-black px-6 py-3 rounded-none font-black text-[10px] tracking-widest uppercase hover:bg-black hover:text-white transition-all border-b-4 border-red-600 active:scale-95 shadow-md"
          >
            <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
            <span className="hidden md:inline">Administrar</span>
          </button>
          
          <button className="w-12 h-12 flex items-center justify-center text-gray-900 hover:text-red-600 transition-all relative active:scale-90">
            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
            <span className="absolute top-1 right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg">0</span>
          </button>

          <button 
            className="xl:hidden w-12 h-12 flex items-center justify-center active:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden bg-black text-white p-8 absolute top-full left-0 w-full animate-in slide-in-from-top duration-300 border-t-4 border-red-600 shadow-2xl">
          <nav className="flex flex-col gap-8">
            <button onClick={() => scrollToSection('home')} className="text-2xl font-black italic tracking-tighter hover:text-red-600 text-left">INICIO</button>
            <button onClick={() => scrollToSection('catalog')} className="text-2xl font-black italic tracking-tighter hover:text-red-600 text-left">PRODUCTOS</button>
            <button onClick={() => scrollToSection('industrial')} className="text-2xl font-black italic tracking-tighter hover:text-red-600 text-left">INDUSTRIAL</button>
            <button onClick={() => scrollToSection('footer')} className="text-2xl font-black italic tracking-tighter hover:text-red-600 text-left">SOPORTE</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
