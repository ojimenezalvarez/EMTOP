
import React from 'react';
import { Campaign } from '../types';

interface CampaignHeroProps {
  campaign: Campaign;
  badge: string;
}

const CampaignHero: React.FC<CampaignHeroProps> = ({ campaign, badge }) => {
  return (
    <section className="relative bg-black text-white min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        {campaign.videoUrl ? (
          <video src={campaign.videoUrl} className="w-full h-full object-cover" autoPlay muted loop />
        ) : (
          <img src={campaign.imageUrl} className="w-full h-full object-cover" alt="" />
        )}
      </div>
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-3xl">
          <span className="bg-red-600 text-white px-6 py-2 font-black text-xs uppercase tracking-[0.3em] mb-8 inline-block -skew-x-12">
            <span className="inline-block skew-x-12">{badge}</span>
          </span>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-8">
            {campaign.title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 !== 0 ? 'text-red-600' : ''}>{word} </span>
            ))}
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-medium mb-12 max-w-xl leading-relaxed">
            {campaign.subtitle}
          </p>
          <div className="flex flex-wrap gap-6">
            <button className="bg-white text-black px-10 py-5 font-black uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-2xl active:scale-95">
              Ver Catálogo
            </button>
            <div className="border-2 border-white/30 text-white px-10 py-5 font-black uppercase text-xs tracking-widest flex items-center gap-4">
              <span className="text-red-600 font-black italic">{campaign.discountText}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignHero;
