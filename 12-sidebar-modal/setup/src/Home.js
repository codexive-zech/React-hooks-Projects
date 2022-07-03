import React from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Home = () => {
  const { openSidebar, openModal } = useGlobalContext(); // adding the open sidebar and open modal functionality to the consumer component
  return (
    <main>
      <button
        className="sidebar-toggle"
        onClick={openSidebar} // adding the click event to open sidebar
      >
        <FaBars />
      </button>
      <button
        className="btn"
        onClick={openModal} //adding the click event to open modal
      >
        Show Modal
      </button>
    </main>
  );
};

export default Home;
