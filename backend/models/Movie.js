const mongoose = require("mongoose");
const slugify = require("slugify");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "You must input a title."],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
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
      enum: [
        "Action",
        "Adventure",
        "Comedy",
        "Crime",
        "Drama",
        "Fantasy",
        "Historical",
        "Horror",
        "Musical",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Thriller",
        "Western",
        "Animation",
        "Family",
        "Biography",
        "War",
        "Sport",
        "Superhero",
        "Documentary",
        "Anime",
        "Mecha",
        "Romantic Sci-Fi",
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

movieSchema.pre("save", async function (next) {
  if (!this.isModified("title")) return next();

  const baseSlug = slugify(this.title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  while (await mongoose.models.Movie.findOne({ slug })) {
    slug = `${baseSlug}-${counter++}`;
  }

  this.slug = slug;
  next();
});

module.exports = mongoose.model("Movie", movieSchema);
