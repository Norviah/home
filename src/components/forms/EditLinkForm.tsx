'use client';

import { Prompt } from '@/components/Prompt';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { CheckIcon, GripVerticalIcon, TrashIcon, XIcon } from 'lucide-react';

import { useForm } from '@/hooks/useForm';
import { LinkFormSchema } from '@/lib/schemas';
import { useConfigStore } from '@/lib/store/counter-store-provider';

import type { Category, Link } from '@/lib/schemas';
import type { DraggableProvided } from '@hello-pangea/dnd';

export type EditLinkFormProps = {
  link: Link;
  category: Category;
  provided: DraggableProvided;
};

export function EditLinkForm({ link, category, provided }: EditLinkFormProps) {
  const { editLink, deleteLink } = useConfigStore((state) => state);

  const { form } = useForm<LinkFormSchema>({
    schema: LinkFormSchema,
    defaultValues: link,
  });

  function onSubmit(values: LinkFormSchema) {
    editLink(category.id, link.id, values);
  }

  function onDelete() {
    deleteLink(category.id, link.id);
  }

  function onReset() {
    form.reset(link);
  }

  return (
    <div ref={provided.innerRef} {...provided.draggableProps}>
      <Form {...form}>
        <form
          className='flex w-full flex-row items-start justify-between gap-10'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='flex w-full flex-row items-center justify-center gap-2'>
            <div {...provided.dragHandleProps} className='cursor-grab'>
              <GripVerticalIcon size={20} />
            </div>

            <div className='flex w-full flex-row items-start justify-center gap-2'>
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

            <Prompt
              title='Delete Link'
              text={
                <>
                  Are you sure you want to delete the link{' '}
                  <span className='text-foreground'>{link.name}</span>?
                </>
              }
              onClick={onDelete}
              icon={<TrashIcon className='size-4' />}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
