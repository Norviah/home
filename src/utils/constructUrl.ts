import { config } from '@/config';
import type { Command } from '@/types/Config';

const commands: Command[] = Object.values(config.links).flat();

/**
 * Determines if the string is a URL.
 *
 * @param string The string to check.
 * @returns Whether if the string is a URL.
 * @example
 * ```ts
 * isUrl('https://google.com'); // true
 * isUrl('google.com'); // true
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
 * ```ts
 * hasProtocol('https://google.com'); // true
 * hasProtocol('google.com'); // false
 * ```
 */
function hasProtocol(url: string): boolean {
  return /^[a-zA-Z]+:\/\//i.test(url);
}

/**
 * Constructs a URL from the provided command.
 *
 * From the provided parameters, this function attempts to construct a URL in
 * regards to the command. It attempts to implement quality of life
 * functionality such as appending paths or search queries.
 *
 * @param command The command that the user requested.
 * @param paths Optional paths to append to the URL.
 * @param search Optional search query to append to the URL.
 * @param url A `URL` instance of the command's URL.
 * @returns The constructed URL.
 */
function constructUrl(args: { command: Command; paths?: string; search?: string; url: URL }): string {
  if (args.paths) {
    return `${args.command.url}/${args.paths}`;
  } else if (args.search && args.command.searchTemplate) {
    return `${args.url.protocol}//${args.url.host}${args.command.searchTemplate.replace(/{}/g, args.search)}`;
  }

  return args.command.url;
}

/**
 * Given a raw query from the user, this function will attempt to construct a
 * URL inferred from the query and the user's config.
 *
 * The function attempts to parse the URL and construct a few quality of life
 * improvements. In general, it will follow these rules:
 *
 * 1. If the query is a URL, it will return the URL.
 * 2. If the query is a command, it will take the command's respective link and
 * construct a URL from it, including any paths or search queries.
 * 3. If the query is not a command, it will just search it within the config's
 * search engine.
 *
 * @param raw The raw string to construct a URL from.
 * @returns The constructed URL.
 * @example
 *
 * For example, let's say we have the command `tt` which points to `twitter.com`
 * and `rd` which points to `reddit.com`, in addition to having google as the
 * search engine.
 *
 * Here are the results of the following queries when passed into this function:
 * - `tt`: `https://twitter.com`
 * - `tt/user`: `https://twitter.com/user`
 * - `tt alan wake 2`: `https://twitter.com/search?q=alan%20wake%202`
 * - `rd`: `https://reddit.com`
 * - `rd/r/cyberpunkgame`: `https://reddit.com/r/cyberpunkgame`
 * - `alan wake 2`: `https://google.com/search?q=alan%20wake%202`
 * - `twitter.com`: `https://twitter.com`
 */
export function generateUrl(raw: string): string {
  const query: string = raw.trim();

  if (isUrl(query)) {
    return hasProtocol(query) ? query : `https://${query}`;
  }

  const [searchKeyRaw, rawSearch] = query.split(new RegExp(`${config.searchDelimiter}(.*)`));
  const [searchKey, paths] = searchKeyRaw.split(new RegExp(`${config.pathDelimiter}(.*)`));

  const command: Command | undefined = commands.find((command: Command) => command.key === searchKey);

  if (!command) {
    return `${config.searchEngine.url}/${config.searchEngine.searchTemplate.replace(/{}/g, query)}`;
  }

  return constructUrl({ command, paths, search: rawSearch, url: new URL(command.url) });
}
