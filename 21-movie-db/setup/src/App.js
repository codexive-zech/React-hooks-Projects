import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import SingleMovies from "./SingleMovie";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies/:id" element={<SingleMovies />} />
    </Routes>
  );
}

export default App;
