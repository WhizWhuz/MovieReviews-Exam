const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Review = require("../models/Review");
const Movie = require("../models/Movie");

// 🌿 Load env
dotenv.config({ path: path.join(__dirname, "../config.env") });

// ⚔️ Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🧩 MongoDB connected!");
  } catch (err) {
    console.error("❌ Connection error:", err.message);
    process.exit(1);
  }
};

// 🥷 Fake users (just objectId-shaped strings)
const fakeUsers = [
  "664f87a49c8f4fc23e10a001",
  "664f87a49c8f4fc23e10a002",
  "664f87a49c8f4fc23e10a003",
  "664f87a49c8f4fc23e10a004",
  "664f87a49c8f4fc23e10a005",
];

// 📝 Sample comments
const sampleComments = [
  "Mind-blowing cinematography.",
  "A classic masterpiece!",
  "Wasn't what I expected, but solid.",
  "One of Nolan's best.",
  "Good... but a bit long.",
  "Great acting, especially DiCaprio.",
  "Confusing plot but loved it.",
];

// 🌱 Seed Reviews
const seedReviews = async () => {
  try {
    // 💥 Wipe old reviews
    await Review.deleteMany();
    console.log("🧹 Cleared existing reviews...");

    const movies = await Movie.find();
    if (!movies.length) throw new Error("No movies found in DB!");

    let reviewCount = 0;

    for (const movie of movies) {
      const numberOfReviews = Math.floor(Math.random() * 3) + 2; // 2–4 reviews

      for (let i = 0; i < numberOfReviews; i++) {
        const review = {
          movieId: movie._id,
          userId: fakeUsers[Math.floor(Math.random() * fakeUsers.length)],
          rating: Math.floor(Math.random() * 5) + 1,
          comment:
            sampleComments[Math.floor(Math.random() * sampleComments.length)],
        };

        await Review.create(review);
        reviewCount++;
      }
    }

    console.log(
      `✅ Seeded ${reviewCount} reviews across ${movies.length} movies.`
    );
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

// 🏁 Start
connectDB().then(seedReviews);
