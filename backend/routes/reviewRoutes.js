const express = require("express");
const router = express.Router();
const reviewsControllers = require("../controllers/reviewControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router
  .route("/")
  .post(authMiddleware, reviewsControllers.addReview)
  .get(reviewsControllers.getAllReviews);

router
  .route("/:id")
  .get(reviewsControllers.getMovieReviews)
  .put(authMiddleware, reviewsControllers.updateReview)
  .delete(authMiddleware, reviewsControllers.deleteReview);

module.exports = router;
