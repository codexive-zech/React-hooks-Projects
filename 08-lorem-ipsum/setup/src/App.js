import React, { useState } from "react";
import data from "./data";
function App() {
  const [count, setCount] = useState(0); // define the input number count state
  const [text, setText] = useState([]); // define the text array state

  const handleSubmit = (e) => {
    e.preventDefault();
    let paragraphNumber = parseInt(count); // converted the paragraph number {count} from string to number
    const lastIndex = data.length - 1; // get the last index of the data array
    // checking to see if the input count value is less than 1 then return 1 paragraph
    if (count <= 0) {
      paragraphNumber = 1;
    }
    // checking to see if the input count value is bigger than the last text data in the array then return the entire number of paragraph in the data array
    else if (count > lastIndex) {
      paragraphNumber = lastIndex;
    }
    setText(data.slice(0, paragraphNumber)); // return new copy of the array and select items from the start to the end
  };

  return (
    <section className="section-center">
      <h3>Tired of Boring Lorem Ipsum</h3>
      <form className="lorem-form" onSubmit={handleSubmit}>
        <label htmlFor="amount">Paragraph</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={count} // initial count state value
          onChange={(e) => setCount(e.target.value)} // changing the input value of count
        />
        <button type="submit" className="btn">
          Generate
        </button>
      </form>
      <article className="lorem-text">
        {/* iterating over all the return text in the data array when the submit func is clicked */}
        {text.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </article>
    </section>
  );
}

export default App;
