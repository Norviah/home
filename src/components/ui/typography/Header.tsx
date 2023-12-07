import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';

import type { VariantProps } from 'class-variance-authority';

export const headerVariants = cva('scroll-m-20', {
  variants: {
    type: {
      h1: 'text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
      h3: 'text-2xl font-semibold tracking-tight',
      h4: 'text-xl font-semibold tracking-tight',
    },
  },
});

type Headers = NonNullable<VariantProps<typeof headerVariants>['type']>;
type BaseHeaderProps = JSX.IntrinsicElements[Headers];

export interface HeaderProps extends BaseHeaderProps, VariantProps<typeof headerVariants> {
  type: Headers;
}

export function Header(props: HeaderProps): JSX.Element {
  return (
    <props.type
      {...props}
      className={cn(
        headerVariants({
          type: props.type,
        }),
        props.className
      )}
    >
      {props.children}
    </props.type>
  );
}
