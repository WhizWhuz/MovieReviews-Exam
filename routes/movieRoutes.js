const express = require("express");
const router = express.Router();
const movieControllers = require("../controllers/movieControllers");
const reviewController = require("../controllers/reviewControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

router
  .route("/")
  .post(authMiddleware, isAdmin, movieControllers.addMovie)
  .get(movieControllers.getMovies);

router
  .route("/:id")
  .get(movieControllers.getMovieDetails)
  .put(authMiddleware, isAdmin, movieControllers.updateMovie)
  .delete(authMiddleware, isAdmin, movieControllers.deleteMovie);

router.route("/:id/reviews").get(reviewController.getMovieReviews);

module.exports = router;
