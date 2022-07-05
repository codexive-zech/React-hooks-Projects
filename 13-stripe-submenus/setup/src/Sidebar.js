import React from "react";
import { FaTimes } from "react-icons/fa";
import sublinks from "./data";
import { useGlobalContext } from "./context";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext(); // brining in the states and functions form custom context api hook
  return (
    <div
      className={`${
        isSidebarOpen ? "sidebar-wrapper show" : "sidebar-wrapper"
      }`} // checking the sidebar open state to add the show class
    >
      <aside className="sidebar">
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
        <div className="sidebar-links">
          {/* iterating over the overall sublinks array */}
          {sublinks.map((item, index) => {
            const { page, links } = item;
            return (
              <article key={index}>
                <h4>{page}</h4>
                <div className="sidebar-sublinks">
                  {/* iterating over the links array which is inside of the sublinks array */}
                  {links.map((link, index) => {
                    const { label, icon, url } = link;
                    return (
                      <a key={index} href={url}>
                        {icon} {label}
                      </a>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
