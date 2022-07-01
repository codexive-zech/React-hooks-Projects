import React, { useEffect } from "react";

// destructing Alert component props added
const Alert = ({ msg, classType, removeShowAlert, groceryList }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      return removeShowAlert(); // removing the alert every 3 sec
    }, 3000);
    return () => clearTimeout(timeOut); // clearing the time out
  }, [groceryList]); // re-render the appearing a d disappearing alert based on the grocery list
  return <p className={`alert alert-${classType}`}>{msg}</p>;
};

export default Alert;
