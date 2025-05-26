const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/movies", movieRoutes);
app.use("/reviews", reviewRoutes);

module.exports = app;
