'use client';

import { Links } from './Links';

import { useDebounce } from '@/hooks/useDebounce';
import { useStore } from '@/hooks/useStore';
import { SearchSchema } from '@/lib/schemas';
import { cn, generateUrl } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export function SearchInput(): JSX.Element {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [focusedSuggestion, setFocusedSuggestion] = useState<number | null>(null);
  const [forceSearch, setForceSearch] = useState<boolean>(false);

  const debouncedQuery = useDebounce(query, 150);
  const inputRef = useRef<HTMLInputElement>(null);
  const config = useStore();

  const form = useForm<SearchSchema>({
    resolver: zodResolver(SearchSchema),
    defaultValues: { query: '' },
  });

  const { ref, ...rest } = form.register('query');

  function close() {
    setQuery('');
    inputRef.current?.blur();
    form.reset({ query: '' });
    setSuggestions([]);
  }

  function onSubmit({ query: raw }: SearchSchema) {
    window.location.href = generateUrl({ config, raw, forceSearch });
  }

  function onChange({ query }: SearchSchema) {
    setQuery(query);

    if (suggestions.length) {
      setSuggestions([]);
    }

    if (focusedSuggestion !== null) {
      setFocusedSuggestion(null);
    }

    if (query.length === 0) {
      close();
    }
  }

  function focusSuggestion(key: string) {
    const direction = key === 'ArrowDown' ? 1 : -1;
    const nextIndexPoor =
      focusedSuggestion === null
        ? direction === 1
          ? 0
          : suggestions.length - 1
        : focusedSuggestion + direction;

    const nextIndex =
      nextIndexPoor >= suggestions.length || nextIndexPoor < 0 ? null : nextIndexPoor;

    setFocusedSuggestion(nextIndex);

    if (nextIndex === null) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      return focusSuggestion(event.key);
    }

    if (!(event.key === 'Enter')) {
      setForceSearch(event.key === 'Shift' || event.key === 'Control');
    }

    if (
      event.key === 'Enter' &&
      focusedSuggestion !== null &&
      !(document.activeElement === inputRef.current)
    ) {
      return onSubmit({ query: suggestions[focusedSuggestion] });
    }

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

  async function fetchSuggestions(query: string) {
    const res = await fetch(`/api/suggestions?q=${query.trim()}`, {
      method: 'GET',
    });

    const phrases = ((await res.json()) as { phrase: string }[])
      .filter(({ phrase }) => phrase.trim() !== query.trim())
      .slice(0, config.settings.suggestionsLimit)
      .map(({ phrase }) => phrase);

    if (query === '') {
      return;
    }

    setSuggestions(phrases);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    if (debouncedQuery.trim().length === 0 || !config.settings.suggestions) {
      return;
    }

    fetchSuggestions(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <>
      <div className='flex h-screen w-full items-center justify-center'>
        <form
          className='flex w-full flex-col items-center justify-between gap-2'
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

          <div className='flex h-9 flex-row items-center gap-8 text-xl'>
            {query &&
              suggestions.map((suggestion, index) => {
                const suggestionStartsWithQuery = suggestion.startsWith(query);
                const active = index === focusedSuggestion;

                return (
                  <a
                    href={generateUrl({ config, forceSearch, raw: suggestion })}
                    key={suggestion}
                    className={cn(
                      'rounded p-2',
                      !active && 'hover:bg-accent',
                      active && 'bg-foreground-light text-background',
                    )}
                  >
                    {suggestionStartsWithQuery && <span>{query}</span>}

                    <span className={cn(!active && 'text-foreground')}>
                      {suggestionStartsWithQuery ? suggestion.slice(query.length) : suggestion}
                    </span>
                  </a>
                );
              })}
          </div>
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
