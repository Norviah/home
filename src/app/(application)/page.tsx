'use client';

import { Menu } from '@/components/Menu';

import { cn } from '@/utils/cn';
import { generateUrl } from '@/utils/constructUrl';
import { useEffect, useRef, useState } from 'react';

export default function HomePage(): JSX.Element {
  const [state, setState] = useState<'MENU' | 'INPUT'>('MENU');
  const [searchText, setSearchText] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if the input is already focused
      const isInputFocused: boolean = document.activeElement === inputRef.current;

      if (isInputFocused) {
        if (event.key === 'Escape') {
          setState('MENU');
          inputRef.current!.value = '';
          setSearchText('');
        }

        return;
      }

      if (state === 'MENU') {
        setState('INPUT');

        setTimeout(() => {
          inputRef.current!.focus();

          if ((event.keyCode >= 48 && event.keyCode <= 90) || (event.keyCode >= 96 && event.keyCode <= 105)) {
            setSearchText((prev) => prev + event.key);
            inputRef.current!.value = inputRef.current!.value + event.key;
          }
        }, 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    window.location.href = generateUrl(searchText);
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <section className="flex h-screen flex-col items-center justify-center">
          <form onSubmit={onSubmit} className={cn(state === 'MENU' && 'hidden')}>
            <input
              ref={inputRef}
              className="w-full border-none bg-transparent text-center text-6xl outline-none focus:border-none"
              type="text"
              onChange={(event) => {
                setSearchText(event.target.value);

                if (event.target.value === '') {
                  setState('MENU');
                }
              }}
            />
          </form>
          <Menu className={state === 'INPUT' && 'hidden'} />
        </section>
      </div>
    </div>
  );
}
