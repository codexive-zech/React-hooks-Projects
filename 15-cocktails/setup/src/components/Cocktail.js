import React from "react";
import { Link } from "react-router-dom";

// destructured value from spread op cocktail array
const Cocktail = ({ id, name, image, alcoholic, glass }) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={image} alt={name} />
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{alcoholic}</h4>
        <p>{glass}</p>
        <Link to={`/cocktail/${id}`} className="btn btn-primary btn-details">
          Details
        </Link>
      </div>
    </article>
  );
};

export default Cocktail;
