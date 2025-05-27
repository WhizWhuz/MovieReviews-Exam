const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "You must input a title."],
    },
    director: {
      type: String,
      required: [true, "You must select a director."],
    },
    releaseYear: {
      type: Number,
      required: [true, "You must add a release year."],
    },
    genre: {
      type: String,
      required: [true, "You must select a genre."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Movie", movieSchema);
