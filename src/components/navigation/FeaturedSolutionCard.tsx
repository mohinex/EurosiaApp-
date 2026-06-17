import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { getSolutionIcon } from '../../data/solutions';

interface FeaturedSolutionCardProps {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
  category: string;
  description: string;
  onClick: (id: string, url: string) => void;
  isLight?: boolean;
}

export default function FeaturedSolutionCard({
  id,
  name,
  tagline,
  iconName,
  category,
  description,
  onClick,
  isLight = false,
}: FeaturedSolutionCardProps) {
  const Icon = getSolutionIcon(iconName);

  const cardBg = "bg-white border-[#EEEEEE] hover:bg-[#FFF5F5]/40 hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all duration-250 ease-out";

  return (
    <div
      onClick={() => onClick(id, `/solutions/${id}`)}
      className={`border p-4.5 rounded-2xl cursor-pointer text-left relative overflow-hidden flex flex-col justify-between min-h-[175px] ${cardBg}`}
      id={`featured-card-promo-${id}`}
    >
      {/* Absolute blurry highlight effect */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF0000]/5 rounded-full filter blur-xl pointer-events-none" />

      <div>
        <div className="flex justify-between items-start">
          <span className="text-[9px] font-mono tracking-widest font-black text-[#FF0000] bg-[#FFF5F5] border border-[#FF0000]/20 px-2 py-0.5 rounded uppercase inline-flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> GLOBAL INNOVATION
          </span>
          <div className="text-[#FF0000] bg-[#FFF5F5] p-1.5 rounded-lg border border-[#FF0000]/20">
            <Icon className="w-4 h-4" />
          </div>
        </div>

        <h4 className="font-extrabold text-xs text-black uppercase tracking-wider mt-3 hover:text-[#FF0000] transition-colors leading-normal">
          {name}
        </h4>
        <p className="text-[10px] text-[#666666] mt-1.5 font-normal leading-relaxed line-clamp-3">
          {description || tagline}
        </p>
      </div>

      <div className="text-[9px] text-[#FF0000] font-mono flex items-center gap-0.5 mt-3.5 uppercase font-bold group-hover:underline">
        <span>Initialize Cloud Unit</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </div>
  );
}
