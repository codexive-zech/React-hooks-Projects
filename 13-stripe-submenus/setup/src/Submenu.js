import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "./context";

const Submenu = () => {
  const {
    isSubmenuOpen,
    location,
    page: { page, links },
  } = useGlobalContext();
  const submenuContainer = useRef(null);
  const [linkColumns, setLinkColumns] = useState("col-2");
  useEffect(() => {
    setLinkColumns("col-2");
    const submenu = submenuContainer.current;
    const { center, bottom } = location;
    submenu.style.left = `${center}px`;
    submenu.style.top = `${bottom}px`;

    if (links.length === 3) {
      setLinkColumns("col-3");
    }
    if (links.length > 3) {
      setLinkColumns("col-4");
    }
  }, [location, links]);
  return (
    <aside
      className={`${isSubmenuOpen ? "submenu show" : "submenu"}`}
      ref={submenuContainer}
    >
      <h4>{page}</h4>
      <div className={`submenu-center ${linkColumns}`}>
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
