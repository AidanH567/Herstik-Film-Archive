import { useEffect, useState } from "react";
import { searchMovies } from "../services/tmdb";

export default function AddFilmBar({ onAddFilm }) {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const movies = await searchMovies(query);

        console.log("TMDB results:", movies);

        setResults(movies.movies.slice(0, 20));

      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);

  }, [query]);

  return (
    <div style={{ position: "relative" }}>

      <input
        type="text"
        placeholder="Enter Name of Film..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Searching…</p>}

      {results.length > 0 && (
        <ul className="add-film-dropdown">

          {results.map((movie) => {

            // ⭐⭐⭐⭐⭐ NORMALIZATION (THE IMPORTANT PART)
            const normalizedMovie = {
              tmdb_id: movie.id,  // ✅ CRITICAL FIX
              title: movie.title,
              poster_path: movie.poster_path,
              release_year: movie.release_date
                ? parseInt(movie.release_date.slice(0, 4))
                : null
            };

            return (
              <li
                key={movie.id}
                className="add-film-dropdown-item"
                onClick={() => {

                  onAddFilm(normalizedMovie);  // ✅ ALWAYS CLEAN DATA

                  setQuery("");
                  setResults([]);
                }}
              >
                <strong>{movie.title}</strong>
                <span className="year">
                  {movie.release_date?.slice(0, 4)}
                </span>
              </li>
            );
          })}

        </ul>
      )}
    </div>
  );
}
