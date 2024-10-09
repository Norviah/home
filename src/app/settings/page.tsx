'use client';

import {
  CategoryTitleForm,
  CreateCategoryForm,
  CreateLinkForm,
  EditLinkForm,
  SettingsForm,
} from '@/components/forms';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/ui/Header';

import { useConfig } from '@/hooks/useConfig';

export default function ProfilePage() {
  const { config, ...rest } = useConfig();

  if (!config) {
    return null;
  }

  return (
    <div className='space-y-10'>
      <div className='space-y-5'>
        <Header type='h2'>Settings</Header>

        <SettingsForm config={config} {...rest} />
      </div>

      <div className='space-y-5'>
        <Header type='h2'>Categories</Header>

        <CreateCategoryForm config={config} {...rest} />

        {config.categories.length > 0 ? (
          config.categories.map((category) => (
            <Card className='space-y-8 p-5' key={category.id}>
              <CategoryTitleForm category={category} config={config} {...rest} />

              <CreateLinkForm category={category} config={config} {...rest} />

              {category.links.length > 0 ? (
                <div className='space-y-3'>
                  {category.links.map((link) => (
                    <EditLinkForm
                      category={category}
                      config={config}
                      link={link}
                      {...rest}
                      key={link.id}
                    />
                  ))}
                </div>
              ) : (
                <p>No links.</p>
              )}
            </Card>
          ))
        ) : (
          <p>No categories.</p>
        )}
      </div>
    </div>
  );
}
