import React, { useState } from 'react';

const Names = ['Steve', 'Mwaniki', 'Wanjohi'];

function Remove() {
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (Names.length > 0) {
      setItems([...items, Names.shift()]);
    }
  };

  const removeItem = (indexToRemove) => {
    const newItems = items.filter((item, index) => index !== indexToRemove);
    setItems(newItems);
  };

  return (
    <div>
      <button onClick={addItem}>Add</button>
      {items.map((name, index) => (
        <div key={index}>
          {name}
          <button onClick={() => removeItem(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default Remove;
