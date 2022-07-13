import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [loading, setLoading] = useState(true); // define a loading state
  const [person, setPerson] = useState(null); // define a person object state
  const [title, setTitle] = useState("name"); // define a title state
  const [value, setValue] = useState("random person"); // define a value state

  const personImage = person && person.image; // getting the person image if true in the person object

  const handleValue = (e) => {
    // checking if the icon class exist
    if (e.target.classList.contains("icon")) {
      const dataValue = e.target.dataset.label; // getting the data set value
      setTitle(dataValue); // set title state
      setValue(person[dataValue]); // set value state
    }
  }; // func handling dynamic display of title and value state

  const getRandomPerson = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const person = data.results[0];
      if (person) {
        const { first, last } = person.name;
        const { name, number } = person.location.street;
        const { email, phone } = person;
        const { age } = person.dob;
        const { password } = person.login;
        const { large: image } = person.picture;
        const newPerson = {
          name: `${first} ${last}`,
          street: `${number}${name}`,
          email,
          phone,
          age,
          password,
          image,
        }; // created a new person object
        setPerson(newPerson); // set persons object state to new created object
        setTitle("name"); // set title state
        setValue(newPerson.name); // set value state to name from created object
      } else {
        setPerson(null);
        setTitle("name");
        setValue("Random User");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomPerson();
  }, []); // re-render only once
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={personImage || defaultImage}
            alt="random person"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={getRandomPerson}>
            {loading ? "Loading..." : "Random User"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
