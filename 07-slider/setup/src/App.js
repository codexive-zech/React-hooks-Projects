import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
function App() {
  const [people, setPeople] = useState(data); // define the people state
  const [index, setIndex] = useState(0); // define the index state

  useEffect(() => {
    let lastIndex = people.length - 1; // getting the last index of the array
    // checking to see if the next go to index is less than 0 (- 1) then set the index to the last index in the array
    if (index < 0) {
      setIndex(lastIndex);
    }
    // checking to see if the next go to index is greater than the array then set the index to 0
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]); //re-render as long as the index and people array changes

  useEffect(() => {
    // setting interval time for the slider autoplay
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    // clearing interval time for the slider autoplay
    return () => clearInterval(slider);
  }, [index]); // re-render as long as the index of the people array changes

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>Our Review
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;
          // by default all slider has this class
          let position = "nextSlide";
          // checking to see if the destructured person index array is same as the initial index then an active class is giving to that single object array
          if (personIndex === index) {
            position = "activeSlide";
          }

          // first condition moves the previous the active review to the left || second condition checks if the index is 0 and checks for the last person data in the array and then move it to the left
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article key={id} className={position}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
