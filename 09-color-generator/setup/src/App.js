import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [colorValue, setColorValue] = useState(""); // define a state for the color input value
  const [error, setError] = useState(false); // define a state value for the error
  const [colorList, setColorList] = useState(new Values("#f15025").all(20)); // define a state for the list of colors to be returned

  // a function that handles the form submit
  const handleColorSubmit = (e) => {
    e.preventDefault();
    try {
      const colorValues = new Values(colorValue).all(10); // define new color values from the Value.js library
      setColorList(colorValues); // set the list of colors to be returned the new color values from the Value.js library
      setColorValue(""); // set color value to an empty string
      setError(false); // set error state to false
    } catch (error) {
      setError(true); // set the error state to true
    }
  };
  return (
    <>
      <section className="container">
        <h3>Color Generator</h3>
        <form onSubmit={handleColorSubmit}>
          <input
            type="text"
            value={colorValue}
            onChange={(e) => setColorValue(e.target.value)}
            className={`${error ? "error" : null}`} // set class name to error if error state is true
            placeholder="Enter a Color"
          />
          <button type="submit" className="btn">
            Generate Color
          </button>
        </form>
      </section>
      <section className="colors">
        {/* iterating over all the list of colors values returned from the Value.js library when a specific color is inputted */}
        {colorList.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
