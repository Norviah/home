import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { defaultConfig, randomNumber } from './utils';

import type { Category, LinkFormSchema, Settings } from './schemas';

export type ConfigState = {
  settings: Settings;
  categories: Category[];
};

export type ConfigActions = {
  updateSettings: (settings: Settings) => void;
  createCategory: (title: string) => void;
  resetCategories: () => void;
  editCategoryTitle: (id: number, title: string) => void;
  deleteCategory: (id: number) => void;
  createLink: (category: number, link: LinkFormSchema) => void;
  editLink: (category: number, link: number, args: LinkFormSchema) => void;
  deleteLink: (category: number, link: number) => void;
  loadDummyConfig: () => void;
};

export type ConfigStore = ConfigState & ConfigActions;

const defaultInitState: ConfigState = {
  settings: {
    searchEngine: 'https://encrypted.google.com/search?q={}',
    pathDelimiter: '/',
    title: false,
  },

  categories: [],
};

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set) => ({
      ...defaultInitState,

      loadDummyConfig: () => {
        set(() => defaultConfig);
      },

      resetCategories: () => {
        set(() => ({ categories: [] }));
      },

      updateSettings: (settings) => {
        set((state) => ({ settings, categories: state.categories }));
      },

      createCategory: (title) => {
        set((state) => ({
          categories: [...state.categories, { title, id: randomNumber(), links: [] }],
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
                links: [...cat.links, { ...link, id: randomNumber() }],
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
    }),

    { name: 'bear-storage' },
  ),
);
