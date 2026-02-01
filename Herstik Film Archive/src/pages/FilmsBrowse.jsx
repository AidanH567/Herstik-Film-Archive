import * as React from "react"
import { useSearchParams } from "react-router-dom"
import { getPopularMovies, getMoviesByGenre, getMoviesByYear } from "../services/tmdb"
import MovieCard from "../components/MovieCard"

export default function FilmsBrowse() {
  const [searchParams] = useSearchParams()
  const genre = searchParams.get("genre") // only genre filter for now
  const year = searchParams.get("year")

  const [movies, setMovies] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
  setLoading(true)
  setError(null)

  // If both genre and year are selected
  if (genre && year) {
    getMoviesByGenreAndYear(genre, year) // we'll define this function in services
      .then(setMovies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
    return
  }

  // Only genre selected
  if (genre) {
    getMoviesByGenre(genre)
      .then(setMovies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
    return
  }

  // Only year selected
  if (year) {
    getMoviesByYear(year)
      .then(setMovies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
    return
  }

  // No filters → show popular
  getPopularMovies()
    .then(setMovies)
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false))
}, [genre, year])

  return (
    <div className="films-browse">
      <h1>Browse Films</h1>

      {/* Active filter */}
      <p>
        {genre
          ? `Genre filter active (ID: ${genre})`
          : "Showing popular films"}
      </p>

      {/* Loading / error states */}
      {loading && <p>Loading movies...</p>}
      {error && <p>Error: {error}</p>}

      {/* Movies grid */}
      {!loading && !error && (
        <div className="poster-row">
          {movies.map((movie) => {
            // Build poster URL for MovieCard
            const poster = movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.png" // fallback if no poster

            return <MovieCard key={movie.id} movie={{ ...movie, poster }} />
          })}
        </div>
      )}
    </div>
  )
}
