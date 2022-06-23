import React, { useState } from "react";
import data from "./data";
import List from "./List";
function App() {
  const [people, setPeople] = useState(data); //initializing the state

  const handleClear = () => {
    setPeople([]);
  }; // a handle clear func to set the people state to an empty array
  return (
    <main>
      <section className="container">
        <h3>{people.length} Birthday Today</h3>
        {/* importing the List component and adding the people state property to it */}
        <List people={people} />
        <button onClick={handleClear}>Clear All</button>
      </section>
    </main>
  );
}

export default App;
