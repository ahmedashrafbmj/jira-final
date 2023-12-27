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
//       {!dataloader1 && Array.isArray(projectsAll?.projectData) && (
//        <SortableContext items={projectsAll?.projectData?.map((card) => card.key)} strategy={verticalListSortingStrategy}>
//         {projectsAll?.projectData?.map((card) => (
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
//       <SortableContext items={Array.isArray(projectsAll?.projectData) &&projectsAll?.projectData?.map((card) => card.key)} strategy={verticalListSortingStrategy}>
//         {!dataloader1 ? Array.isArray(projectsAll?.projectData) && projectsAll?.projectData?.map((card) => (
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
  import { useDispatch, useSelector } from 'react-redux';
  import { fetchAssgineeAll, fetchProjectDetails, fetchProjectDetailsAll } from './Redux/Actions/action.js';
  import './style.css';
  import { Box, Grid, CircularProgress } from '@mui/material'; // Import CircularProgress for loading
  import BoardCards from './components/boardCards.js';
  import { Skeleton } from 'antd';
  
  const Card = ({ id, text, project,assignee }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id });
    console.log("rerendering component")
    return (
      <div
        ref={setNodeRef}
        style={{
          padding: '0px',
          margin: '0px',
          transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
          zIndex: isDragging ? 1 : 'auto',
        //   cursor: 'grab',
        }}
        {...attributes}
        {...listeners}
      >
        <div
          item
          key={id}
          style={{
            padding: '0',
            margin: '0',
          }}
        >
          
          <div
            style={{
              padding: "24px 2px",
              width: "300px",
              margin: "2px 4px",
            }}
            className="custom-card"
          >
            
            <div style={{display:"flex",justifyContent:"space-between"}}>

            <p className="projectName">{text}</p>
            <p className="projectName">{assignee}</p>
            </div>
              <BoardCards project={project} text={text} assignee={assignee}  />
              {/* <h1>Ahmed</h1> */}
            </div>
         
        </div>
      </div>
    );
  };
  
  const DndAssignee = ({ collapsed, projectsAll }) => {
    const filterValue = useSelector((state) => state?.searchedText?.PinValue);
    // const dispatch = useDispatch();
    const dataloader1 = useSelector((state) => state?.searchedText.dataloader1);
    const [items, setItems] = useState(projectsAll || []);
  console.log(items,"itemsitemsitems")
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
    const getUniqueItemId = (card) => `${card.name}-${card.assignee}`;

    const handleDragEnd = ({ active, over }) => {
      if (over && active?.id !== over?.id) {
        setItems((items) => {
          const oldIndex = items.findIndex((item) => getUniqueItemId(item) === active.id);
          const newIndex = items.findIndex((item) => getUniqueItemId(item) === over.id);
  
          const newItems = arrayMove(items, oldIndex, newIndex);
          localStorage.setItem("items", JSON.stringify(newItems));
          return newItems;
        });
      }
    };
  
    return (
      <div>
        {filterValue == "Drag" ? (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(getUniqueItemId)} strategy={verticalListSortingStrategy}>
        <div style={{ display: "flex" }}>
          {items.map((card, i) => (
            <Card key={getUniqueItemId(card)} id={getUniqueItemId(card)} text={card.name} project={card} assignee={card.assignee} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
        ) : (
          <div style={{ display: "flex" }}>
            {items?.map((card, i) => {
              console.log("ruuning map")
              return(
            <Card key={getUniqueItemId(card)} id={getUniqueItemId(card)} text={card.name} project={card} assignee={card.assignee} />
            )})}
          </div>
        )}
      </div>
    );
  };
  
  
  export default DndAssignee
  
  
  
  
  
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
  //     const projectsAll = useSelector((state) => state?.searchedText?.projectsAll?.projectData);
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
  
  
  
  // {projectsAll?.projectData?.map((project, index) => (
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