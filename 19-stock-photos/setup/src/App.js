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
  const [page, setPage] = useState(1);

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const pageUrl = `&page${page}`;
    url = `${mainUrl}${clientIdKey}${pageUrl}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const newPhotoDetails = data.map((photoDetails) => {
        const { alt_description, likes, id } = photoDetails;
        const { regular } = photoDetails.urls;
        const { name, portfolio_url } = photoDetails.user;
        const { medium } = photoDetails.user.profile_image;
        return {
          id,
          alt_description,
          likes,
          regular,
          name,
          portfolio_url,
          medium,
        };
      });
      setPhotoList((oldPhotoList) => {
        return [...oldPhotoList, ...newPhotoDetails];
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    console.log("handling Form");
  };

  useEffect(() => {
    fetchImages();
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
  }, []);
  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" className="form-input" placeholder="Search" />
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
