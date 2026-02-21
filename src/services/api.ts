
import { Product, Campaign, SiteConfig } from '../../types';

export const api = {
  async getData() {
    try {
      const res = await fetch('/api/data');
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async saveData(data: { products: Product[], campaigns: Campaign[], config: SiteConfig }) {
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return true;
    } catch (e) {
      return false;
    }
  }
};
