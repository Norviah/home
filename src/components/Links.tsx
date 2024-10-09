'use client';

import { InlineLink } from '@/components/ui/InlineLink';
import type { UseConfig } from '@/hooks/useConfig';

export function Links({ config, loadDummyConfig }: Pick<UseConfig, 'config' | 'loadDummyConfig'>) {
  if (!config) {
    return <></>;
  }

  const categories = config.categories.filter((category) => {
    return category.links.length > 0;
  });

  if (!categories.length) {
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
        gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr)`,
      }}
    >
      {categories.map((category) => (
        <div className='flex flex-col gap-3' key={category.id}>
          {config.title && <p>{category.title}</p>}

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
