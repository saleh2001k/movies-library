"use strict";

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());
// ------------------ trending  ------------------ \\
app.get('/trending', async (req, res, next) => {
  try {
    const response = await axios.get(`${process.env.URL}/trending/movie/week`, {
      params: {
        api_key: process.env.APIKey,
      },
    });

    const movies = response.data.results;
    const formattedMovies = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
      overview: movie.overview,
    }));

    res.json(formattedMovies);
  } catch (error) {
    next(error);
  }
});
// ------------------ search ------------------ \\
app.get("/search", async (req, res, next) => {
  const { query } = req.query;

  try {
    const response = await axios.get(`${process.env.URL}/search/movie`, {
      params: {
        api_key: process.env.APIKey,
        query,
      },
    });

    const movies = response.data.results;
    const formattedMovies = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
      overview: movie.overview,
    }));

    res.json(formattedMovies);
  } catch (error) {
    next(error);
  }
});
// ------------------ popular and upcoming------------------ \\
app.get("/popular", async (req, res, next) => {
  try {
    const response = await axios.get(`${process.env.URL}/movie/popular`, {
      params: {
        api_key: process.env.APIKey,
      },
    });

    const movies = response.data.results;
    const formattedMovies = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
      overview: movie.overview,
    }));

    res.json(formattedMovies);
  } catch (error) {
    next(error);
  }
});

app.get("/upcoming", async (req, res, next) => {
  try {
    const response = await axios.get(`${process.env.URL}/movie/upcoming`, {
      params: {
        api_key: process.env.APIKey,
      },
    });

    const movies = response.data.results;
    const formattedMovies = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
      overview: movie.overview,
    }));

    res.json(formattedMovies);
  } catch (error) {
    next(error);
  }
});

  // ------------------ add movie ------------------ \\

app.post('/addMovie', async (req, res, next) => {
  try {
    const { title, release_date, poster_path, overview, comments } = req.body;

    const query =
      'INSERT INTO movies (title, release_date, poster_path, overview, comments) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [title, release_date, poster_path, overview, comments];

    const result = await pool.query(query, values);
    const insertedMovie = result.rows[0];

    res.json(insertedMovie);
  } catch (error) {
    next(error);
  }
});

//---------------- get movie -----------------\\

app.get('/getMovies', async (req, res, next) => {
  try {
    const query = 'SELECT * FROM movies';
    const result = await pool.query(query);
    const movies = result.rows;
    res.json(movies);
  } catch (error) {
    next(error);
  }
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
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

// Start the server
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});