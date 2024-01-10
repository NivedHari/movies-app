import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {

  const deleteMovieHandler = async (id) => {
    try {
      await fetch(
        `https://react-http-c2562-default-rtdb.firebaseio.com/movies/${id}.json`,
        {
          method: "DELETE",
        }
      );
      const updatedMovies = props.movies.filter(movie => movie.id !== id);
      props.onDeleteMovie(updatedMovies);
    } catch (error) {
      console.error("Error deleting the movie:", error);
    }
  };
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onDelete={deleteMovieHandler}
        />
      ))}
    </ul>
  );
};

export default MovieList;
