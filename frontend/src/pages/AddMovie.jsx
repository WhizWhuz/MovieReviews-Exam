import styles from "./AddMovie.module.scss";
import MovieForm from "../components/MovieForm.jsx";

function AddMovie() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🎬 Add a New Movie</h2>
      <MovieForm />
    </div>
  );
}

export default AddMovie;
