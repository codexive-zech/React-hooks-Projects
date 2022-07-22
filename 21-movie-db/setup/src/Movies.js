import React from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"; // no picture available url

const Movies = () => {
  const { isLoading, movieList } = useGlobalContext(); // transfer states from context api
  if (isLoading) {
    return <div className="loading"></div>;
  } // execute when loading state is true
  return (
    <section className="movies">
      {/* iterate over the movie list state */}
      {movieList.map((movie) => {
        const { imdbID: id, Poster: poster, Title: title, Year: year } = movie;
        return (
          <Link
            to={`/movies/${id}`} //href for single movie
            key={id}
          >
            <article className="movie">
              <img
                src={poster === "N/A" ? url : poster} // checking poster value to display image
                alt={title}
              />
              <div className="movie-info">
                <h4>{title}</h4>
                <p>{year}</p>
              </div>
            </article>
          </Link>
        );
      })}
    </section>
  );
};

export default Movies;
