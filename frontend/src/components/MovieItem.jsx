import styles from "./MovieItem.module.scss";

const MovieItem = ({ movie, onSelect }) => {
  return (
    <div className={styles.movieCard} onClick={() => onSelect(movie)}>
      <h3>{movie.title}</h3>
      <p>
        {movie.genre} ({movie.releaseYear})
      </p>
      <p>⭐ {movie.averageRating || "N/A"}</p>
    </div>
  );
};

export default MovieItem;
