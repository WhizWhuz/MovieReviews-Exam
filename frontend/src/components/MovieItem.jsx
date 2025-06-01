import React, { useState } from "react";
import styles from "./MovieItem.module.scss";

const MovieItem = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.movieCard} onClick={() => setShowModal(true)}>
      <h3>{movie.title}</h3>
      <p>
        {movie.genre} ({movie.releaseYear})
      </p>
      <p>⭐ {movie.averageRating || "N/A"}</p>

      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div className={styles.modalContent}>
            <h1>{movie.title}</h1>
            <div>
              <h3>Director:</h3>
              <h3>{movie.director}</h3>
            </div>
            <div>
              <h3>Genre:</h3>
              <h3>{movie.genre}</h3>
            </div>
            <p>{movie.description || "No description available."}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieItem;
