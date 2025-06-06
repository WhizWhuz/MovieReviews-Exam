const Movie = require("../models/Movie");
const Review = require("../models/Review");
const sendError = require("../utils/sendError");
const sendSuccess = require("../utils/sendSuccess");

//* POST - Add a review
exports.addReview = async (req, res) => {
  try {
    const { movieId, rating, comment } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) return sendError(res, 404, "Movie not found!");

    const review = await Review.create({
      movieId,
      userId: req.user.id,
      rating,
      comment,
    });

    return sendSuccess(res, 201, { review });
  } catch (err) {
    return sendError(res, 500, "Something went wrong.", err.message);
  }
};

//? GET - Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("movieId", "title")
      .populate("userId", "username");

    return sendSuccess(res, 200, "Reviews fetched", { reviews });
  } catch (err) {
    return sendError(res, 500, "Something went wrong.", err.message);
  }
};

//? GET - Get Review Details
exports.getReviewDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id)
      .populate("movieId", "title")
      .populate("userId", "username");

    if (!review) return sendError(res, 404, "Review not found.");

    return sendSuccess(res, 200, "Review fetched", { review });
  } catch (err) {
    return sendError(res, 500, "Something went wrong.", err.message);
  }
};

//^ PUT - Update Review Details
exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    const review = await Review.findById(id);

    if (!review) return sendError(res, 404, "Review not found.");

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await review.save();

    return sendSuccess(res, 200, "Review updated", { review });
  } catch (err) {
    return sendError(res, 500, "Something went wrong.", err.message);
  }
};

//? GET - Movie Reviews
exports.getMovieReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await Review.find({ movieId: id }).populate(
      "userId",
      "username"
    );
    return sendSuccess(res, 200, "Movie reviews fetched", { reviews });
  } catch (err) {
    return sendError(res, 500, "Something went wrong.", err.message);
  }
};

//! DELETE - Delete a review
exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id);

    if (!review) return sendError(res, 404, "Review not found.");

    await Review.findByIdAndDelete(id);
    return sendSuccess(res, 200, "Review deleted", { review });
  } catch (err) {
    return sendError(res, 500, "Something went wrong.", err.message);
  }
};
