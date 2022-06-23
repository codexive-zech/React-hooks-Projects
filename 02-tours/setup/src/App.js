import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
function App() {
  const [isLoading, setIsLoading] = useState(true); //define the use state for loading
  const [tours, setTours] = useState([]); //define the use state for tours

  // functionality for removing tour from the list
  const removeTour = (id) => {
    // filter through the tours list
    const newTour = tours.filter((tour) => tour.id !== id);
    setTours(newTour); //set new filtered value for tour
  };

  // functionality fetching data
  const fetchTours = async () => {
    setIsLoading(true); //set loading state to still true
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setIsLoading(false); //set loading state to false (Loading Disappear)
      setTours(tours); //set tour value to the new fetched data
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTours(); //invoking the fetchTour func as a side effect
  }, []);
  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <section className="title">
          <h3>No To Left</h3>
          <button className="btn" onClick={fetchTours}>
            Fetch Tours Back
          </button>
        </section>
      </main>
    );
  }
  return (
    <>
      <Tours tours={tours} removeTour={removeTour} />
    </>
  );
}

export default App;
