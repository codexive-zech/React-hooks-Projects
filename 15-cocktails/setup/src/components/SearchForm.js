import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchValue } = useGlobalContext();
  const searchInput = useRef(""); // define a use ref

  const changeCocktails = () => {
    setSearchValue(searchInput.current.value);
  }; // change value of the cocktail form

  const handleSubmit = (e) => {
    e.preventDefault();
  }; // handle default submission

  useEffect(() => {
    searchInput.current.focus();
  }, []);
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Search For Your Favorite Cocktails</label>
          <input
            type="text"
            id="name"
            ref={searchInput}
            onChange={changeCocktails}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
