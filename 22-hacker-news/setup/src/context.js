import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions"; // dispatch types identifier
import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?"; // end point url for hacker news api

const initialState = {
  isLoading: true,
  hits: [],
  searchQuery: "React",
  page: 0,
  nbPages: 0,
}; // initial state object (houses all the state values)

const AppContext = React.createContext(); // create a context api

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); // define the useReducer that has both state and dispatch type variable along with the reducer func and initial state object argue

  const fetchNews = async (url) => {
    dispatch({ type: SET_LOADING }); // setting a dispatch type
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      }); // setting a dispatch type and it's payload
    } catch (error) {
      console.log(error);
    }
  }; // a func tha fetches new data from the end-point

  useEffect(() => {
    fetchNews(`${API_ENDPOINT}&query=${state.searchQuery}&page=${state.page}`);
  }, [state.searchQuery, state.page]); // re-render anytime the searchQuery and the page state changes

  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id });
  }; // setting a dispatch type and it's payload to remove story

  const handleSearch = (searchQuery) => {
    dispatch({ type: HANDLE_SEARCH, payload: searchQuery });
  }; // setting a dispatch type and it's payload to change search query state

  const handlePage = (page) => {
    dispatch({ type: HANDLE_PAGE, payload: page });
  }; // setting a dispatch type and it's payload to handle page state

  return (
    <AppContext.Provider
      value={{ ...state, removeStory, handleSearch, handlePage }}
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
