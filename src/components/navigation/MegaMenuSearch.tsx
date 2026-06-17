import React from 'react';
import { Search, X, Cpu } from 'lucide-react';
import { Solution } from '../../data/solutions';

interface MegaMenuSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Solution[];
  handleSolutionClick: (id: string, url: string) => void;
  isLight?: boolean;
}

export default function MegaMenuSearch({
  searchQuery,
  setSearchQuery,
  searchResults,
  handleSolutionClick,
  isLight = false,
}: MegaMenuSearchProps) {
  const searchInputBg = "bg-[#FFFFFF] border-[#EEEEEE] focus:border-[#FF0000] text-[#000000] focus:bg-white focus:shadow-sm";

  return (
    <div className="space-y-4 text-left" id="megamenu-search-container">
      {/* Search Input Box */}
      <div className="space-y-1.5">
        <h5 className="text-[10px] font-mono tracking-widest text-[#FF0000] font-bold uppercase flex items-center gap-1">
          SYSTEM SEARCH INDEX
        </h5>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Scan product modules (e.g. ERP, Hospital)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full text-xs pl-9 pr-9 py-2.5 rounded-full border outline-none transition-all ${searchInputBg}`}
            id="megamenu-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#FF0000] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Embedded Quick Tips */}
      <div className="bg-[#FFF5F5] border border-[#FF0000]/10 p-3 rounded-xl">
        <span className="block text-[9px] font-mono text-slate-500 uppercase font-black tracking-widest">
          POPULAR SEARCH TAGS
        </span>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {["ERP", "Hospital", "POS", "AI Chatbot", "Clinic"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-2.5 py-1 bg-[#FFFFFF] hover:bg-[#FFF5F5] border border-[#EEEEEE] hover:border-[#FF0000] rounded text-[9.5px] font-mono text-[#000000] hover:text-[#FF0000] transition-all cursor-pointer uppercase"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
