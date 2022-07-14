import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
function App() {
  const { loading, data } = useFetch(); // add the needed state from the custom hook
  const [page, setPage] = useState(0); // define a page index state
  const [followers, setFollowers] = useState([]); // define a followers state

  useEffect(() => {
    if (loading) return; // return nothing if loading is true
    setFollowers(data[page]); // set followers state to data received based on the page
  }, [loading, page]); // re-render when loading and page state changes

  const handlePageIndex = (index) => {
    setPage(index);
  }; // setting page state to index

  const checkIndex = (index) => {
    const lastIndex = data.length - 1;
    if (index > lastIndex) {
      return 0;
    }
    if (index < 0) {
      return lastIndex;
    }
    return index;
  }; // checking the index

  const handlePrevBtn = () => {
    setPage((oldPage) => {
      let newPage = oldPage - 1;
      return checkIndex(newPage);
    });
  }; // setting page state to a new index page reversed

  const handleNextBtn = () => {
    setPage((oldPage) => {
      let newPage = oldPage + 1;
      return checkIndex(newPage);
    });
  }; // setting page state to a new index page forward

  return (
    <main>
      <section className="section-title">
        <h2> {loading ? "Loading..." : "Paginate"}</h2>
        <div className="underline"></div>
      </section>
      <section className="followers">
        <div className="container">
          {/* iterating over the followers returned based on the page index */}
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />;
          })}
        </div>
        {/* checking if loading is true */}
        {loading ? null : (
          <div className="btn-container">
            <button className="prev-btn" onClick={handlePrevBtn}>
              Prev
            </button>
            {/* iterating over the entire data to get the new page array created from the followers received array */}
            {data.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${index === page ? "active-btn" : null}`} // active class only when the index is same as the page
                  onClick={() => handlePageIndex(index)}
                >
                  {index + 1}
                </button>
              );
            })}
            <button className="next-btn" onClick={handleNextBtn}>
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
