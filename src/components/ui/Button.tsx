import { Slot } from '@radix-ui/react-slot';
import { SpinnerIcon } from '@/components/icons/Spinner';

import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';

import type { VariantProps } from 'class-variance-authority';

import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/50 shadow-md',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/50 shadow-md',
        outline:
          'border border-input bg-transparent shadow-sm hover:bg-card-accent hover:text-accent-foreground hover:bg-accent/90 active:bg-accent/50',
        secondary: 'bg-secondary text-secondary-foreground shadow hover:bg-secondary/90 active:bg-secondary/50 shadow-md',
        success: 'bg-success text-success-foreground shadow hover:bg-success/90 active:bg-success/50 shadow-md',
        warn: 'bg-warn text-warn-foreground shadow hover:bg-warn/90 active:bg-warn/50 shadow-md',
        ghost: 'hover:bg-accent/70 active:bg-accent hover:text-accent-foreground',
        icon: 'text-foreground focus-visible:ring-transparent hover:bg-accent/70',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-8 w-8 rounded-lg text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={loading || props.disabled}
      >
        {loading ? (
          <SpinnerIcon
            className={cn(
              'h-4 w-4 animate-spin',
              variant === 'ghost' || variant === 'outline' ? 'text-foreground' : 'text-background'
            )}
          />
        ) : (
          props.children
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
