import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  const { loading, cocktailList } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }

  if (cocktailList.length < 1) {
    return <h2 className="section-title">No Cocktail Matches the Criteria</h2>;
  }
  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      <section className="cocktails-center">
        {cocktailList.map((cocktail) => {
          return <Cocktail key={cocktail.id} {...cocktail}/>
        })}
      </section>
    </section>
  );
};

export default CocktailList;
