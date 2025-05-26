const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/movies", moviesRoutes);
app.use("/review", reviewRoutes);

module.exports = app;
