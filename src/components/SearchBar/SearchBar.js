import React from "react";
import "../SearchBar/SearchBar.css";

function SearchBar({ searchQuery, handleSearchChange }) {
  return (
    <div className="SearchButtonContainer">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by name, email or role"
        className="SearchButton"
      />
    </div>
  );
}

export default SearchBar;
