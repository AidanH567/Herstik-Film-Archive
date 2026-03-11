import { useEffect, useState } from "react";
import { getLikedMovies } from "../services/movieLikeService";
import LoadingCard from "../components/LoadingCard";
import { getMovieDetails, getMovieCredits } from "../services/tmdb";
import LikedMovieCard from "../components/LikedMovieCard";

export default function LikedMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    async function loadMovies() {
      try {
        const likedMovies = await getLikedMovies();

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
              directors: directors.map(d => d.name).join(", "),
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

      <div className="movies-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <LoadingCard key={i} />)
          : movies.map((movie) => (
              <LikedMovieCard key={movie.id} movie={movie} />
            ))}
      </div>
    </div>
  );
}