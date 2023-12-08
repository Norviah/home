import { Config } from '@/types/Config';

export const config: Config = {
  links: {
    Productivity: [
      {
        name: 'GMail',
        key: 'gm',
        url: 'https://gmail.com',
        search: '/#search/text={}',
      },
      {
        name: 'Google Drive',
        key: 'gd',
        url: 'https://drive.google.com',
        search: '/drive/search?q={}',
      },
      {
        name: 'LinkedIn',
        key: 'li',
        url: 'https://linkedin.com',
        search: '/search/results/all/?keywords={}',
      },
      {
        name: 'Monkey Type',
        key: 'mt',
        url: 'https://monkeytype.com',
      },
    ],
    Dev: [
      {
        name: 'GitHub',
        key: 'gh',
        url: 'https://github.com',
        search: '/search?q={}',
      },
      {
        name: 'DevDocs',
        key: 'dd',
        url: 'https://devdocs.io',
        search: '/#q={}',
      },
      {
        name: 'ChatGPT',
        key: 'cgpt',
        url: 'https://chat.openai.com/',
      },
      {
        name: 'v0',
        key: 'v0',
        url: 'https://v0.dev/',
      },
    ],
    Entertainment: [
      {
        name: 'YouTube',
        key: 'yt',
        url: 'https://youtube.com',
        search: '/results?search_query={}',
      },
      {
        name: 'Twitch',
        key: 'tw',
        url: 'https://twitch.tv',
        search: '/search?term={}',
      },
      {
        name: 'Netflix',
        key: 'nf',
        url: 'https://netflix.com',
      },
      {
        name: 'Anix.to',
        key: 'at',
        url: 'https://anix.to/home',
        search: '/filter?keyword={}',
      },
      {
        name: 'MyAnimeList',
        key: 'myl',
        url: 'https://myanimelist.net',
      },
    ],
    'Social Media': [
      {
        name: 'Twitter',
        key: 'tt',
        url: 'https://twitter.com',
        search: '/search?q={}',
      },
      {
        name: 'Reddit',
        key: 'rd',
        url: 'https://reddit.com',
        search: '/search?q={}',
      },
      {
        name: 'Instagram',
        key: 'ig',
        url: 'https://instagram.com',
        search: '/explore/tags/{}',
      },
    ],
  },
  searchEngine: {
    name: 'Google',
    url: 'https://encrypted.google.com',
    search: '/search?q={}',
  },
};
