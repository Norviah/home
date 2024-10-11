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

/**
 * Creates a copy of the object with only the specified keys.
 *
 * @param obj The object to copy.
 * @param keys The keys to copy.
 * @returns The copied object with the specified keys.
 * @example
 *
 * ```ts
 * const originalObject = {
 *   name: 'John Doe',
 *   age: 25,
 *   email: 'jdoe@gmail.com',
 * };
 *
 * const nameAndEmail = pick(originalObject, ['name', 'email']);
 * // { name: 'John Doe', email: 'jdoe@gmail.com' }
 * ```
 */
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const copy = {} as T;

  for (const key of keys) {
    copy[key] = obj[key];
  }

  return copy as Pick<T, K>;
}

/**
 * Determines if the string is a URL.
 *
 * @param string The string to check.
 * @returns Whether if the string is a URL.
 * @example
 *
 * ```ts
 * isUrl('https://google.com'); // true
 * isUrl('google.com');         // true
 * isUrl('google');             // false
 * ```
 */
function isUrl(string: string): boolean {
  return /^((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)$/i.test(string);
}

/**
 * Assuming the provided string is a URL, determines if it has a protocol.
 *
 * @param url The url to check.
 * @returns Whether if the URL has a protocol.
 * @example
 *
 * ```ts
 * hasProtocol('https://google.com'); // true
 * hasProtocol('google.com'); // false
 * ```
 */
function hasProtocol(url: string): boolean {
  return /^[a-zA-Z]+:\/\//i.test(url);
}

/**
 * Constructs a URL inferred from the query and the user's configuration.
 *
 * This function attempts to parse provided query and translate it into a URL
 * based on the user's configuration. Generally, it will follow these rules:
 *
 *   1. If the query is a URL, it will be returned.
 *   2. If the query is a link from the user's configuration, it will be further parsed and constructed.
 *      - If the link has no query or paths, it will be returned as is. <br /><br>
 *      - If the link has a query and/or paths, it will be appended to the URL.
 *   3. If the query is not a link, it will be searched using the specified search
 *      engine.
 *
 * @param config The user's configuration, which contains the links to parse
 * from.
 * @param raw The raw query to construct the URL from.
 * @returns The constructed URL.
 * @example
 *
 * For example, let's say we have the links `tt` for twitter and `rd` for
 * reddit and Google as the search engine.
 *
 * Here are the results of the following queries when passed into this function:
 * - `tt`: `https://twitter.com`
 * - `tt/user`: `https://twitter.com/user`
 * - `tt term`: `https://twitter.com/search?q=term`
 *
 * - `rd`: `https://reddit.com`
 * - `rd/r/subreddit`: `https://reddit.com/r/subreddit`
 * - `rd/r/subreddit term`: `https://reddit.com/r/subreddit/search?q=term`
 *
 * - `search term`: `https://encrypted.google.com/search?q=search term`
 * - `github.com`: `https://github.com`
 */
export function generateUrl(config: Config, raw: string): string {
  const query: string = raw.trim();

  if (isUrl(query)) {
    return hasProtocol(query) ? query : `https://${query}`;
  }

  const [searchKeyRaw, rawSearch] = query.split(/ (.*)/);
  const [searchKey, paths] = searchKeyRaw.split(new RegExp(`${config.pathDelimiter}(.*)`));

  const allLinks = config.categories.flatMap((category) => category.links);
  const link = allLinks.find((link) => link.key.toLowerCase() === searchKey.toLowerCase());

  if (!link) {
    return `${config.searchEngine.replace(/{}/g, query)}`;
  }

  const url = new URL(link.url);

  const string = [
    url.protocol,
    '//',
    url.host,
    (paths ? `${paths.startsWith('/') ? '' : '/'}${paths}` : '') || undefined,
    (link.query && rawSearch ? link.query.replace(/{}/g, rawSearch) : '') || undefined,
  ];

  return string.filter(Boolean).join('');
}

export const defaultConfig: Config = {
  searchEngine: 'https://encrypted.google.com/search?q={}',
  pathDelimiter: '/',
  title: false,
  categories: [
    {
      title: 'Productivity',
      id: randomNumber(),
      index: 0,
      links: [
        {
          name: 'GMail',
          key: 'gm',
          url: 'https://gmail.com',
          query: '/#search/{}',
          id: randomNumber(),
          index: 0,
        },
        {
          name: 'Google Drive',
          key: 'gd',
          url: 'https://drive.google.com',
          query: '/drive/search?q={}',
          id: randomNumber(),
          index: 1,
        },
        {
          name: 'LinkedIn',
          key: 'li',
          url: 'https://linkedin.com',
          query: '/search/results/all/?keywords={}',
          id: randomNumber(),
          index: 2,
        },
      ],
    },

    {
      title: 'Entertainment',
      id: randomNumber(),
      index: 1,
      links: [
        {
          name: 'YouTube',
          key: 'yt',
          url: 'https://youtube.com',
          query: '/results?search_query={}',
          id: randomNumber(),
          index: 0,
        },
        {
          name: 'Twitch',
          key: 'tw',
          url: 'https://twitch.tv',
          query: '/search?term={}',
          id: randomNumber(),
          index: 1,
        },
        {
          name: 'Netflix',
          key: 'nf',
          url: 'https://netflix.com',
          query: '/search?q={}',
          id: randomNumber(),
          index: 2,
        },
      ],
    },

    {
      title: 'Social Media',
      id: randomNumber(),
      index: 2,
      links: [
        {
          name: 'Twitter',
          key: 'tt',
          url: 'https://twitter.com',
          query: '/search?q={}',
          id: randomNumber(),
          index: 0,
        },
        {
          name: 'Reddit',
          key: 'rd',
          url: 'https://reddit.com',
          query: '/search?q={}',
          id: randomNumber(),
          index: 1,
        },
        {
          name: 'Instagram',
          key: 'ig',
          url: 'https://instagram.com',
          id: randomNumber(),
          index: 2,
        },
      ],
    },
  ],
};
