import * as React from "react"
import { useSearchParams } from "react-router-dom"
import {
  getPopularMovies,
  getMoviesByGenre,
  getMoviesByYear,
  searchMovies,
  getTrendingMovies
} from "../services/tmdb"
import MovieCard from "../components/MovieCard"

export default function FilmsBrowse() {
  const [searchParams] = useSearchParams()

  const genre = searchParams.get("genre")
  const year = searchParams.get("year")
  const q = searchParams.get("q")
  const trending = searchParams.get("trending")

  const [movies, setMovies] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const [pageGroup, setPageGroup] = React.useState(0)
  const [hasMore, setHasMore] = React.useState(true)

  // Reset pagination when filters change
  React.useEffect(() => {
    setPageGroup(0)
  }, [genre, year, q, trending])

  React.useEffect(() => {
    setLoading(true)
    setError(null)

    const fetchMovies = async () => {
      try {
        let result

        if (genre && year) {
          result = await getMoviesByGenreAndYear(
            genre,
            year,
            pageGroup
          )
        } else if (genre) {
          result = await getMoviesByGenre(genre, pageGroup)
        } else if (q) {
          result = await searchMovies(q, pageGroup)
        } else if (year) {
          result = await getMoviesByYear(year, pageGroup)
        } else if (trending) {
          result = await getTrendingMovies(trending, pageGroup)
        } else {
          result = await getPopularMovies(pageGroup)
        }

        setMovies(result.movies)
        setHasMore(result.hasMore)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [genre, year, q, trending, pageGroup])

  return (
    <div className="films-browse">
      <h1>Browse Films</h1>

      {loading && <p>Loading movies...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <>
          <div className="browse-grid">
            {movies.map((movie) => {
              const poster = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder.png"

              return (
                <MovieCard
                  key={movie.id}
                  movie={{ ...movie, poster }}
                />
              )
            })}
          </div>

          <div className="pagination">
            <button
              disabled={pageGroup === 0 || loading}
              onClick={() =>
                setPageGroup((p) => Math.max(0, p - 1))
              }
            >
              ← Previous
            </button>

            <span>Page {pageGroup + 1}</span>

            <button
              disabled={!hasMore || loading}
              onClick={() => setPageGroup((p) => p + 1)}
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  )
}
