import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleGrocerySubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //display alert
    } else if (name && isEditing) {
      //do edit
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  return (
    <section className="section-center">
      {/* Beginning of form  */}
      <form className="grocery-form" onSubmit={handleGrocerySubmit}>
        <h3>Grocery Bud</h3>
        {alert.show && <Alert />}
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g bread"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "Editing" : "Submit"}
          </button>
        </div>
      </form>
      {/* End of form  */}

      {/* Grocery List */}
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} />
          <button type="submit" className="clear-btn">
            Clear Item
          </button>
        </div>
      )}
      {/* End of Grocery List */}
    </section>
  );
}

export default App;
