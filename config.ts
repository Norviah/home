import { Config } from '@/types/Config';

export const config: Config = {
  links: {
    Productivity: [
      {
        name: 'GMail',
        key: 'gm',
        url: 'https://gmail.com',
        searchTemplate: '/#search/{}',
      },
      {
        name: 'Google Drive',
        key: 'gd',
        url: 'https://drive.google.com',
        searchTemplate: '/drive/search?q={}',
      },
      {
        name: 'Vercel',
        key: 'vc',
        url: 'https://vercel.com',
      },
      {
        name: 'LinkedIn',
        key: 'li',
        url: 'https://linkedin.com',
        searchTemplate: '/search/results/all/?keywords={}',
      },
    ],
    Dev: [
      {
        name: 'GitHub',
        key: 'gh',
        url: 'https://github.com',
        searchTemplate: '/search?q={}',
      },
      {
        name: 'DevDocs',
        key: 'dd',
        url: 'https://devdocs.io',
        searchTemplate: '/#q={}',
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
        searchTemplate: '/results?search_query={}',
      },
      {
        name: 'Twitch',
        key: 'tw',
        url: 'https://twitch.tv',
        searchTemplate: '/search?term={}',
      },
      {
        name: 'Netflix',
        key: 'nf',
        url: 'https://netflix.com',
        searchTemplate: '/search?q={}',
      },
      {
        name: 'Anix.to',
        key: 'at',
        url: 'https://anix.to/home',
        searchTemplate: '/filter?keyword={}',
      },
    ],
    'Social Media': [
      {
        name: 'Twitter',
        key: 'tt',
        url: 'https://twitter.com',
        searchTemplate: '/search?q={}',
      },
      {
        name: 'Reddit',
        key: 'rd',
        url: 'https://reddit.com',
        searchTemplate: '/search?q={}',
      },
      {
        name: 'MyAnimeList',
        key: 'myl',
        url: 'https://myanimelist.net',
      },
      {
        name: 'Media Hub',
        key: 'mh',
        url: 'https://mediahub.vercel.app',
        searchTemplate: '/search?q={}&layout=list',
      },
    ],
  },
  searchEngine: {
    url: 'https://encrypted.google.com',
    searchTemplate: '/search?q={}',
  },
  pathDelimiter: '/',
  searchDelimiter: ' ',
  renderCategoryTitle: false,
};
