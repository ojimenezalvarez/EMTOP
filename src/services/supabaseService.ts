
import { createClient } from '@supabase/supabase-js';
import { Product, Campaign, SiteConfig } from '../../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const supabaseService = {
  async getProducts(): Promise<Product[] | null> {
    if (!supabase) return null;
    const { data, error } = await supabase.from('productos').select('*');
    if (error) return null;
    return data as Product[];
  },

  async saveProduct(product: Product) {
    if (!supabase) return false;
    const { error } = await supabase.from('productos').upsert(product);
    return !error;
  },

  async deleteProduct(id: string) {
    if (!supabase) return false;
    const { error } = await supabase.from('productos').delete().eq('id', id);
    return !error;
  },

  async getCampaigns(): Promise<Campaign[] | null> {
    if (!supabase) return null;
    const { data, error } = await supabase.from('campañas').select('*');
    if (error) return null;
    return data as Campaign[];
  },

  async saveCampaign(campaign: Campaign) {
    if (!supabase) return false;
    const { error } = await supabase.from('campañas').upsert(campaign);
    return !error;
  },

  async getConfig(): Promise<SiteConfig | null> {
    if (!supabase) return null;
    const { data, error } = await supabase.from('configuracion_sitio').select('*').single();
    if (error) return null;
    return data as SiteConfig;
  },

  async saveConfig(config: SiteConfig) {
    if (!supabase) return false;
    const { error } = await supabase.from('configuracion_sitio').upsert({ id: 1, ...config });
    return !error;
  }
};
