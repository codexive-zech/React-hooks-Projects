import React from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {
  const { handleSearch, searchQuery } = useGlobalContext();

  const handleForm = (e) => {
    e.preventDefault();
  }; // a func preventing form auto server submit
  return (
    <form className="search-form" onSubmit={handleForm}>
      <h2>Search For Hacker New</h2>
      <input
        type="text"
        className="form-input"
        value={searchQuery} // identifying the search query state
        onChange={(e) => handleSearch(e.target.value)} // change the search query state
      />
    </form>
  );
};

export default SearchForm;
