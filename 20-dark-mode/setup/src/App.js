import React, { useState, useEffect } from "react";
import data from "./data";
import Article from "./Article";

const getStorageTheme = () => {
  let theme = "light-theme";
  const getTheme = localStorage.getItem("theme");
  if (getTheme) {
    theme = getTheme;
  }
  return theme;
};

function App() {
  // eslint-disable-next-line
  const [blogs, setBlogs] = useState(data);
  const [theme, setTheme] = useState(getStorageTheme());

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme;
  }, [theme]);
  const toggleTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };
  return (
    <main>
      <nav className="nav-center">
        <h1>Overreacted</h1>
        <button className="btn" onClick={toggleTheme}>
          Toggle
        </button>
      </nav>
      <section className="articles">
        {blogs.map((blog) => {
          return <Article key={blog.id} {...blog} />;
        })}
      </section>
    </main>
  );
}

export default App;
