import React, { useRef } from "react";
import classes from "./AddMovie.module.css";

const AddMovie = (props) => {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();

    const movie = {
      id: Math.random().toString(36),
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    props.onAdd(movie);
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" ref={titleRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="opening-text">Opening Text</label>
          <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="date">Release Date</label>
          <input type="text" id="date" ref={releaseDateRef} />
        </div>
        <button>Add Movie</button>
      </form>
    </>
  );
};

export default AddMovie;
