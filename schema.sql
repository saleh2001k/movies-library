DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  release_date DATE NOT NULL,
  poster_path VARCHAR(255),
  overview TEXT,
  comments TEXT
);

-- INSERT INTO movies (title, release_date, poster_path, overview, comments)
-- VALUES ('Example Movie', '2023-05-10', 'https://example.com/poster.jpg', 'This is an example movie.', 'This is my personal comment about the movie.');