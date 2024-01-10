import React, { useState, useEffect, useCallback } from "react";
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
      const response = await fetch(
        "https://react-http-c2562-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
        
      }

      setMovies(loadedMovies);
      setIsLoading(false);
      return;
    } catch (error) {
      setError(error.message);
      timeoutId = setTimeout(() => {
        fetchMoviesHandler();
      }, 5000);
    }
  }, []);
  const cancelHandler = () => {
    clearTimeout(timeoutId);
    setIsLoading(false);
    setError(error.message);
  };

  
  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-http-c2562-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    fetchMoviesHandler();
    
  };
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler],movies);


  const deleteMovieHandler = (updatedMovies) => {
    setMovies(updatedMovies);
  };
  


  
  return (
    <React.Fragment>
      <section>
        <AddMovie onAdd={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && (
          <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />
        )}
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
