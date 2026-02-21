
import React, { useState, useEffect } from 'react';
import { Product, Campaign, SiteConfig, PriceType } from './types';
import { INITIAL_PRODUCTS, INITIAL_CAMPAIGNS, INITIAL_CONFIG } from './constants';
import Header from './components/Header';
import CampaignHero from './components/CampaignHero';
import ProductCard from './components/ProductCard';
import AdminPanel from './components/AdminPanel';
import { api } from './src/services/api';
import { googleSheetsService } from './src/services/googleSheetsService';
import { supabaseService } from './src/services/supabaseService';

const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void; onAuthSuccess: () => void }> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'OMAR0711') {
      setError(false);
      setPassword('');
      onAuthSuccess();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-white w-full max-w-md border-t-8 border-red-600 shadow-2xl p-8 transform animate-in zoom-in-95 duration-200">
        <div className="text-center mb-8">
          <div className="bg-red-600 text-white font-black text-3xl px-4 py-1 -skew-x-12 inline-block mb-4">
            <span className="inline-block skew-x-12">EMTOP</span>
          </div>
          <h2 className="text-xl font-black uppercase italic tracking-tighter text-gray-900">ACCESO RESTRINGIDO</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">INGRESE LA CLAVE DE ADMINISTRADOR</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="password"
              autoFocus
              className={`w-full bg-gray-50 border-2 ${error ? 'border-red-600' : 'border-gray-200'} focus:ring-0 focus:border-black p-4 text-center text-xl font-black tracking-[0.5em] transition-all`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="••••••••"
            />
            {error && (
              <p className="text-red-600 text-[10px] font-black uppercase tracking-widest text-center mt-2 animate-bounce">
                CLAVE INCORRECTA - ACCESO DENEGADO
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-gray-100 font-black uppercase text-xs tracking-widest hover:bg-gray-200 transition-all"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-black text-white font-black uppercase text-xs tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-red-600/20"
            >
              VALIDAR ACCESO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductViewModal: React.FC<{ product: Product | null; onClose: () => void }> = ({ product, onClose }) => {
  if (!product) return null;

  const badgeColors = {
    [PriceType.NORMAL]: 'hidden',
    [PriceType.DISCOUNT]: 'bg-blue-600 text-white',
    [PriceType.OFFER]: 'bg-red-600 text-white',
    [PriceType.SUPER_OFFER]: 'bg-yellow-400 text-black',
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 overflow-y-auto backdrop-blur-xl">
      <div className="bg-white w-full max-w-5xl flex flex-col md:flex-row relative animate-in zoom-in-95 duration-300 border-t-[10px] border-red-600 shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-12 h-12 bg-black text-white flex items-center justify-center z-10 hover:bg-red-600 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Imagen del Producto */}
        <div className="w-full md:w-1/2 bg-gray-50 p-12 flex items-center justify-center relative min-h-[400px]">
          {product.priceType !== PriceType.NORMAL && (
            <div className={`absolute top-10 left-10 px-6 py-3 text-xs font-black uppercase tracking-widest z-20 shadow-xl -skew-x-12 ${badgeColors[product.priceType]}`}>
              <span className="inline-block skew-x-12">{product.priceType}</span>
            </div>
          )}
          <img src={product.imageUrl} className="max-h-full object-contain drop-shadow-2xl" alt={product.name} />
        </div>

        {/* Info del Producto */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col">
          <div className="mb-6">
            <span className="text-blue-600 font-black text-xs uppercase tracking-widest italic border-b-2 border-blue-600 pb-1">{product.category}</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase italic tracking-tighter leading-none mb-6">{product.name}</h2>
          
          <p className="text-gray-500 font-medium text-lg leading-relaxed mb-10">
            {product.description || 'Esta herramienta EMTOP está diseñada para cumplir con los más altos estándares de rendimiento industrial. Construcción robusta y potencia máxima garantizada.'}
          </p>

          <div className="bg-gray-50 p-8 border-l-8 border-red-600 mb-10">
             <div className="flex items-baseline gap-4">
                <span className="text-6xl font-black tracking-tighter text-red-600 italic leading-none">${product.price.toFixed(2)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-2xl text-gray-300 line-through font-bold italic">${product.originalPrice.toFixed(2)}</span>
                )}
             </div>
             <p className="text-[10px] font-black text-gray-400 mt-2 uppercase tracking-widest">Precios incluyen IVA y Garantía Oficial</p>
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-black text-white py-5 font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-red-600 transition-all active:scale-95 shadow-xl">
              <span className="material-symbols-outlined">shopping_cart</span>
              Comprar Ahora
            </button>
            <button className="flex-1 bg-gray-100 text-black py-5 font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-black hover:text-white transition-all active:scale-95">
              <span className="material-symbols-outlined">description</span>
              Ficha Técnica
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      // Try Supabase first
      const sbProducts = await supabaseService.getProducts();
      const sbCampaigns = await supabaseService.getCampaigns();
      const sbConfig = await supabaseService.getConfig();

      if (sbProducts && sbProducts.length > 0) {
        setProducts(sbProducts);
        if (sbCampaigns) setCampaigns(sbCampaigns);
        if (sbConfig) setConfig(sbConfig);
        setIsLoaded(true);
        return;
      }

      // Try Google Sheets as second option
      const sheetProducts = await googleSheetsService.getProducts();
      const sheetCampaigns = await googleSheetsService.getCampaigns();
      const sheetConfig = await googleSheetsService.getConfig();

      if (sheetProducts && sheetProducts.length > 0) {
        setProducts(sheetProducts);
        if (sheetCampaigns) setCampaigns(sheetCampaigns);
        if (sheetConfig) setConfig(sheetConfig);
        setIsLoaded(true);
        return;
      }

      // Fallback to local API
      const data = await api.getData();
      if (data && data.products && data.products.length > 0) {
        setProducts(data.products);
        setCampaigns(data.campaigns);
        setConfig(data.config);
      } else {
        // First time initialization: save initial constants to DB
        await api.saveData({
          products: INITIAL_PRODUCTS,
          campaigns: INITIAL_CAMPAIGNS,
          config: INITIAL_CONFIG
        });
      }
      setIsLoaded(true);
    };
    loadData();
  }, []);

  // Persistence: Save to Supabase whenever data changes
  useEffect(() => {
    const isUsingSupabase = !!import.meta.env.VITE_SUPABASE_URL;
    if (isLoaded && isUsingSupabase) {
      // We handle individual saves in AdminPanel for better performance with Supabase,
      // but we can also sync the whole state if needed.
    } else if (isLoaded && !import.meta.env.VITE_GOOGLE_SHEET_ID) {
      api.saveData({ products, campaigns, config });
    }
  }, [products, campaigns, config, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-600 text-white font-black text-4xl px-6 py-2 -skew-x-12 inline-block mb-4 animate-pulse">
            <span className="inline-block skew-x-12">EMTOP</span>
          </div>
          <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px]">Cargando Sistema...</p>
        </div>
      </div>
    );
  }

  const activeCampaign = campaigns.find(c => c.isActive) || campaigns[0];

  const handleAdminRequest = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setIsAdminOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-red-600 selection:text-white">
      <Header onAdminOpen={handleAdminRequest} promoText={config.topPromoText} />

      <main className="flex-1">
        <CampaignHero campaign={activeCampaign} badge={config.heroBadge} />

        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: 'bolt', label: 'ELÉCTRICAS', color: 'bg-red-600' },
              { icon: 'construction', label: 'MANUALES', color: 'bg-blue-600' },
              { icon: 'precision_manufacturing', label: 'INDUSTRIAL', color: 'bg-black' },
              { icon: 'agriculture', label: 'JARDINERÍA', color: 'bg-gray-800' },
            ].map((cat, idx) => (
              <div key={idx} className="group relative overflow-hidden bg-white aspect-square flex flex-col items-center justify-center p-6 border-b-4 border-transparent hover:border-red-600 transition-all shadow-sm hover:shadow-2xl cursor-pointer active:scale-95">
                <div className={`${cat.color} text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                   <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                </div>
                <span className="text-xs font-black tracking-[0.2em] group-hover:text-red-600 transition-colors">{cat.label}</span>
                <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/5 transition-all"></div>
              </div>
            ))}
          </div>
        </div>

        <section id="catalog" className="py-24 container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="text-left border-l-8 border-red-600 pl-8">
              <span className="text-xs font-black text-blue-600 tracking-[0.3em] uppercase block mb-2">Herramientas Profesionales</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                LOS <span className="text-red-600">FAVORITOS</span> <br/>DEL MAESTRO
              </h2>
            </div>
            <div className="flex gap-4">
               <button className="px-8 py-3 bg-black text-white font-black text-[10px] tracking-widest uppercase hover:bg-red-600 transition-all active:scale-95">Ver Todos</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {products.map(product => (
              <ProductCard key={product.id} product={product} onView={(p) => setSelectedProduct(p)} />
            ))}
          </div>
        </section>

        <section id="industrial" className="bg-black text-white py-24 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <img src="https://www.emtop.com/static/images/bg_industrial.jpg" className="w-full h-full object-cover" alt="" />
           </div>
           <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-8 leading-none">
                   CALIDAD <br/><span className="text-red-600">INDUSTRIAL</span> <br/>AL ALCANCE DE TODOS
                 </h2>
                 <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">
                   EMTOP Tools International se enfoca en proporcionar las mejores soluciones para profesionales que demandan rendimiento y durabilidad. Nuestra tecnología de punta garantiza resultados superiores en cada proyecto.
                 </p>
                 <div className="grid grid-cols-2 gap-8">
                   {config.stats.map((stat, i) => (
                     <div key={i} className="border-l border-red-600 pl-4">
                        <span className="block text-3xl font-black italic">{stat.num}</span>
                        <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</span>
                     </div>
                   ))}
                 </div>
              </div>
              <div className="relative">
                 <img 
                  src={activeCampaign.imageUrl} 
                  className="w-full rounded-2xl shadow-2xl transform lg:rotate-6 hover:rotate-0 transition-transform duration-700 border-4 border-red-600" 
                  alt="Industrial" 
                 />
              </div>
           </div>
        </section>
      </main>

      <footer id="footer" className="bg-[#050505] text-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <div className="bg-red-600 text-white font-black text-2xl px-4 py-1 -skew-x-12 inline-block mb-8">
                <span className="inline-block skew-x-12">EMTOP</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium">
                {config.footerDesc}
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 text-gray-500">
                  <span className="material-symbols-outlined text-red-600">location_on</span>
                  <span className="text-xs font-bold leading-tight uppercase">{config.address}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <span className="material-symbols-outlined text-red-600">phone</span>
                  <span className="text-xs font-black tracking-widest">{config.phone}</span>
                </div>
              </div>
              <div className="flex gap-4">
                 {['FB', 'IG', 'YT', 'LI'].map(s => (
                   <a key={s} href="#" className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center text-[10px] font-black hover:bg-red-600 hover:border-red-600 transition-all">{s}</a>
                 ))}
              </div>
            </div>

            {[
              { title: 'MENÚ', links: [
                { label: 'Inicio', id: 'home' }, 
                { label: 'Nuestros Productos', id: 'catalog' }, 
                { label: 'Novedades', id: 'industrial' }, 
                { label: 'Dónde Comprar', id: 'footer' }
              ] },
              { title: 'SOPORTE', links: [
                { label: 'Centros de Servicio', id: 'footer' }, 
                { label: 'Garantía EMTOP', id: 'footer' }, 
                { label: 'Manuales PDF', id: 'footer' }, 
                { label: 'Contacto', id: 'footer' }
              ] },
              { title: 'LEGAL', links: [
                { label: 'Términos de Uso', id: 'footer' }, 
                { label: 'Privacidad', id: 'footer' }, 
                { label: 'Cookies', id: 'footer' }, 
                { label: 'Compliance', id: 'footer' }
              ] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-xs font-black tracking-[0.3em] text-gray-400 mb-8 border-b border-gray-900 pb-2">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map(l => (
                    <li key={l.label}>
                      <a 
                        href={`#${l.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(l.id);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                          else window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-sm text-gray-500 hover:text-red-600 transition-colors uppercase font-bold tracking-tight"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="text-xs font-black tracking-[0.3em] text-gray-400 mb-8 border-b border-gray-900 pb-2">{config.newsletterTitle}</h4>
              <p className="text-sm text-gray-500 mb-6 font-medium">{config.newsletterDesc}</p>
              <div className="flex">
                 <input className="bg-gray-900 border-none p-4 w-full text-xs font-bold" placeholder="Tu Email..." />
                 <button className="bg-red-600 px-6 font-black uppercase text-[10px] active:scale-95 transition-all">OK</button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex flex-col gap-2">
               <span className="text-[10px] font-black tracking-widest text-gray-600 uppercase">© 2026 EMTOP TOOLS INTERNATIONAL. TODA LA POTENCIA EN TUS MANOS.</span>
               <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">Desarrollado por {config.developer}</span>
             </div>
             <img src="https://www.emtop.com/static/images/payment_methods.png" className="h-6 grayscale opacity-30" alt="" />
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onAuthSuccess={handleAuthSuccess} 
      />

      {isAdminOpen && (
        <AdminPanel 
          products={products}
          setProducts={setProducts}
          campaigns={campaigns}
          setCampaigns={setCampaigns}
          config={config}
          setConfig={setConfig}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      <ProductViewModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};

export default App;
