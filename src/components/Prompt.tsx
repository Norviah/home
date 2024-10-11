'use client';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';

import { cn } from '@/lib/utils';
import { useState } from 'react';

import type { ButtonProps } from '@/components/ui/Button';

export type PromptProps = Omit<ButtonProps, 'onClick'> & {
  title: React.ReactNode;
  text: React.ReactNode;
  onClick: () => void;
  icon: React.ReactNode;
};

export function Prompt({ className, children, onClick, title, text, icon, ...props }: PromptProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn('p-2', className)} type='button' variant='destructive' {...props}>
          {icon}
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{text}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type='button' variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            type='button'
            variant='destructive'
            onClick={() => {
              onClick();
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
