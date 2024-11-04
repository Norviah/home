import { Card } from '@/components/ui/Card';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { CategoryLinks } from './CategoryLinks';
import { CategoryTitleForm } from './CategoryTitleForm';
import { CreateLinkForm } from './CreateLinkForm';

import { useStore } from '@/hooks/useStore';
import type { Category } from '@/lib/schemas';
import type { DropResult } from '@hello-pangea/dnd';

export type CategoriesProps = {
  categories: Category[];
};

export function CategoriesContainer({ categories }: CategoriesProps): JSX.Element | JSX.Element[] {
  const { moveCategory } = useStore();

  function onDragEnd(results: DropResult): void {
    if (!results.destination) {
      return;
    }

    moveCategory(results.source.index, results.destination.index);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='categories'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className='space-y-3'>
            {categories.map((category, index) => (
              <Draggable key={category.id} draggableId={category.id.toString()} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    <Card className='space-y-8 p-5' key={category.id}>
                      <CategoryTitleForm provided={provided} category={category} />

                      <CreateLinkForm category={category} />

                      {category.links.length > 0 ? (
                        <CategoryLinks category={category} />
                      ) : (
                        <p>No links.</p>
                      )}
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
