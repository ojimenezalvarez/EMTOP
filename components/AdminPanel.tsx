
import React, { useState, useRef } from 'react';
import { Product, PriceType, Campaign, SiteConfig } from '../types';
import { supabaseService } from '../src/services/supabaseService';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
  config: SiteConfig;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  onClose: () => void;
}

type AdminTab = 'inventory' | 'campaigns' | 'general_ui';

const AdminPanel: React.FC<AdminPanelProps> = ({ products, setProducts, campaigns, setCampaigns, config, setConfig, onClose }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('inventory');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emptyProduct: Product = {
    id: Math.random().toString(36).substr(2, 9),
    name: '',
    category: 'HERRAMIENTAS 20V',
    description: '',
    price: 0,
    priceType: PriceType.NORMAL,
    imageUrl: '',
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      if (isAddingNew) {
        setProducts([...products, editingProduct]);
      } else {
        setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      }

      if (import.meta.env.VITE_SUPABASE_URL) {
        await supabaseService.saveProduct(editingProduct);
      }

      setEditingProduct(null);
      setIsAddingNew(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('¿Eliminar esta herramienta permanentemente?')) {
      setProducts(products.filter(p => p.id !== id));
      if (import.meta.env.VITE_SUPABASE_URL) {
        await supabaseService.deleteProduct(id);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'product' | 'campaign-img' | 'campaign-video', id?: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (target === 'product' && editingProduct) {
          setEditingProduct({ ...editingProduct, imageUrl: base64 });
        } else if (target === 'campaign-img' && id) {
          setCampaigns(campaigns.map(c => c.id === id ? { ...c, imageUrl: base64 } : c));
        } else if (target === 'campaign-video' && id) {
          setCampaigns(campaigns.map(c => c.id === id ? { ...c, videoUrl: base64 } : c));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-0 md:p-6 overflow-hidden">
      <div className="bg-white w-full max-w-7xl h-full md:h-[95vh] flex flex-col border-t-[12px] border-red-600 shadow-2xl overflow-hidden">
        
        <div className="bg-black text-white p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="bg-red-600 text-white font-black text-4xl px-4 py-1 -skew-x-12">EMTOP</div>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">CONTROL <span className="text-red-600">TOTAL</span></h2>
          </div>
          
          <div className="flex bg-gray-900 p-1 rounded-sm gap-1">
            {(['inventory', 'campaigns', 'general_ui'] as AdminTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === tab ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>

          <button onClick={onClose} className="p-2 hover:bg-red-600 rounded-sm transition-all flex items-center gap-2 font-black text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined">close</span>
            Cerrar
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-10 bg-gray-50">
          {activeTab === 'inventory' && (
            <div>
               <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-blue-600 text-4xl">inventory_2</span>
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter border-b-4 border-black pb-2">Gestión de Catálogo</h3>
                </div>
                <button 
                  onClick={() => { setEditingProduct(emptyProduct); setIsAddingNew(true); }}
                  className="bg-red-600 text-white px-8 py-4 font-black uppercase text-xs tracking-[0.2em] flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-red-600/20 active:scale-95"
                >
                  <span className="material-symbols-outlined">add_circle</span>
                  Nueva Herramienta
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map(p => (
                  <div key={p.id} className="bg-white border-2 border-gray-100 p-5 flex flex-col hover:border-red-600 transition-all group shadow-sm hover:shadow-xl">
                    <div className="h-48 bg-gray-50 mb-4 flex items-center justify-center p-4 relative overflow-hidden">
                      <img src={p.imageUrl || 'https://via.placeholder.com/300'} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" alt="" />
                    </div>
                    <div className="flex-1 mb-6">
                      <span className="text-[10px] font-black text-blue-600 uppercase italic tracking-widest block mb-1">{p.category}</span>
                      <h4 className="font-black text-xs uppercase leading-tight h-8 line-clamp-2 mb-4">{p.name}</h4>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-black text-red-600 tracking-tighter">${p.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { setEditingProduct(p); setIsAddingNew(false); }}
                        className="flex-1 bg-black text-white py-2 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(p.id)}
                        className="w-10 bg-gray-100 text-gray-400 py-2 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'campaigns' && (
            <div className="space-y-12">
               {campaigns.map(camp => (
                  <div key={camp.id} className={`p-8 border-2 ${camp.isActive ? 'border-red-600 bg-white' : 'border-gray-200 bg-white'}`}>
                    <div className="flex justify-between items-start mb-6">
                       <span className={`px-4 py-1 font-black text-[10px] uppercase tracking-[0.2em] ${camp.isActive ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                          {camp.isActive ? 'BANNER ACTIVO' : 'INACTIVO'}
                       </span>
                       <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            const newCampaigns = campaigns.map(c => ({...c, isActive: c.id === camp.id}));
                            setCampaigns(newCampaigns);
                          }}
                          className={`px-6 py-2 font-black uppercase text-[10px] tracking-widest transition-all ${camp.isActive ? 'hidden' : 'bg-black text-white hover:bg-red-600'}`}
                        >
                          Activar
                        </button>
                       </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                       <div className="space-y-4">
                          <input className="w-full bg-gray-50 border-gray-200 font-black p-3" value={camp.title} onChange={(e) => setCampaigns(campaigns.map(c => c.id === camp.id ? {...c, title: e.target.value} : c))} />
                          <textarea className="w-full bg-gray-50 border-gray-200 font-bold p-3 h-20" value={camp.subtitle} onChange={(e) => setCampaigns(campaigns.map(c => c.id === camp.id ? {...c, subtitle: e.target.value} : c))} />
                       </div>
                       <div className="h-56 bg-gray-100 flex items-center justify-center p-4 border-2 border-dashed border-gray-300 relative group">
                          {camp.imageUrl && <img src={camp.imageUrl} className="max-h-full object-contain" alt="" />}
                          <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer">
                             <span className="material-symbols-outlined">upload</span>
                             <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'campaign-img', camp.id)} />
                          </label>
                       </div>
                    </div>
                  </div>
               ))}
            </div>
          )}

          {activeTab === 'general_ui' && (
            <div className="space-y-8">
               <div className="bg-white p-8 border-2 border-gray-100 space-y-6">
                  <input className="w-full bg-gray-50 border-gray-200 font-bold p-4" value={config.topPromoText} onChange={(e) => setConfig({...config, topPromoText: e.target.value})} />
                  <input className="w-full bg-gray-50 border-gray-200 font-bold p-4" value={config.heroBadge} onChange={(e) => setConfig({...config, heroBadge: e.target.value})} />
                  <textarea className="w-full bg-gray-50 border-gray-200 font-medium p-4 h-24" value={config.footerDesc} onChange={(e) => setConfig({...config, footerDesc: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <input className="w-full bg-gray-50 border-gray-200 font-black p-4" value={config.phone || ''} onChange={(e) => setConfig({...config, phone: e.target.value})} />
                    <input className="w-full bg-gray-50 border-gray-200 font-bold p-4" value={config.address || ''} onChange={(e) => setConfig({...config, address: e.target.value})} />
                  </div>
               </div>
            </div>
          )}
        </div>

        {editingProduct && (
          <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white w-full max-w-3xl border-t-8 border-blue-600 my-auto shadow-2xl">
              <div className="bg-black text-white p-6 flex justify-between items-center">
                <h4 className="text-xl font-black uppercase italic">CONFIGURAR HERRAMIENTA</h4>
                <button onClick={() => setEditingProduct(null)}><span className="material-symbols-outlined">close</span></button>
              </div>
              <form onSubmit={handleSaveProduct} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div onClick={() => fileInputRef.current?.click()} className="aspect-square bg-gray-50 border-4 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 relative cursor-pointer">
                    {editingProduct.imageUrl ? <img src={editingProduct.imageUrl} className="w-full h-full object-contain" alt="" /> : <span className="material-symbols-outlined text-4xl text-gray-300">add_a_photo</span>}
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'product')} />
                  </div>
                  <div className="space-y-4">
                    <input className="w-full border-2 border-gray-100 p-4 font-black uppercase" placeholder="NOMBRE" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
                    <input type="number" step="0.01" className="w-full border-2 border-gray-100 p-4 font-black text-red-600" placeholder="PRECIO" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} />
                    <select className="w-full border-2 border-gray-100 p-4 font-bold text-xs" value={editingProduct.priceType} onChange={(e) => setEditingProduct({...editingProduct, priceType: e.target.value as PriceType})}>
                      {Object.values(PriceType).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 py-4 bg-gray-100 font-black uppercase text-xs">Cerrar</button>
                  <button type="submit" className="flex-1 py-4 bg-blue-600 text-white font-black uppercase text-xs">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
