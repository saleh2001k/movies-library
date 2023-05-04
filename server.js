"use strict";

const express = require("express");

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
  }

  const movie = new Movie(
    "Spider-Man: No Way Home",
    "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man."
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
