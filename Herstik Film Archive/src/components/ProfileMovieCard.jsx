import { Link } from "react-router-dom";

export default function ProfileMovieCard({ movie }) {
  const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

  const posterUrl = movie.poster_path
    ? `${POSTER_BASE}${movie.poster_path}`
    : null;

  const filmId = movie.tmdb_id || movie.id;

  return (
    <div className="movie-card">
      <Link to={`/films/${filmId}`}>
        {posterUrl ? (
          <img
            className="movie-poster"
            src={posterUrl}
            alt={movie.title}
          />
        ) : (
          <div className="movie-poster-placeholder">No Poster</div>
        )}
      </Link>
    </div>
  );
}