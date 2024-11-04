'use client';

import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { PlusCircleIcon } from 'lucide-react';

import { useForm } from '@/hooks/useForm';
import { TitleSchema } from '@/lib/schemas';
import { useConfigStore } from '@/lib/store/counter-store-provider';

export function CreateCategoryForm() {
  const { createCategory } = useConfigStore((state) => state);

  const { form } = useForm<TitleSchema>({
    schema: TitleSchema,
  });

  function onSubmit(values: TitleSchema) {
    createCategory(values.title);
    form.reset({ title: '' });
  }

  return (
    <Form {...form}>
      <form className='flex w-1/2 flex-row gap-2' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder='New category' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant='outline' className='gap-2' type='submit'>
          <PlusCircleIcon className='size-4' />

          <p>Add</p>
        </Button>
      </form>
    </Form>
  );
}
