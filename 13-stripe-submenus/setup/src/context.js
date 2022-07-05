import React, { useState, useContext } from "react";
import sublinks from "./data";

const AppContext = React.createContext(); // creating the context api

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // define a sidebar open state
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false); // define a submenu open state
  const [location, setLocation] = useState({}); // define a location state of an object
  const [page, setPage] = useState({ page: "", links: [] }); // define a page state having an object of page and link array (coming from the sublinks array)

  const openSidebar = () => {
    setIsSidebarOpen(true);
  }; // set the sidebar open state to true

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  }; // set the sidebar close state to false

  const openSubmenu = (text, coordinate) => {
    const page = sublinks.find((link) => link.page === text); // checking to see if the page in the sublinks array is same as the text hovered on
    setPage(page); // set the page state to the returned iterated array value
    setLocation(coordinate); // set location state
    setIsSubmenuOpen(true); // set submenu open state to true
  }; // set the side open state

  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  }; // set the submenu close state to false

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        isSubmenuOpen,
        openSidebar,
        closeSidebar,
        openSubmenu,
        closeSubmenu,
        location,
        page,
      }} // adding the states and functions needed inside of the provider so that i can be easily consumed by the consumer component
    >
      {children}
    </AppContext.Provider>
  );
};

//custom context hook
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
