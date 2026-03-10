import { Link } from "react-router-dom";
import { useMovieLikes } from "../hooks/useMovieLikes";
import { useLikedMovie } from "../hooks/useLikedMovies";

export default function LikedMovieCard({ movie }) {
    const { liked, likeCount, toggleLike, loading: movieloading } = useLikedMovie(movie);

    console.log("LikedMovieCard - movie:", movie)
    return (
        <article className="liked-movie-card">
            <div className="liked-movie-card-image-wrapper">
                <Link
                    to={`/films/${movie.tmdb_id}`}
                    className="liked-movie-cardlink"
                >
                    {movie.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="liked-movie-poster"
                        />
                    ) : (
                        <div className="no-poster">No Image</div>
                    )}
                </Link>
            </div>

            <div className="movie-info">
                <h3>{movie.title}</h3>
                {movie.release_year && <p>Year: {movie.release_year}</p>}
                {movie.vote_average != null && (
                    <p>Rating: {Math.round(movie.vote_average * 10) / 10} ⭐</p>
                )}
                {movie.directors && <p>Director: {movie.directors}</p>}
                {movie.overview && <p className="overview">{movie.overview}</p>}
                {movieloading ? (
                    <p>Loading likes...</p>
                ) : (
                    <button className="popular-list-like-btn" onClick={toggleLike}>
                        {liked ? "💖" : "🤍"} {likeCount}
                    </button>
                )}
            </div>

        </article>
    );
}