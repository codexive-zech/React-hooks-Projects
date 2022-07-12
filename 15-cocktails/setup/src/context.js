import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="; //url to fecth all cocktails
const AppContext = React.createContext(); // creating a use context api

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); //define a loading state to true
  const [searchValue, setSearchValue] = useState("a"); // define a search value state
  const [cocktailList, setCocktailList] = useState([]); // define a cocktail list state

  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchValue}`);
      const data = await response.json(); // fetched data and got a json
      const { drinks } = data;
      // checking to see if destructed drinks name from the api exist
      if (drinks) {
        const newDrink = drinks.map((drink) => {
          const { idDrink, strDrink, strAlcoholic, strDrinkThumb, strGlass } =
            drink; // iterate over all the drinks and pull out above info
          // returned all data
          return {
            id: idDrink,
            name: strDrink,
            alcoholic: strAlcoholic,
            image: strDrinkThumb,
            glass: strGlass,
          };
        });
        setCocktailList(newDrink); // set cocktail list to the iterated drinks
      } else {
        setCocktailList([]); // if no cocktail list exist make it an empty array
      }
      setLoading(false); // set loading state
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchValue]); // search value dependency array based on useCallback optimization

  useEffect(() => {
    fetchDrinks(); // invoking the func
  }, [searchValue, fetchDrinks]); // implement useEffect when both search value and fetch drinks re-render

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        searchValue,
        setSearchValue,
        cocktailList,
        setCocktailList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
