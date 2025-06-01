import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import MovieFilter from "./MovieListPage";
import axios from "axios";

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const params = {};
        if (genre) params.genre = genre;
        if (sort) params.sort = sort;

        const res = await axios.get("/api/movies", { params });
        setMovies(res.data.data.movies);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, [genre, sort]);

  return (
    <>
      <MovieFilter
        genre={genre}
        setGenre={setGenre}
        sort={sort}
        setSort={setSort}
      />
      <MovieList movies={movies} />
    </>
  );
};

export default MovieListPage;
