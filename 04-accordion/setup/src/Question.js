import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const Question = ({ title, info }) => {
  const [showInfo, setShowInfo] = useState(false); //define state for show info
  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  }; //update the show info state on a click to the opposite
  return (
    <article className="question">
      <header>
        <h4>{title}</h4>
        <button className="btn" onClick={handleShowInfo}>
          {/* if show info state is true then display the minus else display plus */}
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {/* show info data only if info is true */}
      {showInfo && <p> {info}</p>}
    </article>
  );
};

export default Question;
