import { Link } from "react-router-dom";

export default function ListMovieCard({ movie }) {

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.png";

  return (
    <div className="movie-card">

      <Link to={`/films/${movie.tmdb_id}`}>

        <img
          className="movie-poster"
          src={posterUrl}
          alt={movie.title}
        />

      </Link>

    </div>
  );
}
