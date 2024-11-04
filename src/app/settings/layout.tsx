import { LinkIcon } from '@/components/LinkIcon';
import { ScrollArea, ScrollBar } from '@/components/ui/ScrollArea';
import { HomeIcon } from 'lucide-react';

import type { LayoutProps } from '@/types';

export default function SettingsLayout({ children }: LayoutProps) {
  return (
    <ScrollArea className='h-screen'>
      <div className='container w-full space-y-10 py-10'>
        <LinkIcon route='/' icon={HomeIcon} />
        {children}
      </div>

      <ScrollBar orientation='vertical' className='w-3' />
    </ScrollArea>
  );
}
