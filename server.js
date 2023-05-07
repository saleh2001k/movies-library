"use strict";

const express = require("express");

const app = express();

const data = require('./Movie-Data/data.json');

app.use(express.json());


app.get("/", (req, res) => {
  function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
  }

  const movie = new Movie(
    data.title, 
    data.poster_path, 
    data.overview
    );
  res.json(movie);
});

app.get("/favorite", (req, res) => {
  res.send("Welcome to Favorite Page");
});

// ------------------ Error handling ------------------ \\

app.use((req, res, next) => {
    if (req.path === "/error") {
      const error = new Error("Sorry, something went wrong");
      error.status = 500;
      next(error);
    } else {
      const error = new Error("Page Not Found");
      error.status = 404;
      next(error);
    }
  });
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message || "Sorry, something went wrong",
    });
  });

  //port
const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
