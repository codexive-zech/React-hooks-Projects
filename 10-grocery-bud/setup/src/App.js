import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

// a function that get grocery items form the grocery list local storage
const getLocalStorageGroceryList = () => {
  const groceryList = localStorage.getItem("groceryList"); //getting items in the grocery list local storage
  // checking if the grocery item exist in the local storage
  if (groceryList) {
    return JSON.parse(groceryList); // display it back to the browser as JSON
  } else {
    return []; // display an empty grocery list
  }
};

function App() {
  const [groceryName, setGroceryName] = useState(""); // define the initial grocery name state
  const [groceryList, setGroceryList] = useState(getLocalStorageGroceryList()); // define the final grocery list state
  const [isEditing, setIsEditing] = useState(false); //define the is editing state
  const [editID, setEditID] = useState(null); //define the edit ID state
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    classType: "",
  }); // define an object alert state housing (show, message, class name)

  // a functionality handling form submission
  const handleGrocerySubmit = (e) => {
    e.preventDefault();
    // checking if grocery name input state is empty
    if (!groceryName) {
      showAlert(true, "Please Enter a Grocery", "danger"); // setting alert object state value for NO grocery name
    }
    // checking if grocery name state exist and the is editing state is set to true
    else if (groceryName && isEditing) {
      showAlert(true, "Grocery Successfully Updated", "success"); // setting alert object state value for when grocery name exist and is editing is true
      // iterating over the grocery list state
      const newEditItem = groceryList.map((item) => {
        // checking to see if the item id is same as the editID set when clicked
        if (item.id === editID) {
          return { ...groceryList, title: groceryName }; // return all previous item in the grocery list and add the new name
        }
        return item;
      });
      setGroceryList(newEditItem); // set grocery list back to default state
      setEditID(null); // set edit id back to default state
      setIsEditing(false); // set is editing back to default state
      setGroceryName(""); // set grocery name back to default state
    } else {
      showAlert(true, "Grocery Added Successfully", "success"); // set alert object state value for when grocery new grocery item
      // creating a new grocery object
      const newItem = {
        id: new Date().getTime().toString(),
        title: groceryName,
      };
      setGroceryList([...groceryList, newItem]); // set all previous item in the grocery list and add the new grocery item
      setGroceryName("");
    }
  };

  // a function that display alert having a default param value
  const showAlert = (show = false, msg = "", classType = "") => {
    setAlert({ show, msg, classType }); // setting the alert object state accordingly
  };

  // a function that clears all grocery items
  const clearGroceryItems = () => {
    showAlert(true, "Grocery List Cleared Successfully", "success"); // set alert object state values when the clear button is clicked
    setGroceryList([]); // set the grocery list to empty array
  };

  // a function that remove grocery item
  const removeGroceryItem = (id) => {
    const removeGrocery = groceryList.filter((grocery) => grocery.id !== id); // filter out the one whose grocery id is not same when clicked and return
    setGroceryList(removeGrocery);
    showAlert(true, "Grocery Item Removed", "danger"); // set alert object state values when the delete grocery button is clicked
  };

  // a function that edit grocery item
  const editGroceryItem = (id) => {
    const specificItem = groceryList.find((item) => item.id === id); // find grocery whose grocery id are the same
    setIsEditing(true); // set is editing to true
    setEditID(id); // set edit ID state to the id of the grocery item clicked
    setGroceryName(specificItem.title); // set the grocery state name to the name of the grocery item found
  };

  useEffect(() => {
    localStorage.setItem("groceryList", JSON.stringify(groceryList)); // setting up the local storage to add the items in the grocery list into
  }, [groceryList]); // re-render based on the grocery list changes

  return (
    <section className="section-center">
      {/* Beginning of form  */}
      <form className="grocery-form" onSubmit={handleGrocerySubmit}>
        {/* show alert only when alert state is true */}
        {alert.show && (
          <Alert
            {...alert} // adding the entire alert object state values into the alert component as props
            removeShowAlert={showAlert} // adding a remove alert functionality into the alert component as props
            groceryList={groceryList} // adding grocery list state into the alert component as props for useEffect hook re-rendering
          />
        )}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g bread"
            value={groceryName} // getting the grocery state name
            onChange={(e) => setGroceryName(e.target.value)} // changing the grocery name state value
          />
          <button className="submit-btn" type="submit">
            {/* change button text based on is editing state */}
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {/* End of form  */}

      {/* Grocery List */}
      {/* if the groceries value are more than 0 display list component */}
      {groceryList.length > 0 && (
        <div className="grocery-container">
          <List
            items={groceryList} // adding the grocery list state values into the grocery list as props
            removeGroceryItem={removeGroceryItem} // adding a remove grocery item functionality into the list component as props
            editGroceryItem={editGroceryItem} // adding a edit grocery item functionality into the list component as props
          />
          <button
            type="submit"
            className="clear-btn"
            onClick={clearGroceryItems}
          >
            Clear Item
          </button>
        </div>
      )}
      {/* End of Grocery List */}
    </section>
  );
}

export default App;
