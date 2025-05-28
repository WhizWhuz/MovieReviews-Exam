import React from "react";
import styles from "./MovieItem.module.scss";

const MovieItem = ({ movie }) => {
  return (
    <div className={styles.movieItem}>
      <h2>{movie.title}</h2>
      <p>
        <strong>Director:</strong> {movie.director}
      </p>
      <p>
        <strong>Year:</strong> {movie.releaseYear}
      </p>
      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      {movie.averageRating && (
        <p>
          <strong>Rating:</strong> {movie.averageRating} ⭐
        </p>
      )}
    </div>
  );
};

export default MovieItem;
