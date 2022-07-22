import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "./useFetch";
const imageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const SingleMovie = () => {
  const { id } = useParams();
  const singleMovieUrl = `&i=${id}`;
  const { isLoading, error, data: movie } = useFetch(singleMovieUrl);

  if (isLoading) {
    return <div className="loading"></div>;
  }
  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          Back To Movies
        </Link>
      </div>
    );
  }
  const {
    Poster: poster,
    Title: title,
    Year: year,
    Plot: plot,
    Type: type,
  } = movie;
  return (
    <section className="single-movie">
      <img src={poster === "N/A" ? imageUrl : poster} alt={title} />
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
