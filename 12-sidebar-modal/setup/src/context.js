import React, { useState, useContext } from "react";

const AppContext = React.createContext(); // defining and creating Context hook

// overall provider component and adding another child component as props
const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // define a state for open sidebar
  const [isModalOpen, setIsModalOpen] = useState(false); // define a state for modal open

  const openSidebar = () => {
    setIsSidebarOpen(true);
  }; // set open sidebar state to true

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  }; // set open sidebar state open to false

  const openModal = () => {
    setIsModalOpen(true);
  }; // set modal open state open to true

  const closeModal = () => {
    setIsModalOpen(false);
  }; // set modal open state open to false

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        isSidebarOpen,
        openModal,
        closeModal,
        openSidebar,
        closeSidebar,
      }} // adding the initial states and onclick function as object value in the context provider
    >
      {children}
    </AppContext.Provider>
  );
};

// created a custom useContext hook
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
