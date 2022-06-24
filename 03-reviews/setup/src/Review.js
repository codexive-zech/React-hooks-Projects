import React, { useState } from "react";
import people from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const Review = () => {
  const [index, setIndex] = useState(0); //defining the index state
  const { id, name, job, image, text } = people[index]; //destructuring the people array and accessing info based on index

  const checkIndexNumber = (number) => {
    if (number > people.length - 1) {
      return 0;
    } else if (number === 0) {
      return people.length - 1;
    } else {
      return number;
    }
  };

  const prevPerson = () => {
    setIndex((index) => {
      let newPrevPerson = index - 1;
      return checkIndexNumber(newPrevPerson);
    });
  }; //set new index value by subbing from current index

  const nextPerson = () => {
    setIndex((index) => {
      let newNextPerson = index + 1;
      return checkIndexNumber(newNextPerson);
    });
  }; //set new index value by adding to current index

  const randomPersonIndex = () => {
    let randomPerson = Math.floor(Math.random() * people.length);
    if (randomPerson === index) {
      randomPerson = index + 1;
    }
    return setIndex(checkIndexNumber(randomPerson));
  };

  return (
    <article className="review">
      <div className="img-container">
        <img src={image} alt={name} className="person-img" />
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div>
      <h4 className="author">{name}</h4>
      <p className="job">{job}</p>
      <p className="info">{text}</p>
      <div className="button-container">
        <button className="prev-btn" onClick={prevPerson}>
          <FaChevronLeft />
        </button>
        <button className="next-btn" onClick={nextPerson}>
          <FaChevronRight />
        </button>
      </div>
      <div className="random-btn" onClick={randomPersonIndex}>
        Suprise Me
      </div>
    </article>
  );
};

export default Review;
