const Movie = require("../models/Movie");

exports.addMovie = async (req, res) => {
  const { title, director, releaseYear, genre } = req.body;

  if (!title || !director || !releaseYear || !genre) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const movie = await Movie.create({
      title,
      director,
      releaseYear,
      genre,
    });
    res.status(200).json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.error("Couldn't add movie: ", err);
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(201).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, director, releaseYear, comment } = req.body;
  try {
    const movie = await Movie.findByIdAndUpdate(
      id,
      title,
      director,
      releaseYear,
      comment,
      {
        new: true,
      }
    );
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) return res.status(404).json({ message: "Movie not found!" });
    res.json({ message: "Movie deleted!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Couldn't delete movie.", error: err.message });
  }
};
