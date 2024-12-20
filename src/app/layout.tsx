import { TailwindIndicator } from '@/components/TailwindIndicator';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ToastProvider } from '@/components/ToastProvider';
import { siteConfig } from '@/lib/config';
import { overpass } from '@/lib/font';
import { ConfigStoreProvider } from '@/lib/store/counter-store-provider';
import { cn } from '@/lib/utils';

import type { LayoutProps } from '@/types';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Next.js', 'React', 'Shadcn', siteConfig.name],
  authors: [siteConfig.author],
  creator: siteConfig.author.name,
};

export default function RootLayout(props: LayoutProps): JSX.Element {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn('min-h-screen text-foreground-light antialiased', overpass.className)}
        suppressHydrationWarning
      >
        <ConfigStoreProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {props.children}
          </ThemeProvider>
        </ConfigStoreProvider>
        <TailwindIndicator />
        <ToastProvider className={overpass.className} />
      </body>
    </html>
  );
}
