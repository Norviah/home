'use client';

import { Links } from './Links';

import { SearchSchema } from '@/lib/schemas';
import { defaultConfig, generateUrl } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useConfigStore } from '@/lib/store/counter-store-provider';

export function SearchInput(): JSX.Element {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<SearchSchema>({
    resolver: zodResolver(SearchSchema),
    defaultValues: { query: '' },
  });

  const { categories, loadDummyConfig, settings } = useConfigStore((state) => state);
  const { ref, ...rest } = form.register('query');

  function close() {
    setQuery('');
    inputRef.current?.blur();
    form.reset({ query: '' });
  }

  function onSubmit({ query }: SearchSchema) {
    window.location.href = generateUrl({ categories, ...settings }, query);
  }

  function onChange({ query }: SearchSchema) {
    setQuery(query);

    if (query.length === 0) {
      close();
    }
  }

  function handleKeyPress(event: KeyboardEvent) {
    const modifierKeys = ['Control', 'Meta', 'Alt', 'Shift', 'Enter'];

    if (event.key === 'Escape') {
      close();
    }

    if (modifierKeys.includes(event.key)) {
      return;
    }

    form.setFocus('query');

    // TODO: Blur the field if the user presses some combination of keys that
    //       doesn't add a character but ends in a letter (e.g. `ctrl+a`).
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  return (
    <>
      <div className='flex h-screen w-full items-center justify-center'>
        <form
          className='flex w-full flex-row items-center justify-between gap-10'
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={form.handleSubmit(onChange)}
          autoComplete='off'
        >
          <input
            ref={(e) => {
              ref(e);

              // @ts-ignore
              inputRef.current = e;
            }}
            className='block w-[100%] appearance-none border-0 bg-transparent p-0 text-center font-bold text-6xl outline-none focus:ring-0'
            {...rest}
          />
        </form>
      </div>

      {query.length === 0 && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <Links />
        </div>
      )}
    </>
  );
}
