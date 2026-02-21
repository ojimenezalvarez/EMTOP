
import { Product, PriceType, Campaign, SiteConfig } from './types';

export const COLORS = {
  primary: '#D70019', // EMTOP Red
  secondary: '#005EB8', // EMTOP Blue
  dark: '#111827',
  gray: '#F3F4F6'
};

export const INITIAL_CONFIG: SiteConfig = {
  topPromoText: 'Toda la potencia en tus manos - Distribuidor Oficial EMTOP',
  heroBadge: 'Novedad 2026',
  stats: [
    { num: '20+', label: 'Años de Experiencia' },
    { num: '1500+', label: 'Productos Pro' },
    { num: '50+', label: 'Países' },
    { num: '24/7', label: 'Soporte Técnico' }
  ],
  footerDesc: 'Desarrollamos herramientas con los más altos estándares globales, optimizando costos para llegar a cada profesional del mundo.',
  newsletterTitle: 'NEWSLETTER',
  newsletterDesc: 'Recibe ofertas exclusivas y novedades industriales.',
  phone: '0998021378',
  address: 'SAN FELIPE - LATACUNGA - COTOPAXI - AV: IBEROAMERICANA Y CALLE CUSUBAMBA ABAJO',
  developer: 'Ing. Edison Jiménez Alvarez'
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Taladro Percutor 20V Brushless',
    category: 'HERRAMIENTAS 20V',
    description: 'Motor sin escobillas de alta eficiencia. Incluye 2 baterías y maleta.',
    price: 129.90,
    originalPrice: 159.00,
    priceType: PriceType.SUPER_OFFER,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDACjrcSjHsLIJkjtmyFrG_Pjh-N8yUNjxrG1gw9xCjD8mIVwNDu2KtDDSlu5yQb2unfPsHepzXark02rsfxezyyE1qk8J15EWF3RHnc2AMjMQKEDp40Wr192CDn7EbVfIjkeFO3HYATxPhlAe-j0KFxQUKAHOoL6FpE_eZEs50T5etedjPp_sQXJXgksDBxTgSkmBoLgAxJ3iKNNLwYxjCLsojpBR4sn9I7sF8pm5sjcy8ySsKJxFTEnT6CGbQq8OpPX0aAHGn4VQ',
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Rotomartillo 42V SDS-Plus Heavy Duty',
    category: 'HERRAMIENTA 42V',
    description: 'Potencia industrial para trabajos pesados en concreto.',
    price: 245.50,
    originalPrice: 299.00,
    priceType: PriceType.OFFER,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqGlRop2703h9biQgLcK8KlsZyKY5LnE_wWsQBpw8EFLMibXBdPW8VPITmjZxYd3lWp5aTfg_ej3tRdCA67Dy6LkLPXcrBcBa8c-90dOuXu6qofbBDs57ZgXjQOSTUaOCFYJ42XARb3M9P_pqmrKqoc6Hb0qMMheThjzkKdyeDpZHi47AnLqTh4w86qblT7Kku5iKK9DOVp81w6CclzcVFZ58DzfT6Z-AHvxxKZLAIaGiYYHvUj-E0Y2wMiNN1b381OY0yS94vW_I',
  },
  {
    id: '3',
    name: 'Combo Pro: Taladro + Esmeril 20V',
    category: 'COMBOS',
    description: 'El kit esencial para el profesional moderno.',
    price: 189.00,
    originalPrice: 240.00,
    priceType: PriceType.DISCOUNT,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL94alTkCP5GVQl5_LMep_MlM9AHK_MD98wfiZuhr2rWurl8jBtT9ZLm_RKsWcowGepCLSLRqPiGN9QVySwYpodUrKCbcg7qyLm5xe2pkYk8yBMPw0VMwbtzWOzIgRoeeCZOOideQoU1ZrynTRGOZYz9eyhNsLFivmEMUl2Ngs0W8fDP0JkT1bTz8jh8kgsQW_mFrvLEBWU41Ta5bAE7Lk446TudsYbPyRmWKzhnwTwffBguI7bgq78Q6Rp0PW4kWS_HgfKkqY48g',
  },
  {
    id: '4',
    name: 'Juego de Llaves Combinadas 12 Pzs',
    category: 'TOP VALUE',
    description: 'Acero Cromo Vanadio de alta resistencia.',
    price: 24.90,
    priceType: PriceType.NORMAL,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFb1nCfrJm8ZUQJjiV4U1-jKqmre1eWX2FS3NgDBHfGi7-p_yGDHcNfFRtq1aPzV20uWHYt0JrMz9qXm7EyBFBlMSmQ1N8YPObLjOGNiwskJnrCF1SWgix-XLUiW8PmNpeapvnR_pnkhnap50j5Eefj0UeWMd3XFX6D5WgOX59Iq37yotxz8P5kGtGVJVKkTkANIj_uaQq8sf6MAX3RxNwtVcKicwJ1uDBQ7zbEh0g1jU_SzgJiP2BhHjfwGJvHP2rdQ2jkDi99ZY',
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'c1',
    title: 'Día del Padre',
    subtitle: 'EL REGALO PERFECTO PARA EL MAESTRO DE LA CASA',
    discountText: 'SUPER OFERTAS -50% OFF',
    accentColor: '#D70019',
    isActive: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFb1nCfrJm8ZUQJjiV4U1-jKqmre1eWX2FS3NgDBHfGi7-p_yGDHcNfFRtq1aPzV20uWHYt0JrMz9qXm7EyBFBlMSmQ1N8YPObLjOGNiwskJnrCF1SWgix-XLUiW8PmNpeapvnR_pnkhnap50j5Eefj0UeWMd3XFX6D5WgOX59Iq37yotxz8P5kGtGVJVKkTkANIj_uaQq8sf6MAX3RxNwtVcKicwJ1uDBQ7zbEh0g1jU_SzgJiP2BhHjfwGJvHP2rdQ2jkDi99ZY'
  },
  {
    id: 'c2',
    title: 'Aniversario EMTOP',
    subtitle: 'CELEBRANDO JUNTOS CON PRECIOS DE FÁBRICA',
    discountText: 'TODO CON 30% DE DESCUENTO',
    accentColor: '#005EB8',
    isActive: false,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPF7yw0md0tjtIeQRC4Ym9nxNASRB4uswhstAtshjdmSh_1Tb14XJYYmmOF6-wPah26DbRzmSb_Nd4U4o4ZDFa11aBj83d3ZW9W8yr-g66OPLJIpSXi1qczYCLJ0PYZvhEbr1nLQFAUVeU3jjhiQ_LZNqiGKLpeGbexV0y4R0EzLQHnCbIsDOj6EealTNdsYWmkzhFCHzQIiP6q326DBea0wHON4L4BlMInv6I-jiMfg9M1hnWNVgNK_H_55P3gZhzwovGPa1WIQc'
  }
];
