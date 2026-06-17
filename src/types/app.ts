/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AppType {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: string;
  category: string;
  rating: number;
  fee: number;
  status: 'active' | 'inactive';
  sortOrder: number;
  externalUrl?: string;
  isExternal?: boolean;
  openInNewTab?: boolean;
}

export interface Solution {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  url: string;
  openInNewTab: boolean;
  status: 'active' | 'inactive';
  sortOrder: number;
  icon?: string;
}

export interface SocialPlatform {
  id: string;
  name: string;
  url: string;
  icon: string;
  status: 'active' | 'inactive';
  sortOrder: number;
}

