import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import styles from "./MovieList.module.scss";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("/api/movies");
        const data = await res.json();
        setMovies(data.movies);
      } catch (err) {
        console.error("Failed to fetch movies", err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1>🎥 Movie Library</h1>
      {movies.map((movie) => (
        <MovieItem key={movie._id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
