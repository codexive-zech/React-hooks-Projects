import React, { useEffect, useState, useCallback } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cocktail, setCocktail] = useState(null);

  const fetchSingleDrink = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${id}`);
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        const {
          strDrink: name,
          strAlcoholic: alcoholic,
          strDrinkThumb: image,
          strGlass: glass,
          strInstructions: instructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = drinks[0];

        const Ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ];
        const newSingleCocktailDetails = {
          name,
          image,
          alcoholic,
          glass,
          instructions,
          Ingredients,
        };
        setCocktail(newSingleCocktailDetails);
      } else {
        setCocktail(null);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSingleDrink();
  }, [id, fetchSingleDrink]);

  if (loading) {
    return <Loading />;
  }

  if (!cocktail) {
    return (
      <h2 className="section-title">No Details Available For This Drink</h2>
    );
  }
  const { name, image, alcoholic, glass, instructions, Ingredients } = cocktail;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        Back Home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">Name : </span>
            {name}
          </p>
          <p>
            <span className="drink-data">alcoholic : </span>
            {alcoholic}
          </p>
          <p>
            <span className="drink-data">glass : </span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instruction : </span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">Ingredients : </span>
            {Ingredients.map((Ingredient, index) => {
              return Ingredient ? <span key={index}>{Ingredient}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
