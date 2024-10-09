'use client';

import { Config, type LinkFormSchema, type Link } from '@/lib/schemas';
import { defaultConfig, randomNumber } from '@/lib/utils';
import { useEffect, useState } from 'react';

export type UseConfig = {
  config: Config | null;
  setConfig: (config: Config) => void;
  updateConfig: (newConfig: Config) => void;
  createCategory: (title: string) => void;
  editCategory: <Key extends Exclude<keyof Config['categories'][number], 'id'>>(
    id: number,
    key: Key,
    value: Config['categories'][number][Key],
  ) => void;
  deleteCategory: (id: number) => void;
  editLink: (args: { category: number } & Link) => void;
  deleteLink: (category: number, link: number) => void;
  createLink: (category: number, link: LinkFormSchema) => void;
  loadDummyConfig: () => void;
};

export function useConfig(): UseConfig {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    const string = localStorage.getItem('config');

    if (!string) {
      setConfig(defaultConfig);
    } else {
      setConfig(Config.parse(JSON.parse(string)));
    }
  }, []);

  const saveConfig = (config: Config) => {
    localStorage.setItem('config', JSON.stringify(config));
  };

  const updateConfig = (newConfig: Config) => {
    setConfig(newConfig);
    saveConfig(newConfig);
  };

  const loadDummyConfig = () => {
    updateConfig(defaultConfig);
  };

  const createCategory = (title: string) => {
    if (!config) {
      return;
    }

    const newConfig: Config = {
      ...config,
      categories: [...config.categories, { title, links: [], id: randomNumber() }],
    };

    updateConfig(newConfig);
  };

  const editCategory = <Key extends Exclude<keyof Config['categories'][number], 'id'>>(
    id: number,
    key: Key,
    value: Config['categories'][number][Key],
  ) => {
    if (!config) {
      return;
    }

    const newCategories = config.categories.map((category) => {
      if (category.id === id) {
        return { ...category, [key]: value };
      }

      return category;
    });

    updateConfig({ ...config, categories: newCategories });
  };

  const deleteCategory = (id: number) => {
    if (!config) {
      return;
    }

    updateConfig({
      ...config,
      categories: config.categories.filter((category) => category.id !== id),
    });
  };

  const editLink = (args: { category: number } & Link) => {
    if (!config) {
      return;
    }

    const newCategories = config.categories.map((category) => {
      if (category.id === args.category) {
        const newLinks = category.links.map((link) => {
          if (link.id === args.id) {
            return { ...link, ...args };
          }

          return link;
        });

        return { ...category, links: newLinks };
      }

      return category;
    });

    updateConfig({ ...config, categories: newCategories });
  };

  const deleteLink = (category: number, link: number) => {
    if (!config) {
      return;
    }

    const newCategories = config.categories.map((c) => {
      if (c.id === category) {
        return {
          ...c,
          links: c.links.filter((l) => l.id !== link),
        };
      }

      return c;
    });

    updateConfig({ ...config, categories: newCategories });
  };

  const createLink = (category: number, link: LinkFormSchema) => {
    if (!config) {
      return;
    }

    const newCategories = config.categories.map((c) => {
      if (c.id === category) {
        return {
          ...c,
          links: [...c.links, { ...link, id: randomNumber() }],
        };
      }

      return c;
    });

    updateConfig({ ...config, categories: newCategories });
  };

  return {
    config,
    setConfig,
    updateConfig,
    createCategory,
    editCategory,
    deleteCategory,
    editLink,
    deleteLink,
    createLink,
    loadDummyConfig,
  };
}
