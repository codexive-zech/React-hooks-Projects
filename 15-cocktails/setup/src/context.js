import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("a");
  const [cocktailList, setCocktailList] = useState([]);

  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchValue}`);
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        const newDrink = drinks.map((drink) => {
          const { idDrink, strDrink, strAlcoholic, strDrinkThumb, strGlass } =
            drink;
          return {
            id: idDrink,
            name: strDrink,
            alcoholic: strAlcoholic,
            image: strDrinkThumb,
            glass: strGlass,
          };
        });
        setCocktailList(newDrink);
      } else {
        setCocktailList([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchValue]);

  useEffect(() => {
    fetchDrinks();
  }, [searchValue, fetchDrinks]);

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
