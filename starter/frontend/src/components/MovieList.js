import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieList({ onMovieClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const baseUrl = (process.env.REACT_APP_MOVIE_API_URL || '').replace(/\/+$/, '');

    axios
      .get(`${baseUrl}/movies/`)
      .then((response) => {
        const data = response.data?.movies || response.data || [];
        setMovies(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        // Fallback in case trailing slash is stripped or handled differently
        axios
          .get(`${baseUrl}/movies`)
          .then((response) => {
            const data = response.data?.movies || response.data || [];
            setMovies(Array.isArray(data) ? data : []);
          })
          .catch((err) => {
            console.error('Failed to load movies:', err);
            setMovies([]);
          });
      });
  }, []);

  return (
    <ul>
      {Array.isArray(movies) &&
        movies.map((movie) => (
          <li className="movieItem" key={movie.id} onClick={() => onMovieClick(movie)}>
            {movie.title}
          </li>
        ))}
    </ul>
  );
}

MovieList.propTypes = {
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieList;
