'use client';

import {
  CategoryTitleForm,
  CreateCategoryForm,
  CreateLinkForm,
  EditLinkForm,
  SettingsForm,
} from '@/components/forms';
import { CategoriesContainer } from '@/components/forms/Categories';
import { CategoryLinks } from '@/components/forms/CategoryLinks';
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
          <CategoriesContainer categories={categories} />
        ) : (
          <p>No categories.</p>
        )}
      </div>
    </div>
  );
}

// <div className='space-y-3'>
//   {category.links.map((link) => (
//     <EditLinkForm category={category} link={link} key={link.id} />
//   ))}
// </div>
