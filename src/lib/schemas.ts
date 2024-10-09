import { z } from 'zod';

export const Id = z.number().default(() => {
  return Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 0 + 1) + 0);
});

export const Link = z.object({
  name: z.string().min(1),
  key: z.string().min(1),
  url: z.string().url(),
  query: z.string().optional(),
  id: Id,
  index: z.number(),
});

export type Link = z.infer<typeof Link>;

export const Category = z.object({
  title: z.string(),
  links: z.array(Link),
  id: Id,
  index: z.number(),
});

export type Category = z.infer<typeof Category>;

export const Settings = z.object({
  searchEngine: z.string().refine((value) => value.includes('{}')),
  pathDelimiter: z.string(),
  title: z.boolean(),
});

export type Settings = z.infer<typeof Settings>;

export const Config = Settings.merge(
  z.object({
    categories: z.array(Category),
  }),
);

export type Config = z.infer<typeof Config>;

export const TitleSchema = z.object({ title: z.string().min(1) });
export type TitleSchema = z.infer<typeof TitleSchema>;

export const LinkFormSchema = Link.omit({ id: true, index: true });
export type LinkFormSchema = z.infer<typeof LinkFormSchema>;

export const SearchSchema = z.object({ query: z.string() });
export type SearchSchema = z.infer<typeof SearchSchema>;
