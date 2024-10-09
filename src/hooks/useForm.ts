'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';

import type { DefaultValues } from 'react-hook-form';
import type { ZodType } from 'zod';

export type UseFormArgs<Schema extends Record<string, unknown>> = {
  schema: ZodType<Schema>;
  defaultValues?: DefaultValues<Schema>;
};

export function useForm<Schema extends Record<string, unknown>>({
  schema,
  defaultValues,
}: UseFormArgs<Schema>) {
  const form = useReactHookForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return { form };
}
