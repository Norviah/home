'use client';

import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { CheckIcon, TrashIcon, XIcon } from 'lucide-react';

import { useForm } from '@/hooks/useForm';
import { LinkFormSchema } from '@/lib/schemas';

import type { UseConfig } from '@/hooks/useConfig';
import type { Category, Link } from '@/lib/schemas';
import type { With } from '@/types';

export type EditLinkFormProps = With<UseConfig, 'config'> & {
  link: Link;
  category: Category;
};

export function EditLinkForm({ link, category, editLink, deleteLink }: EditLinkFormProps) {
  const { form } = useForm<LinkFormSchema>({
    schema: LinkFormSchema,
    defaultValues: link,
  });

  function onSubmit(values: LinkFormSchema) {
    editLink({ category: category.id, ...values, id: link.id });
  }

  function onDelete() {
    deleteLink(category.id, link.id);
  }

  function onReset() {
    form.reset(link);
  }

  return (
    <Form {...form}>
      <form
        className='flex w-full flex-row items-center justify-between gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex w-full flex-row gap-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input placeholder={link.name} {...field} />
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
                  <Input className='w-20' placeholder={link.key} {...field} />
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
                  <Input placeholder={link.url} {...field} />
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
                  <Input placeholder={link.query ?? 'Search Path'} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-row gap-2'>
          <Button
            className='p-2'
            type='submit'
            variant='success'
            disabled={!form.formState.isDirty}
          >
            <CheckIcon className='size-4' />
          </Button>

          <Button
            className='p-2'
            type='button'
            variant='destructive'
            disabled={!form.formState.isDirty}
            onClick={onReset}
          >
            <XIcon className='size-4' />
          </Button>

          <Button className='p-2' type='button' variant={'destructive'} onClick={onDelete}>
            <TrashIcon className='size-4' />
          </Button>
        </div>
      </form>
    </Form>
  );
}
