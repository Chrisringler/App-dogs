import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogByName } from '../../redux/actions';
import "./SearchBar.css"

const SearchBar = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name);
  const [dogName, setDogName] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (event) => {
    setDogName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getDogByName(dogName));
    setShowResult(true);
    setDogName('');
  };

  const handleClear = (event) => {
    event.preventDefault();
    setShowResult(false);
  };

  return (
    <form className='SearchBar' onSubmit={handleSubmit}>
    <div className="search-container">
      <input className="input" type="text" value={dogName} onChange={handleInputChange} placeholder="Enter Dog Name" />
      <button type="submit">Search</button>
    </div>
  
    {showResult && name && name.name && (
      <div className="card">
        <button className="clear-button" onClick={handleClear}>x</button>
        <div className='face front'>
          <img src={name.image} alt={name.name} />
          <h2 className='title'>{name.name}</h2>
        </div>
        <div className='face back'>
          <h2>{name.name}</h2>
          <p>temperaments: {name.temperament}</p>
          <p>weight: {name.weight}</p>
        </div>
      </div>
    )}
  </form>
  );
};

export default SearchBar;
