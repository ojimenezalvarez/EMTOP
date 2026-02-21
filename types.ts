
export enum PriceType {
  NORMAL = 'Normal',
  DISCOUNT = 'Descuento',
  OFFER = 'Oferta',
  SUPER_OFFER = 'Súper Oferta'
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  priceType: PriceType;
  imageUrl: string;
  isBestSeller?: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  subtitle: string;
  discountText: string;
  accentColor: string;
  isActive: boolean;
  imageUrl: string;
  videoUrl?: string; // Nuevo campo para video
}

export interface SiteConfig {
  topPromoText: string;
  heroBadge: string;
  stats: {
    num: string;
    label: string;
  }[];
  footerDesc: string;
  newsletterTitle: string;
  newsletterDesc: string;
  phone?: string;
  address?: string;
  developer?: string;
}
