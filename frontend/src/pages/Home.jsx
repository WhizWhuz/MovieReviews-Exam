import styles from "./Home.module.scss";
import MovieList from "../components/MovieList";

function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎬 Welcome to FilmDojo</h1>
      <MovieList />
    </div>
  );
}

export default Home;
