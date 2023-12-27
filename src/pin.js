import React, { useState } from 'react';

const YourComponent = () => {
  const [data, setData] = useState([{name:"ahmed",id:1},
  {name:"ahmed2",id:2},
  {name:"ahmed3",id:3},
  {name:"ahmed4",id:4},
  {name:"ahmed5",id:5},
  {name:"ahmed6",id:6},
  {name:"ahmed7",id:7},
  {name:"ahmed8",id:8},
  {name:"ahmed9",id:9},
  {name:"ahmed10",id:10},
  {name:"ahmed11",id:11},
  {name:"ahmed12",id:12},
  {name:"ahmed13",id:13},
  {name:"ahmed14",id:14},
  {name:"ahmed15",id:15},
  {name:"ahmed16",id:16},
    // Your array of data
    // Each item might have an 'id', 'content', and 'pinned' property
  ]);

  const handlePin = (id) => {
    const index = data.findIndex(item => item.id === id);
    const newData = [...data];

    // Check if the card is already pinned
    if (newData[index].pinned) {
      // If already pinned, unpin it
      newData[index].pinned = false;
    } else {
      // If not pinned, check if the user can pin more cards
      const pinnedCount = newData.filter(item => item.pinned).length;

      if (pinnedCount < 3) {
        // Toggle the 'pinned' property
        newData[index].pinned = true;
        // Move the pinned card to the top
        newData.unshift(newData.splice(index, 1)[0]);
      } else {
        // Display an alert if the user tries to pin more than three cards
        alert("You can only pin 3 cards at a time");
      }
    }

    setData(newData);
  };

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <p>{item.content}</p>
          <button onClick={() => handlePin(item.id)}>
            {item.pinned ? 'Unpin' : 'Pin'}
            {item.name }
          </button>
        </div>
      ))}
    </div>
  );
};

export default YourComponent;
