import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import MovieFilter from "../components/MovieFilter";
import styles from "./MovieListPage.module.scss";
import axios from "axios";

function MovieListPage() {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 25; // fixed

  useEffect(() => {
    const fetchMovies = async () => {
      const params = { page, limit };
      if (genre) params.genre = genre;
      if (sort) params.sort = sort;

      try {
        const res = await axios.get("/api/movies", { params });

        const { movies, pagination } = res.data.data;

        setMovies(movies);
        setTotalPages(pagination.totalPages);
      } catch (err) {
        if (err.response) {
          console.error("🧨 Server responded with error:", err.response.data);
        } else if (err.request) {
          console.error("🛰️ No response received:", err.request);
        } else {
          console.error("🔥 General error:", err.message);
        }
      }
    };

    fetchMovies();
  }, [genre, sort, page]);

  return (
    <>
      <MovieFilter
        genre={genre}
        setGenre={setGenre}
        sort={sort}
        setSort={setSort}
      />
      <MovieList movies={movies} />
      <div className={styles.buttonWrapper}>
        <button
          className={styles.clickBtn}
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          className={styles.clickBtn}
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default MovieListPage;
