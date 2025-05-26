const Movie = require("../models/Movie");
const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  try {
    const { movieId, rating, comment } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found!" });

    const review = await Review.create({
      movieId,
      userId: req.user.id,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("movieId", "title")
      .populate("userId", "username");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReviewDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id)
      .populate("movieId", "title")
      .populate("userId", "username");

    if (!review) return res.status(404).json({ message: "Review not found" });

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    const review = await Review.findById(id);

    if (!review) return res.status(404).json({ message: "Review not found." });

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await review.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMovieReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await Review.find({ movieId: id }).populate(
      "userId",
      "username"
    );
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findById(id);

    if (!review) return res.status(404).json({ message: "Review not found" });

    await Review.findByIdAndDelete(id);
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
