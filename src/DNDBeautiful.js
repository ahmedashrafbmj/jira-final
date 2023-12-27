// Beautiful.js

import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import 'react-beautiful-dnd/dist/react-beautiful-dnd.css'; // Updated import

const DragAndDropList = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {item.content}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};


const Beautiful = () => {
  const initialItems = [
    { id: 'item-1', content: 'Item 1' },
    { id: 'item-2', content: 'Item 2' },
    { id: 'item-3', content: 'Item 3' },
  ];

  return (
    <div>
      <h1>D&D Example</h1>
      <DragAndDropList initialItems={initialItems} />
    </div>
  );
};

export default Beautiful;
