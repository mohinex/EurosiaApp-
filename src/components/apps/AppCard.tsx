/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppType } from '../../types/app';
import { PremiumCardWrapper } from '../PremiumCardWrapper';

interface AppCardProps {
  app: AppType;
  getIcon: (name: string) => React.ReactNode;
  onNavigate?: (slug: string) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, getIcon, onNavigate }) => {
  const isExternal = !!app.externalUrl;
  const destination = isExternal ? app.externalUrl! : `/apps/${app.slug}`;

  // Pass custom handle action
  const handleAction = (path: string) => {
    if (isExternal) {
      window.open(destination, app.openInNewTab ? "_blank" : "_self");
    } else {
      onNavigate?.(app.slug);
    }
  };

  return (
    <PremiumCardWrapper
      title={app.name}
      url={destination}
      ctaText="View Details"
      onNavigate={onNavigate ? handleAction : undefined}
      className="bg-[#11135E]/15 border border-[#16166F]/45 rounded-xl p-5 flex flex-col justify-between h-full w-full"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="premium-card-icon bg-[#FF3D4F]/10 text-[#FF3D4F] p-2.5 rounded-lg border border-[#FF3D4F]/20">
            {getIcon(app.icon)}
          </div>
          <span className="text-[9px] font-mono text-indigo-400 bg-indigo-900/20 border border-indigo-900/40 px-2 py-0.5 rounded-full capitalize">
            {app.category}
          </span>
        </div>
        <div>
          <h4 className="premium-card-title font-semibold text-sm text-white">{app.name}</h4>
          <p className="premium-card-desc text-[11px] text-gray-400 mt-1 lines-clamp-2 leading-relaxed h-11 overflow-hidden">
            {app.description}
          </p>
        </div>
      </div>
      <div className="pt-4 border-t border-[#16166F]/20 mt-4 flex items-center justify-between text-xs font-mono text-left w-full">
        <span className="text-gray-400">Rating: ⭐{app.rating}</span>
        <span className="text-[#FF3D4F] font-bold">৳{app.fee}/mo</span>
      </div>
    </PremiumCardWrapper>
  );
};
