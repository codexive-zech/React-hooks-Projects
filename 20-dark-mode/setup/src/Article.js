import React from "react";
import moment from "moment";
// destructed props in the article array
const Article = ({ title, date, length, snippet }) => {
  return (
    <article className="post">
      <h2>{title}</h2>
      <div className="post-info">
        {/* added moment.js library */}
        <span>{moment(date).format("Do dddd MMM YYYY")}</span>
        <span>{length} Min Read</span>
      </div>
      <p>{snippet}</p>
    </article>
  );
};

export default Article;
