import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ClassValue } from 'clsx';
import type { Config } from './schemas';

/**
 * A utility function that is a wrapper around the the `clsx` and
 * `tailwind-merge` package.
 *
 * @see https://www.npmjs.com/package/clsx
 * @see https://www.npmjs.com/package/tailwind-merge
 * @see https://dev.to/ramunarasinga/cn-utility-function-in-shadcn-uiui-3c4k
 *
 * @param classes The classes to merge.
 * @returns The merged classes.
 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

/**
 * Capitalizes the first letter for all words, those that are separated by a
 * space, in a string.
 *
 * @param string The string to capitalize.
 * @returns The string with the first letter of each word capitalized.
 * @example
 *
 * ```ts
 * capitalize('hello world'); // 'Hello World'
 * ```
 */
export function capitalize(string: string): string {
  return string.replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Generates a random number.
 *
 * @param min The minimum number to generate.
 * @param max The maximum number to generate.
 * @returns The random number.
 */
export function randomNumber(min = 0, max = Number.MAX_SAFE_INTEGER): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const defaultConfig: Config = {
  searchEngine: 'https://encrypted.google.com/search?q={}',
  pathDelimiter: '/',
  title: false,
  categories: [
    {
      title: 'Productivity',
      id: randomNumber(),
      links: [
        {
          name: 'GMail',
          key: 'gm',
          url: 'https://gmail.com',
          query: '/#search/{}',
          id: randomNumber(),
        },
        {
          name: 'Google Drive',
          key: 'gd',
          url: 'https://drive.google.com',
          query: '/drive/search?q={}',
          id: randomNumber(),
        },
        {
          name: 'LinkedIn',
          key: 'li',
          url: 'https://linkedin.com',
          query: '/search/results/all/?keywords={}',
          id: randomNumber(),
        },
      ],
    },

    {
      title: 'Entertainment',
      id: randomNumber(),
      links: [
        {
          name: 'YouTube',
          key: 'yt',
          url: 'https://youtube.com',
          query: '/results?search_query={}',
          id: randomNumber(),
        },
        {
          name: 'Twitch',
          key: 'tw',
          url: 'https://twitch.tv',
          query: '/search?term={}',
          id: randomNumber(),
        },
        {
          name: 'Netflix',
          key: 'nf',
          url: 'https://netflix.com',
          query: '/search?q={}',
          id: randomNumber(),
        },
      ],
    },

    {
      title: 'Social Media',
      id: randomNumber(),
      links: [
        {
          name: 'Twitter',
          key: 'tt',
          url: 'https://twitter.com',
          query: '/search?q={}',
          id: randomNumber(),
        },
        {
          name: 'Reddit',
          key: 'rd',
          url: 'https://reddit.com',
          query: '/search?q={}',
          id: randomNumber(),
        },
        {
          name: 'Instagram',
          key: 'ig',
          url: 'https://instagram.com',
          id: randomNumber(),
        },
      ],
    },
  ],
};
