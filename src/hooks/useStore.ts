'use client';

import { useConfigStore } from '@/lib/store/counter-store-provider';
import { useEffect, useState } from 'react';

export function useStore() {
  const store = useConfigStore((state) => state);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  return { ...store, render };
}
