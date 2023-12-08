'use client';

import { Menu } from '@/components/Menu';

import { cn } from '@/utils/cn';
import { constructUrl } from '@/utils/constructUrl';
import { useEffect, useRef, useState } from 'react';

export default function HomePage(): JSX.Element {
  const [showMenu, setShowMenu] = useState(true);
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if the input is already focused
      const isInputFocused: boolean = document.activeElement === inputRef.current;

      if (isInputFocused) {
        return;
      }

      setShowMenu(false);

      setTimeout(() => {
        inputRef.current!.focus();
        setSearchText(event.key);
        inputRef.current!.value = event.key;
      }, 1);
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const url: string = constructUrl(searchText);
    window.location.href = url;
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <section className="flex h-screen flex-col items-center justify-center">
          <form onSubmit={onSubmit} className={cn(showMenu && 'hidden')}>
            <input
              ref={inputRef}
              className="w-full border-none bg-transparent text-center text-6xl outline-none focus:border-none"
              type="text"
              onChange={(event) => {
                setSearchText(event.target.value);
                if (event.target.value === '') {
                  setShowMenu(true);
                }
              }}
            />
          </form>
          <Menu className={!showMenu && 'hidden'} />
        </section>
      </div>
    </div>
  );
}
