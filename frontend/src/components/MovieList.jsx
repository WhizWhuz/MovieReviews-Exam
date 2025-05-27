import styles from "./MovieList.module.scss";

function MovieList() {
  return (
    <div className={styles.list}>
      <div className={styles.movie}>🎥 Blade of the Eternal</div>
      <div className={styles.movie}>🎥 Dreams in Kyoto</div>
    </div>
  );
}

export default MovieList;
