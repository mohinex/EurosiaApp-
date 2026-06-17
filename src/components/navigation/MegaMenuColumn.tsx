import React from 'react';
import { getSolutionIcon } from '../../data/solutions';
import { ChevronRight } from 'lucide-react';

interface SolutionItemLink {
  id: string;
  name: string;
  url: string;
}

interface MegaMenuColumnProps {
  key?: React.Key;
  categoryId: string;
  categoryName: string;
  categoryDesc: string;
  iconName: string;
  solutions: SolutionItemLink[];
  onSolutionClick: (id: string, url: string) => void;
  currentPath?: string;
  isLight?: boolean;
}

export default function MegaMenuColumn({
  categoryId,
  categoryName,
  categoryDesc,
  iconName,
  solutions,
  onSolutionClick,
  currentPath = "",
  isLight = false,
}: MegaMenuColumnProps) {
  const Icon = getSolutionIcon(iconName);

  return (
    <div key={categoryId} className="space-y-4 text-left" id={`megamenu-column-${categoryId}`}>
      {/* Category Header */}
      <div className="flex items-center gap-2.5 border-b border-[#EEEEEE] pb-2">
        <div className="bg-[#FFF5F5] border border-[#FF0000]/20 text-[#FF0000] p-1.5 rounded-lg shrink-0">
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex flex-col min-w-0">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#FF0000] truncate">
            {categoryName}
          </h4>
          <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-widest mt-0.5 font-bold">
            {solutions.length} MODULES INDEXED
          </span>
        </div>
      </div>

      {/* Description Snippet */}
      <p className="text-[10.5px] leading-relaxed text-[#666666]">
        {categoryDesc}
      </p>

      {/* Dynamic solutions list under category */}
      <div className="flex flex-col gap-1.5 max-h-[320px] overflow-y-auto pr-1">
        {solutions.map((sol) => {
          const isActive = currentPath === sol.url;
          const buttonClass = isActive
            ? "bg-[#FFFFFF] border-[#FF0000] text-[#FF0000] shadow-sm font-semibold"
            : "bg-[#FFFFFF] border-[#EEEEEE] text-[#000000] hover:bg-[#FFF5F5] hover:border-[#FF0000] hover:-translate-y-0.5 hover:shadow-md";

          return (
            <button
              key={sol.id}
              onClick={() => onSolutionClick(sol.id, sol.url)}
              className={`w-full group/item px-2.5 py-1.8 rounded-xl border flex items-center justify-between text-left transition-all duration-250 ease-out cursor-pointer ${buttonClass}`}
              role="menuitem"
            >
              <div className="min-w-0 flex-grow">
                <span className={`text-[11.5px] uppercase tracking-wider truncate block font-extrabold transition-colors duration-200 ${
                  isActive ? "text-[#FF0000]" : "text-[#000000] group-hover/item:text-[#FF0000]"
                }`}>
                  {sol.name}
                </span>
                <span className="text-[9.5px] text-[#666666] font-normal leading-snug line-clamp-1 block mt-0.5">
                  Operate {sol.name.replace("Solution", "").trim()} node
                </span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-all duration-200 shrink-0 ml-1.5 ${
                isActive ? "text-[#FF0000]" : "text-[#666666] group-hover/item:text-[#FF0000] group-hover/item:translate-x-0.5"
              }`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
