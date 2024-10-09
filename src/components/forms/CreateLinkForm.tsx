'use client';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/Form';
import { Header } from '@/components/ui/Header';
import { Input } from '@/components/ui/Input';
import { CheckIcon, CirclePlusIcon, EditIcon, TrashIcon, XIcon } from 'lucide-react';

import { useForm } from '@/hooks/useForm';
import { LinkFormSchema } from '@/lib/schemas';

import type { UseConfig } from '@/hooks/useConfig';
import type { Category, Link } from '@/lib/schemas';
import type { With } from '@/types';

export type CreateLinkFormProps = With<UseConfig, 'config'> & {
  category: Category;
};

export function CreateLinkForm({ category, createLink }: CreateLinkFormProps) {
  const { form } = useForm<LinkFormSchema>({
    schema: LinkFormSchema,
  });

  function onSubmit(values: LinkFormSchema) {
    createLink(category.id, values);
    onReset();
  }

  function onReset() {
    form.reset({ name: '', key: '', url: '', query: '' });
  }

  return (
    <Form {...form}>
      <form
        className='flex w-full flex-row items-start gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={onReset}
      >
        <div className='flex w-full flex-row items-start gap-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input placeholder={'Name'} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='key'
            render={({ field }) => (
              <FormItem className='w-20'>
                <FormControl>
                  <Input className='w-20' placeholder={'key'} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input placeholder={'URL'} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='query'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input placeholder={'Search Path'} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          className='w-[112px] gap-2 p-2'
          type='submit'
          variant='outline'
          disabled={!form.formState.isDirty}
        >
          <CirclePlusIcon className='size-4' /> Create Link
        </Button>
      </form>
    </Form>
  );
}
