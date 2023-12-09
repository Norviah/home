import type { With } from '@/types/ts/With';

export interface Link {
  /**
   * The name of the link.
   */
  name: string;

  /**
   * The base URL of the link.
   */
  url: `${'http' | 'https'}://${string}.${string}`;

  /**
   * The structure of a search query for this link.
   *
   * When the user attempts to search for a query within a defined link, the
   * application will use the link's base URL and append this structure to it.
   *
   * This structure must have a `{}` within it, which will be replaced with the
   * user's query.
   */
  searchTemplate?: `/${string}`;
}

export interface Command extends Link {
  /**
   * The key(s) that represent this link.
   *
   * In the application, the user can type whatever they want within the search
   * bar, if they type this specific keys, then that link will be triggered.
   */
  key: string;
}

export interface Config {
  /**
   * The links that will be displayed in the application.
   */
  links: Record<string, Command[]>;

  /**
   * The search engine that will be used when searching for a query.
   */
  searchEngine: With<Omit<Link, 'name'>, 'searchTemplate'>;

  /**
   * The delimiter that will be used to separate paths.
   */
  pathDelimiter: string;

  /**
   * The delimiter that will be used to separate queries to search for within a
   * link.
   */
  searchDelimiter: string;
}
