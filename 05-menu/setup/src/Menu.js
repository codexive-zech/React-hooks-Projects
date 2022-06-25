import React from "react";
import SingleMenu from "./SingleMenu";

// passed in the menu component props
const Menu = ({ menu }) => {
  return (
    <section className="section-center">
      {menu.map((menuItem) => {
        // adding the iterated menu items as props
        return <SingleMenu key={menuItem.id} {...menuItem} />;
      })}
    </section>
  );
};

export default Menu;
