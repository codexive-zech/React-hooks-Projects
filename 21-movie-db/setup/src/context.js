import React, { useState, useContext } from "react";
import useFetch from "./useFetch";
// make sure to use https

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("batman"); //define a search query state
  const searchUrl = `&s=${searchQuery}`; // search url defined
  const { isLoading, error, data: movieList } = useFetch(searchUrl); // transfer states from the custom hook and add the url param argument
  return (
    <AppContext.Provider
      value={{ isLoading, movieList, error, searchQuery, setSearchQuery }}
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
