import { TailwindIndicator } from '@/components/TailwindIndicator';
import { ThemeProvider } from '@/components/ThemeProvider';

import { cn } from '@/utils/cn';

import type { LayoutProps } from '@/types/components/LayoutProps';
import type { Metadata } from 'next';

import * as config from '@/utils/config';

import '@/styles/globals.css';

export const metadata: Metadata = config.site.metadata;

export default function RootLayout(props: LayoutProps): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen antialiased', config.font.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {props.children}
        </ThemeProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
