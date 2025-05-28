const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
const dotenv = require("dotenv");
const Movie = require("../models/Movie");

// 🌿 Load env vars
dotenv.config({ path: path.join(__dirname, "../config.env") });

// 🛡️ Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🧩 MongoDB connected!");
  } catch (err) {
    console.error("⚔️ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

// 🌸 Read and process JSON data
const seedMovies = async () => {
  try {
    const dataPath = path.join(__dirname, "../json/movie.json");
    const raw = fs.readFileSync(dataPath, "utf-8");
    const movies = JSON.parse(raw);

    // 🌀 Add slug to each movie
    const moviesWithSlugs = movies.map((movie) => ({
      ...movie,
      slug: slugify(movie.title, { lower: true }),
    }));

    // 💥 Clear old data
    await Movie.deleteMany();
    console.log("🧹 Cleared existing movies...");

    // 🌱 Insert new
    await Movie.insertMany(moviesWithSlugs);
    console.log("✅ Seeding completed successfully!");

    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

// 🏁 Run
connectDB().then(seedMovies);
