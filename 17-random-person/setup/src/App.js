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
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  const personImage = person && person.image;

  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      const dataValue = e.target.dataset.label;
      setTitle(dataValue);
      setValue(person[dataValue]);
    }
  };

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
        };
        setPerson(newPerson);
        setTitle("name");
        setValue(newPerson.name);
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
  }, []);
  // const { name, email, age, street, phone, password } = person;
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
