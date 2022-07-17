import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
// const clientID =
const clientIdKey = `?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`; // client Id (Secret Key)
const mainUrl = `https://api.unsplash.com/photos/`; // main url to fetch all photos
const searchUrl = `https://api.unsplash.com/search/photos/`; // url to fetch searched photos

function App() {
  const [loading, setLoading] = useState(false); // define a loading state when fetching data
  const [photoList, setPhotoList] = useState([]); // define a state for list of returned photos
  const [page, setPage] = useState(1); // define page state
  const [searchQuery, setSearchQuery] = useState(""); // define a search query state
  const mounted = useRef(false); // define a mounted usRef blocking initial rendering in useEffect
  const [newImages, setNewImages] = useState(false); // define a new Images state

  const fetchImages = async () => {
    setLoading(true); // set loading state
    let url;
    const pageUrl = `&page=${page}`; // define url for page
    const queryUrl = `&query=${searchQuery}`; // define url for search query

    // checking if a value exist in the search query input
    if (searchQuery) {
      url = `${searchUrl}${clientIdKey}${pageUrl}${queryUrl}`; // url to use when search query is true
    } else {
      url = `${mainUrl}${clientIdKey}${pageUrl}`; // url to use when search query is false
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotoList((oldPhotos) => {
        // checking if search query has input and page  is 1
        if (searchQuery && page === 1) {
          return data.results; // searched image data
        }
        // if search query has input
        else if (searchQuery) {
          return [...oldPhotos, ...data.results]; // previous loaded images and searched image data below
        } else {
          return [...oldPhotos, ...data]; // return previous loaded images and new images below
        }
      });
      setNewImages(false); // set new images state
      setLoading(false); // set loading state
    } catch (error) {
      setNewImages(false); // set new images state when error occur
      setLoading(false); // set loading state when error occur
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!searchQuery) return; // if search query is empty do nothing
    // checking if the page state is 1
    if (page === 1) {
      fetchImages(); // fetch images via api
      return;
    }
    setPage(1); // set page state
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]); // re-render the images fetching when page state changes

  useEffect(() => {
    // checking if Ref state value is false
    if (!mounted.current) {
      mounted.current = true; // change to true
      return;
    }
    if (!newImages) return; // do nothing when the new images state is false
    if (loading) return; // do nothing when loading state is true
    setPage((oldPage) => oldPage + 1); // set page state to addition of 1
    // eslint-disable-next-line
  }, [newImages]); // re-render when new images state changes

  const scrollEvent = () => {
    // checking the height and scroll on Y axis of the window and checking the scroll height on the entire document body
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true); // set new Images state
    }
  }; // scroll event functionality

  useEffect(() => {
    window.addEventListener("scroll", scrollEvent); // adding scroll event
    return () => window.removeEventListener("scroll", scrollEvent); // remove clean up func on the scroll event
  }, []); // add and remove scroll event on the window object

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            className="form-input"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // set search query state
          />
          <button type="submit" className="submit-btn" onClick={handleForm}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {/* iterating over the photo list array */}
          {photoList.map((photo, index) => {
            return <Photo key={index} {...photo} />;
          })}
        </div>
        {/* checking loading state to add this */}
        {loading ? <h2 className="loading">Loading ...</h2> : null}
      </section>
    </main>
  );
}

export default App;
