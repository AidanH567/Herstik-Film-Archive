import { useEffect, useState } from "react"
import { getTrendingMovies } from "../services/tmdb"

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500"

function mapMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path ? IMAGE_BASE + movie.poster_path : null,
  }
}

export default function useTrendingMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)

        const results = await getTrendingMovies()
        const mapped = results.map(mapMovie)

        if (!cancelled) setMovies(mapped)
      } catch (err) {
        if (!cancelled) setError(err?.message ?? "Something went wrong")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { movies, loading, error }
}
