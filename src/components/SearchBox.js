import React from "react";
import "../components/SearchBox.css";

const SearchBox = ({ ClientSearchQuery, ClientSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by name,email or role"
      value={ClientSearchQuery}
      onChange={ClientSearch}
      className="Search_Input"
    />
  );
};

export default SearchBox;
