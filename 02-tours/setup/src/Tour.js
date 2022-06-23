import React, { useState } from "react";

const Tour = ({ id, name, image, info, price, removeTour }) => {
  const [readMore, setReadMore] = useState(false); //define the use state for read more
  const handleReadMoreClick = () => {
    setReadMore(!readMore); //set read more state value as the opposite of initial state
  }; // a func handling the read more button
  return (
    <article className="single-tour">
      <img src={image} alt={name} />
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">{price}</h4>
        </div>
        <p>
          {/* if read more state is true then fetch the info data else let the returned info value be between 0 and 290*/}
          {readMore ? info : `${info.substring(0, 290)}...`}
          <button onClick={handleReadMoreClick}>
            {/* if read more state is true then display show less else display show more */}
            {readMore ? "show less" : "show more..."}
          </button>
        </p>
        <button className="delete-btn" onClick={() => removeTour(id)}>
          Not Interested
        </button>
      </footer>
    </article>
  );
};

export default Tour;
