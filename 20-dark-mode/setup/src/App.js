import React, { useState, useEffect } from "react";
import data from "./data";
import Article from "./Article";

const getStorageTheme = () => {
  let theme = "light-theme"; // default theme
  const getTheme = localStorage.getItem("theme"); // get theme in the local storage
  // checking which theme exist in the local storage
  if (getTheme) {
    theme = getTheme; // change theme to the theme found in the local storage
  }
  return theme;
}; // func get theme from local storage

function App() {
  // eslint-disable-next-line
  const [blogs, setBlogs] = useState(data); // define a blogs state
  const [theme, setTheme] = useState(getStorageTheme()); // define a theme state

  useEffect(() => {
    localStorage.setItem("theme", theme); // set up local storage for theme color style
    document.documentElement.className = theme; // set the overall html class to theme state
  }, [theme]); // re-render only when theme state changes

  const toggleTheme = () => {
    // checking theme state value
    if (theme === "light-theme") {
      setTheme("dark-theme"); // set theme state
    } else {
      setTheme("light-theme"); //set theme state
    }
  }; // func changes theme state when toggled
  return (
    <main>
      <nav className="nav-center">
        <h1>Overreacted</h1>
        <button
          className="btn"
          onClick={toggleTheme} // a toggle theme click button
        >
          Toggle
        </button>
      </nav>
      <section className="articles">
        {/* iterate over the list of blogs */}
        {blogs.map((blog) => {
          return <Article key={blog.id} {...blog} />;
        })}
      </section>
    </main>
  );
}

export default App;
