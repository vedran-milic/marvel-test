import React from 'react';
import './search-bar.css';

export const SearchBar = (props) => {
  return (
    <div className="search-bar">
      <h1>Marvel hero search</h1>
      <input type="text" placeholder="Enter hero name" onChange={props.search}/>
    </div>
  );
};

export default SearchBar;