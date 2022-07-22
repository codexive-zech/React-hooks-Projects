import React, { useState, useContext } from "react";
import useFetch from "./useFetch";
// make sure to use https

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("batman");
  const searchUrl = `&s=${searchQuery}`;
  const { isLoading, error, data: movieList } = useFetch(searchUrl);
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
