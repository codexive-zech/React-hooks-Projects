import { useState, useEffect } from "react";
import paginate from "./utils";
const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

export const useFetch = () => {
  const [loading, setLoading] = useState(true); // define a state for loading
  const [data, setData] = useState([]); // define a state for the data

  const getProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(paginate(data)); // set data state to fetched data based on the page
    setLoading(false); // set loading to false
  };

  useEffect(() => {
    getProducts();
  }, []);
  return { loading, data };
};
