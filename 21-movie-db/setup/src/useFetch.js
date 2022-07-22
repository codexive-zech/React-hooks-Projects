import { useState, useEffect } from "react";
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`; // api end point and secret key

const useFetch = (urlParam) => {
  const [isLoading, setIsLoading] = useState(true); // define a loading state
  const [data, setData] = useState(null); // define a data state
  const [error, setError] = useState({ show: false, msg: "" }); // define an error object state

  const fetchMovies = async (url) => {
    setIsLoading(true); // set loading state to true
    try {
      const response = await fetch(url);
      const data = await response.json();
      // checking if the data Response is "True"
      if (data.Response === "True") {
        setData(data.Search || data); // set data state to either the data been searched for or the single data object
        setError({ show: false, msg: "" }); // set an error object state
      } else {
        setError({ show: true, msg: data.Error }); // set an error object state
      }
      setIsLoading(false); // set loading
    } catch (error) {
      setIsLoading(false);
    }
  }; // fetch movies func

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}${urlParam}`); // fetch movies based on the url param
  }, [urlParam]); // re-render the data fetch anytime the url param changes

  return {
    isLoading,
    data,
    error,
  }; // return the state's as object
};

export default useFetch;
