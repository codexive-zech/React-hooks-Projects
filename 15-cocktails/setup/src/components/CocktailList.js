import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  const { loading, cocktailList } = useGlobalContext(); // define a loading state

  if (loading) {
    return <Loading />;
  } // display when loading state is true

  if (cocktailList.length < 1) {
    return <h2 className="section-title">No Cocktail Matches the Criteria</h2>;
  } //display when the length of the cocktail is less than 1
  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      {/* iterate over the cocktail list */}
      <section className="cocktails-center">
        {cocktailList.map((cocktail) => {
          return <Cocktail key={cocktail.id} {...cocktail} />;
        })}
      </section>
    </section>
  );
};

export default CocktailList;
