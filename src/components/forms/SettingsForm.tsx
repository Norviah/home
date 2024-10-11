'use client';

import { Prompt } from '@/components/Prompt';
import { ThemeSelector } from '@/components/ThemeSelector';
import { Card } from '@/components/ui/Card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { InlineCode } from '@/components/ui/InlineCode';
import { InlineLink } from '@/components/ui/InlineLink';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';

import { useForm } from '@/hooks/useForm';
import { Settings } from '@/lib/schemas';
import { useConfigStore } from '@/lib/store/counter-store-provider';

import type { z } from 'zod';

export function SettingsForm() {
  const { settings, updateSettings, loadDefaultSettings } = useConfigStore((state) => state);

  const { form } = useForm<Settings>({
    schema: Settings,
    defaultValues: settings,
  });

  function onChange(values: z.infer<typeof Settings>) {
    updateSettings(values);
  }

  function onReset() {
    loadDefaultSettings();
  }

  return (
    <Card className='space-y-7 p-6'>
      <Form {...form}>
        <form
          className='space-y-7'
          onChange={form.handleSubmit(onChange)}
          onReset={form.handleSubmit(onReset)}
        >
          <div className='flex flex-row items-center justify-between'>
            <div className='space-y-0.5 text-sm'>
              <p>Theme</p>
            </div>

            <ThemeSelector />
          </div>

          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between'>
                <div className='space-y-0.5'>
                  <FormLabel>Category Title</FormLabel>

                  <FormDescription>
                    Show the titles of category sections on the homepage.
                  </FormDescription>
                </div>

                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='searchEngine'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex flex-col gap-2'>
                  <p>Search Engine</p>

                  <p className='text-foreground-lighter'>
                    The engine to use when searching for links, the value must include{' '}
                    <InlineCode text={'{}'} /> to insert the search query.
                  </p>
                </FormLabel>

                <FormControl>
                  <Input placeholder={settings?.searchEngine} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='pathDelimiter'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex flex-col gap-2'>
                  <p>Path Delimiter</p>

                  <div className='space-y-1 text-foreground-lighter'>
                    <p>The character to use as a delimeter when constructing a path for a link.</p>

                    <p className='leading-relaxed'>
                      As an example, if the delimeter is <InlineCode text='/' /> for{' '}
                      <InlineLink href='https://reddit.com' text='reddit' />, then searching for{' '}
                      <InlineCode text='rd/r/programming' /> would redirect to{' '}
                      <InlineCode text='https://reddit.com/r/programming' />.
                    </p>
                  </div>
                </FormLabel>

                <FormControl>
                  <Input placeholder={settings?.pathDelimiter} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className='flex justify-end gap-2'>
        <Prompt
          title='Reset Settings'
          text='Are you sure you want to reset settings?'
          type='reset'
          icon='Reset'
          onClick={onReset}
        />
      </div>
    </Card>
  );
}
