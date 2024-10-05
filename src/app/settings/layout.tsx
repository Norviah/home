import { LinkIcon } from '@/components/LinkIcon';
import { HomeIcon } from 'lucide-react';

import type { LayoutProps } from '@/types';

export default function SettingsLayout({ children }: LayoutProps) {
  return (
    <>
      <LinkIcon route='/' icon={HomeIcon} />

      <div className='container w-full space-y-10 py-10'>{children}</div>
    </>
  );
}
