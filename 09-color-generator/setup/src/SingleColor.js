import React, { useState, useEffect } from "react";

const SingleColor = ({ rgb, weight, index, hexColor }) => {
  const [alert, setAlert] = useState(false); // define an alert state
  const backgroundColor = rgb.join(","); // converted the returned rgb array from the Value.js library into a string separated with commas
  const hexColorValue = `#${hexColor}`; // returned a hex color of a inputted color from the Value.js library

  // a func that changes the alert state and handle add to clipboard
  const changeAlert = () => {
    setAlert(true); // set alert state to true
    navigator.clipboard.writeText(hexColorValue); // add the returned hex color value into the browser clipboard
  };

  useEffect(() => {
    const clearAlert = setTimeout(() => {
      setAlert(false);
    }, 3000); // clears the alert text after 3 sec
    return () => clearTimeout(clearAlert);
  }, [alert]); // re-render based on the alert state

  return (
    <article
      className={`color ${index > 10 ? "color-light" : null}`} //if index is bigger than 10, add the color-light class to the hex color value text
      style={{ backgroundColor: `rgb(${backgroundColor})` }} // set the bg color to the rgb array converted to string value
      onClick={changeAlert}
    >
      <p className="percentage-value">{weight}%</p>
      <p className="color-value">{hexColorValue}</p>
      {/* if alert state is true then the P text is display */}
      {alert && <p>Copied To Clipboard</p>}
    </article>
  );
};

export default SingleColor;
