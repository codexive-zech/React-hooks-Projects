import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "./useFetch";
const imageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"; // no picture available url

const SingleMovie = () => {
  const { id } = useParams(); // picking each id
  const singleMovieUrl = `&i=${id}`; // single movie url defined
  const { isLoading, error, data: movie } = useFetch(singleMovieUrl); // transfer states from the custom hook and add the url param argument

  if (isLoading) {
    return <div className="loading"></div>;
  } // execute when loading state is true
  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          Back To Movies
        </Link>
      </div>
    );
  } // execute when error object show prop is true
  const {
    Poster: poster,
    Title: title,
    Year: year,
    Plot: plot,
    Type: type,
  } = movie; // define the movie state object (destructure the needed properties form the api)
  return (
    <section className="single-movie">
      <img
        src={poster === "N/A" ? imageUrl : poster} // checking poster value to display image
        alt={title}
      />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <p>{plot}</p>
        <p style={{ fontWeight: "bold" }}>{type}</p>
        <h4>{year}</h4>
        <Link to="/" className="btn">
          Back To Movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
