const express = require("express");
const router = express.Router();
const reviewsControllers = require("../controllers/reviewControllers");

router
  .route("/")
  .post(reviewsControllers.addReview)
  .get(reviewsControllers.getAllReviews);

router
  .route("/:id")
  .get(reviewsControllers.getMovieReviews)
  .put(reviewsControllers.updateReview)
  .delete(reviewsControllers.deleteReview);

module.exports = router;
