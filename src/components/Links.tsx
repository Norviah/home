'use client';

import { InlineLink } from '@/components/ui/InlineLink';
import { useStore } from '@/hooks/useStore';
import { useConfigStore } from '@/lib/store/counter-store-provider';
import { useEffect } from 'react';

export function Links() {
  const { loadDummyConfig, categories, settings, render } = useStore();

  if (!render) {
    return <></>;
  }

  const filteredCategories = categories.filter((category) => {
    return category.links.length > 0;
  });

  if (!filteredCategories.length) {
    return (
      <div className='max-w-md space-y-1 text-lg'>
        <p>You have no links saved.</p>

        <p>
          Be sure to create some in <InlineLink href='/settings' text='settings' /> or{' '}
          <InlineLink href='#' text='click here' onClick={loadDummyConfig} /> to load a sample
          configuration.
        </p>
      </div>
    );
  }

  return (
    <div
      className='grid gap-20'
      style={{
        gridTemplateColumns: `repeat(${filteredCategories.length}, minmax(0, 1fr)`,
      }}
    >
      {filteredCategories.map((category) => (
        <div className='flex flex-col gap-3' key={category.id}>
          {settings.title && <p>{category.title}</p>}

          <div className='flex flex-col gap-5'>
            {category.links.map((link) => (
              <div className='group flex items-center gap-1' key={link.id}>
                <p className='min-w-[3rem] text-foreground'>{link.key}</p>

                <a
                  href={link.url}
                  className='text-foreground-lighter transition-colors group-hover:text-foreground'
                >
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
