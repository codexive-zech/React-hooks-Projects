import React from "react";

// destructure the people state as the list property
const List = ({ people }) => {
  return (
    <>
      {/* iterated over all the people for the state, destructured them and return each value in it's needed placement */}
      {people.map((person) => {
        const { id, name, image, age } = person;
        return (
          <article className="person" key={id}>
            <img src={image} alt={name} />
            <div>
              <h4>{name}</h4>
              <p>{age} Year Old</p>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default List;
