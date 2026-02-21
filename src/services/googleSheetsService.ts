
import { Product, Campaign, SiteConfig } from '../../types';

export const googleSheetsService = {
  async getProducts(): Promise<Product[] | null> {
    return null; // Placeholder
  },
  async getCampaigns(): Promise<Campaign[] | null> {
    return null; // Placeholder
  },
  async getConfig(): Promise<SiteConfig | null> {
    return null; // Placeholder
  }
};
