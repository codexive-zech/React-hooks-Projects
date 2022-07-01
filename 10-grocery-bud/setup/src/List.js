import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
// destructing List component props added
const List = ({ items, removeGroceryItem, editGroceryItem }) => {
  return (
    <div className="grocery-list">
      {/* iterating over the entire grocery list item to return single grocery item */}
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                className="edit-btn"
                onClick={() => editGroceryItem(id)} // a click that handles editing of grocery items
              >
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                onClick={() => removeGroceryItem(id)} // a click that handles deleting of grocery items
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
