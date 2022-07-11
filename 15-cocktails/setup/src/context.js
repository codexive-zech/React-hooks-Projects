import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("a");
  const [cocktailList, setCocktailList] = useState([]);
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
