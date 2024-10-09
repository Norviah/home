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
import { useStore } from '@/hooks/useStore';

export default function ProfilePage() {
  const { categories, render } = useStore();

  if (!render) {
    return <></>;
  }

  return (
    <div className='space-y-10'>
      <div className='space-y-5'>
        <Header type='h2'>Settings</Header>

        <SettingsForm />
      </div>

      <div className='space-y-5'>
        <Header type='h2'>Categories</Header>

        <CreateCategoryForm />

        {categories.length > 0 ? (
          categories.map((category) => (
            <Card className='space-y-8 p-5' key={category.id}>
              <CategoryTitleForm category={category} />

              <CreateLinkForm category={category} />

              {category.links.length > 0 ? (
                <div className='space-y-3'>
                  {category.links.map((link) => (
                    <EditLinkForm category={category} link={link} key={link.id} />
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
