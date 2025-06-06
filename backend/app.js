const express = require("express");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/movies", movieRoutes);
app.use("/reviews", reviewRoutes);

module.exports = app;
