import React from "react";
import DebounceInput from "react-debounce-input";
import { useGlobalContext } from "./context";
const SearchForm = () => {
  const { error, searchQuery, setSearchQuery } = useGlobalContext(); // transfer states from context api
  const handleMoviesSearch = (e) => {
    e.preventDefault();
  }; // movie search func
  return (
    <section className="section">
      <form className="search-form" onSubmit={handleMoviesSearch}>
        <h2>Search Form</h2>
        {/* debounce func for api call */}
        <DebounceInput
          type="text"
          className="form-input"
          minLength={1}
          debounceTimeout={500} // debounce timeout session
          value={searchQuery}
          onChange={
            (e) => setSearchQuery(e.target.value) // set search query state
          }
        />
        {/* checking if the error object show prop is true */}
        {error.show ? <div className="error">{error.msg}</div> : null}
      </form>
    </section>
  );
};

export default SearchForm;
