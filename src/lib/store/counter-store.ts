// import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla';
import { defaultConfig, pick, randomNumber } from '../utils';

import type { Category, LinkFormSchema, Settings } from '../schemas';

export type ConfigState = {
  settings: Settings;
  categories: Category[];
};

export type ConfigActions = {
  updateSettings: (settings: Settings) => void;
  createCategory: (title: string) => void;
  resetCategories: () => void;
  editCategoryTitle: (id: number, title: string) => void;
  loadDefaultSettings: () => void;
  deleteCategory: (id: number) => void;
  createLink: (category: number, link: LinkFormSchema) => void;
  editLink: (category: number, link: number, args: LinkFormSchema) => void;
  deleteLink: (category: number, link: number) => void;
  loadDummyConfig: () => void;
  moveLink: (category: number, source: number, destination: number) => void;
  moveCategory: (source: number, destination: number) => void;
};

export type ConfigStore = ConfigState & ConfigActions;

export const initConfigState = (): ConfigState => {
  return {
    settings: {
      searchEngine: 'https://encrypted.google.com/search?q={}',
      pathDelimiter: '/',
      title: true,
      suggestions: true,
      suggestionsLimit: 4,
    },

    categories: [],
  };
};

export const defaultInitState: ConfigState = {
  settings: {
    searchEngine: 'https://encrypted.google.com/search?q={}',
    pathDelimiter: '/',
    title: true,
    suggestions: true,
    suggestionsLimit: 4,
  },

  categories: [],
};

export const createConfigState = (initState: ConfigState = defaultInitState) => {
  const store = createStore<ConfigStore>()(
    persist(
      (set) => ({
        ...initState,

        loadDummyConfig: () => {
          set(() => defaultConfig);
        },

        loadDefaultSettings: () => {
          set(() => ({ settings: defaultInitState.settings }));
        },

        resetCategories: () => {
          set(() => ({ categories: [] }));
        },

        updateSettings: (settings) => {
          set(() => ({ settings }));
        },

        createCategory: (title) => {
          const category: Omit<Category, 'index'> = {
            title,
            id: randomNumber(),
            links: [],
          };

          set((state) => ({
            categories: [...state.categories, { ...category, index: state.categories.length }],
          }));
        },

        deleteCategory: (id: number) => {
          set((state) => ({
            categories: state.categories.filter((category) => category.id !== id),
          }));
        },

        editCategoryTitle: (id: number, title: string) => {
          set((state) => {
            const newCategories = state.categories.map((category) => {
              if (category.id === id) {
                return { ...category, title };
              }

              return category;
            });

            return { categories: newCategories };
          });
        },

        createLink: (category: number, link: LinkFormSchema) => {
          set((state) => {
            const newCategories = state.categories.map((cat) => {
              if (cat.id === category) {
                return {
                  ...cat,
                  links: [...cat.links, { ...link, id: randomNumber(), index: cat.links.length }],
                };
              }

              return cat;
            });

            return { categories: newCategories };
          });
        },

        editLink: (category: number, link: number, args: LinkFormSchema) => {
          set((state) => {
            const newCategories = state.categories.map((cat) => {
              if (cat.id === category) {
                const newLinks = cat.links.map((l) => {
                  if (l.id === link) {
                    return { ...l, ...args };
                  }

                  return l;
                });

                return { ...cat, links: newLinks };
              }

              return cat;
            });

            return { categories: newCategories };
          });
        },

        deleteLink: (category: number, link: number) => {
          set((state) => {
            const newCategories = state.categories.map((cat) => {
              if (cat.id === category) {
                return {
                  ...cat,
                  links: cat.links.filter((l) => l.id !== link),
                };
              }

              return cat;
            });

            return { categories: newCategories };
          });
        },

        moveLink: (category: number, sourceIndex: number, destinationIndex: number) => {
          set((state) => {
            const p = state.categories.find((c) => c.id === category);

            if (!p) {
              return state;
            }

            const copy = [...p.links];

            const [element] = copy.splice(sourceIndex, 1);
            copy.splice(destinationIndex, 0, element);

            return {
              categories: state.categories.map((c) => {
                if (c.id === category) {
                  return { ...c, links: copy };
                }

                return c;
              }),
            };
          });
        },

        moveCategory: (sourceIndex: number, destinationIndex: number) => {
          set((state) => {
            const copy = [...state.categories];

            const [element] = copy.splice(sourceIndex, 1);
            copy.splice(destinationIndex, 0, element);

            return { categories: copy };
          });
        },
      }),
      {
        name: 'store',
      },
    ),
  );

  const missingKeys: (keyof Settings)[] = [];

  const { settings: settingsState } = store.getState();
  const { settings: defaultSettings } = defaultInitState;

  for (const key in defaultSettings) {
    if (key in settingsState) {
      continue;
    }

    missingKeys.push(key as keyof Settings);
  }

  if (missingKeys.length) {
    store.setState((state) => ({
      settings: { ...state.settings, ...pick(defaultSettings, missingKeys) },
    }));
  }

  return store;
};
