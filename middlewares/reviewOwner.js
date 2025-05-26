const Review = require("../models/Reviews");

module.exports = async (req, res, next) => {
  const reviewId = req.params.id;
  const userId = req.user.id;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You can only modify your own reviews." });
    }

    req.review = review;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
