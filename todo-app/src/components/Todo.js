import React, { useState, useEffect } from 'react';
import '../components/styles.css';

export const Todo = () => {
  const [formData, setFormData] = useState({
    work: '',
    date: '',
  });
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const storedItems = localStorage.getItem('todoItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
     
    }
  }, []);

  // Save items to local storage whenever items state changes
  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(items));
   
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newError = {};

    if (!formData.work) newError.work = 'Field required';
    if (!formData.date) newError.date = 'Field required';

    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setItems([...items, formData]);
      setFormData({
        work: '',
        date: '',
      });
      setErrors({});
    }
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='todo-form'>
        <input 
          type="text" 
          name="work" 
          value={formData.work} 
          onChange={handleChange} 
          placeholder="Add your task" 
        />
        {errors.work && <span className='error'>{errors.work}</span>}
        
        <input 
          type="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
        />
        {errors.date && <span className='error'>{errors.date}</span>}
        
        <button type="submit" className='button'>Add</button>
      </form>

      <div className="history">
        <h1>Work to do</h1>
        <ol className='todo-list'>
          {items.map((item, index) => (
            <li key={index} className='todo-item'>
              <div>{item.work}</div>
              <div>{item.date}</div>
              <button onClick={() => handleDelete(index)} className='button completed'>Completed</button>
            </li>
          ))}
        </ol>
        
        {items.length > 0 && (
          <button onClick={clearItems} className='button clear-button'>Clear All</button>
        )}
      </div>
    </div>
  );
};
