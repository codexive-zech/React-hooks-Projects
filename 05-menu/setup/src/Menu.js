import React from "react";
import SingleMenu from "./SingleMenu";

const Menu = ({ menu }) => {
  return (
    <section className="section-center">
      {menu.map((menuItem) => {
        return <SingleMenu key={menuItem.id} {...menuItem} />;
      })}
    </section>
  );
};

export default Menu;
