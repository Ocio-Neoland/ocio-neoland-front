import './SearchBar.css';

import React from 'react';

const SearchBar = () => {
  return (
    <div className="search">
      <input type="text" className="searchTerm" placeholder="¿Qué quieres hacer hoy?" />
      <button type="submit" className="searchButton">
        <i className="fa fa-search" />
      </button>
    </div>
  );
};

export default SearchBar;