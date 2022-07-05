import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "./context";

const Submenu = () => {
  const {
    isSubmenuOpen,
    location,
    page: { page, links },
  } = useGlobalContext(); // brining in the states and functions form custom context api hook
  const submenuContainer = useRef(null); // define a ref hook to manipulate the DOM
  const [linkColumns, setLinkColumns] = useState("col-2"); // define a columns state for the link
  useEffect(() => {
    setLinkColumns("col-2");
    const submenu = submenuContainer.current; // getting the current node of the submenu (from useRef hook)
    const { center, bottom } = location; // destructing the location
    submenu.style.left = `${center}px`; // setting inline js styling
    submenu.style.top = `${bottom}px`; // setting inline js styling

    if (links.length === 3) {
      setLinkColumns("col-3");
    } // checking the length of the links to set up columns
    if (links.length > 3) {
      setLinkColumns("col-4");
    } // checking the length of the links to set up columns
  }, [location, links]); // re-render only when location and links dependency changes
  return (
    <aside
      className={`${isSubmenuOpen ? "submenu show" : "submenu"}`} // checking the sidebar open state to add the show class
      ref={submenuContainer} // adding the ref hook created
    >
      <h4>{page}</h4>
      <div className={`submenu-center ${linkColumns}`}>
        {/* iterating links array */}
        {links.map((link, index) => {
          const { label, icon, url } = link;
          return (
            <a href={url} key={index}>
              {icon}
              {label}
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default Submenu;
