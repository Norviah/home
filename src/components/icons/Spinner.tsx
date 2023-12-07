import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

import type { LucideProps } from 'lucide-react';

export function SpinnerIcon(props: LucideProps): JSX.Element {
  return <Loader2 {...props} className={cn('h-4 w-4 animate-spin text-foreground', props.className)} />;
}
