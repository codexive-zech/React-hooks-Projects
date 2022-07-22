import React from "react";
import DebounceInput from "react-debounce-input";
import { useGlobalContext } from "./context";
const SearchForm = () => {
  const { error, searchQuery, setSearchQuery } = useGlobalContext();
  const handleMoviesSearch = (e) => {
    e.preventDefault();
  };
  return (
    <section className="section">
      <form className="search-form" onSubmit={handleMoviesSearch}>
        <h2>Search Form</h2>
        <DebounceInput
          type="text"
          className="form-input"
          minLength={1}
          debounceTimeout={500}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {error.show ? <div className="error">{error.msg}</div> : null}
      </form>
    </section>
  );
};

export default SearchForm;
