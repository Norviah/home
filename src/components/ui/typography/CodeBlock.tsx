import { cn } from '@/utils/cn';

export type CodeBlockProps = JSX.IntrinsicElements['code'];

export function CodeBlock(props: CodeBlockProps): JSX.Element {
  return (
    <code
      {...props}
      className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold', props.className)}
    >
      {props.children}
    </code>
  );
}
