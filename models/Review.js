const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "You must select a rating."],
    },
    comment: {
      type: String,
      required: [true, "You must leave a comment."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reviews", reviewSchema);
