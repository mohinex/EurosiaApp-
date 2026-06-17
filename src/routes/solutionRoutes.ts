import { ALL_SOLUTIONS_LIST } from '../data/solutions';

export interface SolutionRouteDefinition {
  slug: string;
  url: string;
  seoTitle: string;
}

export const SOLUTION_ROUTES_MANIFEST: Record<string, SolutionRouteDefinition> = ALL_SOLUTIONS_LIST.reduce((accum, item) => {
  accum[item.slug] = {
    slug: item.slug,
    url: `/solutions/${item.slug}`,
    seoTitle: item.seoTitle || `${item.title} | Eurosia`
  };
  return accum;
}, {} as Record<string, SolutionRouteDefinition>);

/**
 * Parses current path string and extracts solutions identifier if matched.
 * Compatible with both standard hash history and pushState history routing systems.
 */
export function extractSolutionSlug(path: string): string | null {
  const cleanPath = path.startsWith('#') ? path.substring(1) : path;
  
  if (cleanPath.startsWith('/solutions/')) {
    const parts = cleanPath.split('/');
    if (parts.length >= 3 && parts[2].trim()) {
      return parts[2].trim();
    }
  }
  return null;
}
