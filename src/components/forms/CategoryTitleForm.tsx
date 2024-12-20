'use client';

import { Prompt } from '@/components/Prompt';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/Form';
import { Header } from '@/components/ui/Header';
import { Input } from '@/components/ui/Input';
import { CheckIcon, EditIcon, GripVerticalIcon, TrashIcon, XIcon } from 'lucide-react';

import { useForm } from '@/hooks/useForm';
import { TitleSchema } from '@/lib/schemas';
import { useConfigStore } from '@/lib/store/counter-store-provider';
import { useState } from 'react';

import type { Category } from '@/lib/schemas';
import type { DraggableProvided } from '@hello-pangea/dnd';

export type CategoryTitleFormProps = {
  category: Category;
  provided: DraggableProvided;
};

export function CategoryTitleForm({ category, provided }: CategoryTitleFormProps) {
  const { editCategoryTitle, deleteCategory } = useConfigStore((state) => state);
  const [state, setState] = useState<'VIEW' | 'EDIT'>('VIEW');

  const { form } = useForm<TitleSchema>({
    schema: TitleSchema,
    defaultValues: category,
  });

  function onSubmit(values: TitleSchema) {
    editCategoryTitle(category.id, values.title);
    setState('VIEW');
  }

  function onDelete() {
    deleteCategory(category.id);
  }

  function onReset() {
    form.reset(category);
  }

  return (
    <Form {...form}>
      <form
        className='flex w-full flex-row items-center justify-between gap-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex flex-row items-center gap-2'>
          <div {...provided.dragHandleProps} className='cursor-grab'>
            <GripVerticalIcon size={20} />
          </div>

          {state === 'VIEW' ? (
            <Header
              onClick={() => {
                setState('EDIT');
              }}
              type='h4'
            >
              {category.title}
            </Header>
          ) : (
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='w-1/2'>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className='flex flex-row gap-2'>
          {state === 'EDIT' && (
            <Button
              className='p-2'
              type='submit'
              variant='success'
              disabled={!form.formState.isDirty}
            >
              <CheckIcon className='size-4' />
            </Button>
          )}

          <Button
            className='p-2'
            type='button'
            onClick={() => {
              setState(state === 'VIEW' ? 'EDIT' : 'VIEW');

              if (state === 'EDIT') {
                onReset();
              }
            }}
            variant={state === 'VIEW' ? 'outline' : 'destructive'}
          >
            {state === 'VIEW' ? <EditIcon className='size-4' /> : <XIcon className='size-4' />}
          </Button>

          <Prompt
            title='Delete category'
            text='Are you sure you want to delete this category?'
            deleteText='Delete'
            onClick={onDelete}
            icon={<TrashIcon className='size-4' />}
          />
        </div>
      </form>
    </Form>
  );
}
