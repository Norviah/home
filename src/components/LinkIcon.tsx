import Link from 'next/link';

import { Button } from './ui/Button';

import type { LucideIcon } from 'lucide-react';
import type { Route } from 'next';

export type LinkIcon = {
  icon: LucideIcon;
  route: Route;
};

export function LinkIcon({ icon: Icon, route }: LinkIcon): JSX.Element {
  return (
    <Link href={route} className='fixed top-0 right-0 p-5'>
      <Button variant='ghost' className='p-2 hover:bg-transparent'>
        <Icon className='size-5 lg:size-6 xl:size-7' />
      </Button>
    </Link>
  );
}
