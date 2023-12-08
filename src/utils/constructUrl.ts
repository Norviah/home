import { config } from '@/config';

export function constructUrl(query: string): string {
  const { searchEngine } = config;

  return `${searchEngine.url}/${searchEngine.search.replace(/{}/g, query)}`;
}
