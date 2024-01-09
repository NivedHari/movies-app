import React, { useState, useEffect,useCallback } from "react";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let timeoutId;

 

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }

      const data = await response.json();

      const tranformedMoves = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      setMovies(tranformedMoves);
      setIsLoading(false);
      return;
    } catch (error) {
      setError(error.message);
      timeoutId = setTimeout(() => {
        fetchMoviesHandler();
      }, 5000);
    }
  },[]);
  const cancelHandler = () => {
    clearTimeout(timeoutId);
    setIsLoading(false);
    setError(error.message);
  };

  useEffect(() => {
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section><AddMovie/></section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no Movies</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && !error && <p>Loading...</p>}
        <div>
          {isLoading && error && <p>{error}</p>}
          {error && isLoading && (
            <button onClick={cancelHandler}>Cancel</button>
          )}
        </div>
      </section>
    </React.Fragment>
  );
}

export default App;
