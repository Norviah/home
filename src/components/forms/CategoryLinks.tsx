'use client';

import { EditLinkForm } from './EditLinkForm';
import { DragDropContext, Draggable, Droppable, type DropResult } from '@hello-pangea/dnd';
import { GripVerticalIcon } from 'lucide-react';

import { useStore } from '@/hooks/useStore';

import type { Category } from '@/lib/schemas';

export type CategoryLinksProps = {
  category: Category;
};

export function CategoryLinks({ category }: CategoryLinksProps): JSX.Element {
  const { moveLink } = useStore();

  function onDragEnd(result: DropResult): void {
    if (!result.destination) {
      return;
    }

    // const sourceChapterId = result.draggableId;
    // const destinationChapterId = category.links[result.destination.index].id;

    // const sourceIndex = category.links.findIndex(
    //   (chapter) => chapter.id.toString() === sourceChapterId,
    // );

    // const destinationIndex = category.links.findIndex(
    //   (chapter) => chapter.id === destinationChapterId,
    // );

    // console.log(sourceChapterId, destinationChapterId);
    // console.log(sourceIndex, destinationIndex);
    // console.log(result.source.index, result.destination.index);

    moveLink(category.id, result.source.index, result.destination.index);
  }

  return (
    <div className='space-y-3'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={category.id.toString()}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className='space-y-4'>
              {category.links.map((link, index) => (
                <Draggable key={link.id} draggableId={link.id.toString()} index={index}>
                  {(provided) => (
                    <EditLinkForm provided={provided} category={category} link={link} />
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
