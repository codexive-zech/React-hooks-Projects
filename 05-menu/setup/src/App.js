import React, { useState } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";

const allCategories = ["all", ...new Set(items.map((item) => item.category))]; //getting all unique category

function App() {
  const [menu, setMenu] = useState(items); // defining the state value for the menu
  const [categories, setCategories] = useState(allCategories); // define categories state value

  // filtering by categories
  const filterByCategory = (category) => {
    if (category === "all") {
      setMenu(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenu(newItems);
  };
  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h3>Our Menu</h3>
          <div className="underline"></div>
        </div>
        {/* adding the categories state and the filter by category function as props */}
        <Categories
          categories={categories}
          filterByCategory={filterByCategory}
        />
        {/* adding menu state as props */}
        <Menu menu={menu} />
      </section>
    </main>
  );
}

export default App;
