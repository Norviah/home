'use client';

import { type ReactNode, createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

import { type ConfigStore, createConfigState, initConfigState } from './counter-store';

export type ConfigStoreApi = ReturnType<typeof createConfigState>;

export const ConfigStoreContext = createContext<ConfigStoreApi | undefined>(undefined);

export interface ConfigStoreProviderProps {
  children: ReactNode;
}

export const ConfigStoreProvider = ({ children }: ConfigStoreProviderProps) => {
  const storeRef = useRef<ConfigStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createConfigState(initConfigState());
  }

  return (
    <ConfigStoreContext.Provider value={storeRef.current}>{children}</ConfigStoreContext.Provider>
  );
};

export const useConfigStore = <T,>(selector: (store: ConfigStore) => T): T => {
  const counterStoreContext = useContext(ConfigStoreContext);

  if (!counterStoreContext) {
    throw new Error('useCounterStore must be used within CounterStoreProvider');
  }

  return useStore(counterStoreContext, selector);
};
