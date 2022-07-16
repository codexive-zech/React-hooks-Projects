import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
// const clientID =
const clientIdKey = `?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photoList, setPhotoList] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const pageUrl = `&page=${page}`;
    const queryUrl = `&query=${query}`;

    if (query) {
      url = `${searchUrl}${clientIdKey}${pageUrl}${queryUrl}`;
    } else {
      url = `${mainUrl}${clientIdKey}${pageUrl}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotoList((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    setPage(1);
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        loading
          ? null
          : window.innerHeight + window.scrollY >=
            document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            className="form-input"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="submit-btn" onClick={handleForm}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photoList.map((photo, index) => {
            return <Photo key={index} {...photo} />;
          })}
        </div>
        {loading ? <h2 className="loading">Loading ...</h2> : null}
      </section>
    </main>
  );
}

export default App;
