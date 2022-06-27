import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";
function App() {
  const [loading, setLoading] = useState(true); //define the loading state
  const [jobs, setJobs] = useState([]); // define the jobs state
  const [value, setValue] = useState(0); // define the value state

  // a functionality that fetch data
  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setJobs(data); // set the jobs state to the returned json data
    setLoading(false); // set the loading state to false
  };

  useEffect(() => {
    fetchData(); // rendered fetchData func once
  }, []);

  // display this only if loading is true
  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );
  }
  // destructured the new jobs state since the fetch func has occurred
  const { dates, duties, company, title } = jobs[value];
  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {/* iterate over the jobs array to return each company */}
          {jobs.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => setValue(index)} // set the new value state as the index
                className={`job-btn ${index === value && "active-btn"}`} // make active-btn class possible as long as index and value are same
              >
                {item.company}
              </button>
            );
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {/* iterate over the list of duties array to display each of them */}
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}
export default App;
