import React from "react";
import logo from "./logo.svg";
import { FaTimes } from "react-icons/fa";
import { social, links } from "./data";
import { useGlobalContext } from "./context";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext(); // adding the sidebar open state and the close sidebar functionality to the consumer component
  return (
    <aside
      className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`} // checking the sidebar open state to define the class name
    >
      <div className="sidebar-header">
        <img src={logo} className="logo" alt="coding-addict" />
        <button
          className="close-btn"
          onClick={closeSidebar} // adding the click event to close sidebar
        >
          <FaTimes />
        </button>
      </div>
      <ul className="links">
        {/* iterating over links */}
        {links.map((link) => {
          const { id, url, text, icon } = link;
          return (
            <li key={id}>
              <a href={url}>
                {icon} {text}
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="social-icons">
        {/* iterating over socials */}
        {social.map((icons) => {
          const { id, url, icon } = icons;
          return (
            <li key={id}>
              <a href={url}>{icon}</a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
