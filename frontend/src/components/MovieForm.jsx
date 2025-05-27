import { useState } from "react";
import styles from "./MovieForm.module.scss";

function MovieForm() {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    releaseYear: "",
    genre: "",
  });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(movie),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Movie added successfully!");
        setMovie({ title: "", director: "", releaseYear: "", genre: "" });
      } else {
        alert(data.message || "Failed to add movie.");
      }
    } catch (err) {
      console.error("Error adding movie:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={movie.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="director"
        placeholder="Director"
        value={movie.director}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="releaseYear"
        placeholder="Release Year"
        value={movie.releaseYear}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={movie.genre}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Movie</button>
    </form>
  );
}

export default MovieForm;
