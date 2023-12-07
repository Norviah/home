import localFont from 'next/font/local';
import type { Metadata } from 'next';

export const site = {
  metadata: {
    title: {
      default: 'Home',
      template: '%s | Home',
    },
    description: 'A simple startup page.',
    authors: [
      {
        name: 'norviah',
        url: 'https://norviah.com',
      },
    ],
    creator: 'norviah',
  } satisfies Metadata,
};

export const font = localFont({
  src: [
    {
      path: '../../public/fonts/BrandonGrotesque-Black.otf',
      style: 'normal',
      weight: '900',
    },
    {
      path: '../../public/fonts/BrandonGrotesque-BlackItalic.otf',
      style: 'italic',
      weight: '900',
    },
    {
      path: '../../public/fonts/BrandonGrotesque-Bold.otf',
      style: 'normal',
      weight: '700',
    },
    {
      path: '../../public/fonts/BrandonGrotesque-BoldItalic.otf',
      style: 'italic',
      weight: '700',
    },
    {
      path: '../../public/fonts/BrandonGrotesque-Light.otf',
      style: 'normal',
      weight: '300',
    },
    {
      path: '../../public/fonts/BrandonGrotesque-LightItalic.otf',
      style: 'italic',
      weight: '300',
    },
    {
      path: '../../public/fonts/BrandonGrotesque-Medium.otf',
      style: 'normal',
      weight: '500',
    },
    {
      path: '../../public/fonts/BrandonGrotesque-MediumItalic.otf',
      style: 'italic',
      weight: '500',
    },
    {
      path: '../../public/fonts/BrandonGrotesque-Regular.otf',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../../public/fonts/BrandonGrotesque-RegularItalic.otf',
      style: 'italic',
      weight: '400',
    },
    {
      path: '../../public/fonts/BrandonGrotesque-Thin.otf',
      style: 'normal',
      weight: '100',
    },
    {
      path: '../../public/fonts/BrandonGrotesque-ThinItalic.otf',
      style: 'italic',
      weight: '100',
    },
  ],
});
