const Movie = require("../models/Movie");
const sendSuccess = require("../utils/sendSuccess");
const sendError = require("../utils/sendError");

//* POST - Add a movie
exports.addMovie = async (req, res) => {
  const { title, director, releaseYear, genre } = req.body;

  if (!title || !director || !releaseYear || !genre || !description) {
    return sendError(res, 500, "Missing required fields.");
  }
  try {
    const movie = await Movie.create({
      title,
      director,
      releaseYear,
      genre,
      description,
    });
    return sendSuccess(res, 201, { movie });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

//? GET - Get all movies
exports.getMovies = async (req, res) => {
  try {
    const { genre, sort, title } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;

    const matchStage = {};
    if (genre) matchStage.genre = { $in: [genre] };
    if (title) matchStage.title = { $regex: title, $options: "i" };

    const total = await Movie.countDocuments(matchStage);

    const movies = await Movie.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "movieId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          averageRating: {
            $ifNull: [{ $avg: "$reviews.rating" }, 0],
          },
        },
      },
      {
        $project: {
          title: 1,
          director: 1,
          releaseYear: 1,
          genre: 1,
          averageRating: { $round: ["$averageRating", 1] },
          description: 1,
        },
      },
      ...(sort === "rating"
        ? [{ $sort: { averageRating: -1 } }]
        : sort === "year"
        ? [{ $sort: { releaseYear: -1 } }]
        : []),
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);

    return sendSuccess(res, 200, "Movies fetched", {
      data: {
        movies,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

//^ PUT - Update movie
exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, director, releaseYear, comment } = req.body;
  try {
    const updatedFields = {};
    if (title !== undefined) updatedFields.title = title;
    if (director !== undefined) updatedFields.director = director;
    if (releaseYear !== undefined) updatedFields.releaseYear = releaseYear;
    if (comment !== undefined) updatedFields.comment = comment;

    const movie = await Movie.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!movie) return sendError(res, 404, "Movie not found");
    return sendSuccess(res, 200, "Movie updated", { movie });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

//? GET - Get movie details
exports.getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) return sendError(res, 404, "Movie not found.");
    return sendSuccess(res, 200, "Movie fetched", { movie });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

//! DELETE - Delete a movie
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) return sendError(res, 404, "Movie not found!");
    return sendSuccess(res, 200, "Movie deleted", { movie });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

//? GET - Get Movie with Slugify
exports.getMovieBySlug = async (req, res) => {
  try {
    const movie = await Movie.findOne({ slug: req.params.slug });
    if (!movie) return sendError(res, 404, "Movie not found.");
    return sendSuccess(res, 200, "Movie fetched", { movie });
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};
