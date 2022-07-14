import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, page]);

  const handlePageIndex = (index) => {
    setPage(index);
  };

  const checkIndex = (oldIndex) => {
    const lastIndex = data.length - 1;
    if (oldIndex > lastIndex) {
      return 0;
    }
    if (oldIndex < 0) {
      return lastIndex;
    }
    return oldIndex;
  };

  const handlePrevBtn = () => {
    setPage((oldPage) => {
      let newPage = oldPage - 1;
      return checkIndex(newPage);
    });
  };

  const handleNextBtn = () => {
    setPage((oldPage) => {
      let newPage = oldPage + 1;
      return checkIndex(newPage);
    });
  };

  return (
    <main>
      <section className="section-title">
        <h2> {loading ? "Loading..." : "Paginate"}</h2>
        <div className="underline"></div>
      </section>
      <section className="followers">
        <div className="container">
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />;
          })}
        </div>
        {loading ? null : (
          <div className="btn-container">
            <button className="prev-btn" onClick={handlePrevBtn}>
              Prev
            </button>
            {data.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${index === page ? "active-btn" : null}`}
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
