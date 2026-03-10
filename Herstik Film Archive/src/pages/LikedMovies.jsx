import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLikedMovies } from "../services/movieLikeService";
import LoadingCard from "../components/LoadingCard";
import { getMovieCredits, getMovieDetails } from "../services/tmdb";

export default function LikedMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        // 1️⃣ Get liked movies from Supabase
        const likedMovies = await getLikedMovies();

        // 2️⃣ Fetch TMDB details and credits for each movie
        const detailedMovies = await Promise.all(
          likedMovies.map(async (movie) => {
            const details = await getMovieDetails(movie.tmdb_id);
            const credits = await getMovieCredits(movie.tmdb_id);
            const directors =
              credits.crew?.filter((c) => c.job === "Director") || [];

            return {
              ...movie,
              overview: details.overview,
              vote_average: details.vote_average,
              directors: directors.map((d) => d.name).join(", "),
            };
          })
        );

        setMovies(detailedMovies);
      } catch (err) {
        console.error("Failed to load liked movies:", err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  return (
    <div className="liked-movies-page">
      <h1>Liked Movies</h1>

      <div className="movies-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <LoadingCard key={i} />)
          : movies.map((movie) => (
              <Link
                key={movie.id}
                to={`/films/${movie.tmdb_id}`}
                className="movie-card"
              >
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                  />
                ) : (
                  <div className="no-poster">No Image</div>
                )}

                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  {movie.release_year && <p>Year: {movie.release_year}</p>}
                  {movie.vote_average != null && (
                    <p>Rating: {Math.round(movie.vote_average * 10) / 10} ⭐</p>
                  )}
                  {movie.directors && <p>Director: {movie.directors}</p>}
                  {movie.overview && <p className="overview">{movie.overview}</p>}
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}