import { Header } from '@/components/ui/typography/Header';
import { cn } from '@/utils/cn';

import type { HeaderProps } from '@/components/ui/typography/Header';
import type { LayoutProps } from '@/types/components/LayoutProps';

type DivProps = JSX.IntrinsicElements['div'];

export interface PageTitleProps extends DivProps {
  heading: string;
  subtitle?: string;
  type?: HeaderProps['type'];
}

export function Title(props: PageTitleProps): JSX.Element {
  const header = props.type ?? 'h2';

  return (
    <>
      <div {...props} className={cn('flex items-center justify-between', props.className)}>
        <div className="grid gap-1">
          <Header type={header}>{props.heading}</Header>
          {props.subtitle && <p className="text-lg text-muted-foreground">{props.subtitle}</p>}
        </div>
      </div>
    </>
  );
}

export function Body(props: LayoutProps): JSX.Element {
  return <div className="mt-10">{props.children}</div>;
}
