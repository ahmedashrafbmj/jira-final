// import React, { useEffect } from 'react';
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from '@dnd-kit/core';
// import {
//   SortableContext,
//   verticalListSortingStrategy,
//   sortableKeyboardCoordinates, // Import sortableKeyboardCoordinates explicitly
//   useSortable,
  
// } from '@dnd-kit/sortable';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProjectDetailsAll } from './Redux/Actions/action.js';

// const Card = ({ id, text }) => {
//   const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id });

//   return (
//         <div
//           ref={setNodeRef}
//           style={{
//             padding: '8px',
//             margin: '8px',
//             border: '1px solid #ccc',
//             transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
//             zIndex: isDragging ? 1 : 'auto',
//           }}
//           {...attributes}
//           {...listeners}
//         >
//           {text}
//         </div>
//       );
// };

// const Dnd = () => {
//   const projectsAll = useSelector((state) => state?.searchedText?.projectsAll);
//   const dispatch = useDispatch();
//   const dataloader1 = useSelector((state) => state?.searchedText.dataloader1);

//   useEffect(() => {
//     dispatch(fetchProjectDetailsAll());
//   }, [dispatch]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   return (
//     <DndContext sensors={sensors} collisionDetection={closestCenter}>
//       {!dataloader1 && Array.isArray(projectsAll) && (
//        <SortableContext items={projectsAll?.map((card) => card.key)} strategy={verticalListSortingStrategy}>
//         {projectsAll?.map((card) => (
//           <Card key={card.key} id={card.key} text={card.name} />
//         ))}
//         </SortableContext>
//       )}
//     </DndContext>
//   );
// };

// export default Dnd;


































































// working Code



// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from '@dnd-kit/core';
// import {
//   SortableContext,
//   verticalListSortingStrategy,
//   sortableKeyboardCoordinates, // Import sortableKeyboardCoordinates explicitly
//   useSortable,
  
// } from '@dnd-kit/sortable';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProjectDetailsAll } from './Redux/Actions/action.js';

// const Card = ({ id, text }) => {
//   const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id });

//   return (
//     <div
//       ref={setNodeRef}
//       style={{
//         padding: '8px',
//         margin: '8px',
//         border: '1px solid #ccc',
//         transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
//         zIndex: isDragging ? 1 : 'auto',
//       }}
//       {...attributes}
//       {...listeners}
//     >
//       {text}
//     </div>
//   );
// };
// const Dnd = () => {
//   const cards = [
//     { id: '1', text: 'Card 1' },
//     { id: '2', text: 'Card 2' },
//     { id: '3', text: 'Card 3' },
//     { id: '4', text: 'Card 4' },
//   ];
//   const projectsAll = useSelector((state) => state?.searchedText?.projectsAll);
//   const dispatch = useDispatch();
//   const dataloader1 = useSelector((state) => state?.searchedText.dataloader1);

//   useEffect(() => {
//     dispatch(fetchProjectDetailsAll());
//   }, [dispatch]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   return (
//    <>
// {   !dataloader1 ? <DndContext sensors={sensors} collisionDetection={closestCenter}>
//       <SortableContext items={Array.isArray(projectsAll) &&projectsAll?.map((card) => card.key)} strategy={verticalListSortingStrategy}>
//         {!dataloader1 ? Array.isArray(projectsAll) && projectsAll?.map((card) => (
//           <Card key={card.key} id={card.key} text={card.name} />
//         )):""}
//       </SortableContext>
//     </DndContext>:""}
//    </>
//   );
// };

// export default Dnd;







// working Code api api


import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.css';
import { Skeleton } from 'antd';
import FilterCard from './components/filterComponents/filterCards.js';
import { CSS } from "@dnd-kit/utilities";

const Card = ({ id, text, project,onClick  }) => {
  const filterValue = useSelector((state) => state?.searchedText?.PinValue);

  const { attributes, listeners, setNodeRef, transform, isDragging ,transition, } = useSortable({ id });
let data = window.localStorage.getItem(text) && JSON.parse(window.localStorage.getItem(text)) ;
const handleClick = (e) => {
  e.stopPropagation(); // Prevent event propagation
  if (onClick) {
    onClick();
  }
};
  return (
    <div
    ref={setNodeRef}
    onClick={handleClick}
  style={{
    transition,
    transform: CSS.Transform.toString(transform),
    zIndex: isDragging ? 1 : 0,
    cursor:`${filterValue== "Drag"? "grab" : "pointer"}`
  }}
  {...attributes}
  {...listeners}
>
    
       
          <div
            style={{
              padding: "24px 2px",
              width: "300px",
              margin: "2px 4px",
            }}
            className="custom-card"
          >
            <p className="projectName">{text}</p>
           
            {data ? (
  <FilterCard filteredProject={data} text={text} />
) : (
  <FilterCard filteredProject={project} text={text} />
)}
            
            
          
   
      </div>
    </div>
  );
};

const Dnd = ({ collapsed, projectsAll }) => {
  const filterValue = useSelector((state) => state?.searchedText?.PinValue);
  // const dispatch = useDispatch();
  const dataloader1 = useSelector((state) => state?.searchedText.dataloader1);
  const [items, setItems] = useState(projectsAll || []);

  useEffect(() => {
    const localItems = localStorage.getItem('items');
    if (localItems) {
      setItems(JSON.parse(localItems));
    }
  }, []); 

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragEnd = ({ active, over }) => {
    if (over && active?.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        // Update local storage during drag-and-drop
        localStorage.setItem("items", JSON.stringify(newItems));

        return newItems;
      });
    }
  };
// console.log(items,"itemsitemsitems")
const handleCardClick = () => {
};
  return (
    <div>
   {filterValue == "Drag" ?    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((card) => card.id)} preventCollision={true} strategy={verticalListSortingStrategy}>
          <div style={{ display: "flex" }}>
            {dataloader1 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                  marginLeft: "5px",
                  marginTop: "-165px",
                }}
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <p>AHMED</p>
                    <Skeleton animation="wave" width={230} height={910} />
                  </React.Fragment>
                ))}
              </div>
            ) : (

              items.map((card) =>{


                return <Card key={card.id} id={card.id} text={card.projectname} onClick={handleCardClick}project={card}/>}
                )
              
            )}
          </div>
        </SortableContext>
      </DndContext> :     <div style={{ display: "flex" }}>
            {dataloader1 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                  marginLeft: "5px",
                  marginTop: "-165px",
                }}
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <p>AHMED</p>
                    <Skeleton animation="wave" width={230} height={910} />
                  </React.Fragment>
                ))}
              </div>
            ) : (

              items.map((card) =>{


                return <Card key={card.id} id={card.id} text={card.projectname} onClick={handleCardClick}project={card}/>}
                )
              
            )}
          </div>}
    </div>
  );
};

export default Dnd;





// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from '@dnd-kit/core';
// import {
//   SortableContext,
//   verticalListSortingStrategy,
//   sortableKeyboardCoordinates, // Import sortableKeyboardCoordinates explicitly
//   useSortable,
  
// } from '@dnd-kit/sortable';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProjectDetailsAll } from './Redux/Actions/action.js';

// const Card = ({ id, text }) => {
//   const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id });

//   return (
//     <div
//       ref={setNodeRef}
//       style={{
//         padding: '8px',
//         margin: '8px',
//         border: '1px solid #ccc',
//         transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
//         zIndex: isDragging ? 1 : 'auto',
//       }}
//       {...attributes}
//       {...listeners}
//     >
//       {text}
//     </div>
//   );
// };
// const Dnd = () => {
//   const cards = [
//     { id: '1', text: 'Card 1' },
//     { id: '2', text: 'Card 2' },
//     { id: '3', text: 'Card 3' },
//     { id: '4', text: 'Card 4' },
//   ];

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );
//     const projectsAll = useSelector((state) => state?.searchedText?.projectsAll);
//     console.log(projectsAll,"projectsAll")
//   const dispatch = useDispatch();
//   const dataloader1 = useSelector((state) => state?.searchedText.dataloader1);
//   useEffect(() => {
//     dispatch(fetchProjectDetailsAll());
//   }, [dispatch]);
//   return (
//     <DndContext sensors={sensors} collisionDetection={closestCenter}>
//     {Array.isArray(projectsAll)&&  <SortableContext items={projectsAll?.map((card) => card.id)} strategy={verticalListSortingStrategy}>
//         {projectsAll?.map((card) => (
//           <Card key={card.id} id={card.id} text={card.name} />
//         ))}
//       </SortableContext>}
//     </DndContext>
//   );
// };

// export default Dnd;



// {projectsAll?.map((project, index) => (
//   <Grid item key={index}>
//     {project?.name !== undefined ? (
//       <div
//         style={{
//           padding: "24px 2px",
//           width: "300px",
//           margin: "2px 4px",
//         }}
//         className="custom-card"
//         {...attributes}
//         {...listeners}
//         onClick={() => {
//           setEditMode(true);
//         }}
//       >
//         <p className="projectName">
//           {project?.name}
//         </p>
        
//       </div>
//     ) : (
//       ""
//     )}
//   </Grid>
// )
// )
// }