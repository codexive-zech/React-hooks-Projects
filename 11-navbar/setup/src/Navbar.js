import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { links, socials } from "./data";
import logo from "./logo.svg";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false); // define a show links state for toggle
  const linkContainerRef = useRef(null); // define a use ref for the links container html section
  const linkRef = useRef(null); // define a use ref for the links html section

  useEffect(() => {
    const getLinkHeight = linkRef.current.getBoundingClientRect().height; //getting the height of the entire iterated links
    // checking if the show links state is true
    if (showLinks) {
      linkContainerRef.current.style.height = `${getLinkHeight}px`; // change the height of the container based on the iterated links height
    } else {
      linkContainerRef.current.style.height = `0px`; // change the height of the container to 0
    }
  }, [showLinks]); // re-render only when the show links state changes

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} alt="logo" />
          <button
            className="nav-toggle"
            onClick={() => setShowLinks(!showLinks)} // set the show links state to the opposite when bar is clicked
          >
            <FaBars />
          </button>
        </div>

        <div className="links-container" ref={linkContainerRef}>
          <ul className="links" ref={linkRef}>
            {/* iterating over the links array */}
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>

        <ul className="social-icons">
          {/* iterating from the social array */}
          {socials.map((social) => {
            const { id, url, icon } = social;
            return (
              <li key={id}>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
