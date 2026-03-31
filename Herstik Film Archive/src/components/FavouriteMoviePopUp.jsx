import { useEffect, useState } from "react";
import { searchMovies, getMovieCredits } from "../services/tmdb";

export default function FavoriteMovieModal({ onClose, onMovieSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setSearchLoading(true);

        const data = await searchMovies(query, 0);
        const basicMovies = data.movies.slice(0, 8);

        const moviesWithDirectors = await Promise.all(
          basicMovies.map(async (movie) => {
            try {
              const credits = await getMovieCredits(movie.id);

              const director = credits.crew?.find(
                (person) => person.job === "Director"
              );

              return {
                ...movie,
                director: director?.name || "—",
              };
            } catch {
              return {
                ...movie,
                director: "—",
              };
            }
          })
        );

        setResults(moviesWithDirectors);
      } catch (err) {
        console.error("Search error:", err.message);
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="favorite-movie-modal-overlay" onClick={onClose}>
      <div
        className="favorite-movie-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="favorite-movie-modal-header">
          <h2>Select a Favourite Film</h2>
          <button type="button" onClick={onClose}>
            ✕
          </button>
        </div>

        <input
          type="search"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="favorite-movie-search"
        />

        {searchLoading && <p>Searching...</p>}

        <div className="favorite-movie-results">
          {results.map((movie) => (
            <button
              key={movie.id}
              type="button"
              className="favorite-movie-result"
              onClick={() => {
                onMovieSelect(movie);
                onClose();
              }}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="favorite-movie-result-poster"
                />
              ) : (
                <div className="favorite-movie-result-no-poster">
                  No Poster
                </div>
              )}

              <div className="favorite-movie-result-info">
                <strong>{movie.title}</strong>
                <p>{movie.release_date?.slice(0, 4) || "—"}</p>
                <p>{movie.director}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}