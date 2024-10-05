import { LinkIcon } from '@/components/LinkIcon';
import { CogIcon } from 'lucide-react';

import type { LayoutProps } from '@/types';

export default function Layout(props: LayoutProps): JSX.Element {
  return (
    <>
      <LinkIcon route='/settings' icon={CogIcon} />

      {props.children}
    </>
  );
}
