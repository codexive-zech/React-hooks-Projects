import React from "react";
import { useGlobalContext } from "./context";

const SearchForm = () => {
  const { handleSearch, searchQuery } = useGlobalContext();
  const handleForm = (e) => {
    e.preventDefault();
  };
  return (
    <form className="search-form" onSubmit={handleForm}>
      <h2>Search For Hacker New</h2>
      <input
        type="text"
        className="form-input"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;
