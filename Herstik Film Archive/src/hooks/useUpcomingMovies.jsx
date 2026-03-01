import { useState, useEffect } from 'react'
import { getUpcomingMovies } from '../services/tmdb'

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500"

function mapMovie(movie) {
    return {
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path
            ? IMAGE_BASE + movie.poster_path
            : null,

        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
        overview: movie.overview,
    }
}

export default function useUpcomingMovies() {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            try {
                setLoading(true)
                setError(null)

                const result = await getUpcomingMovies(0)
                const mapped = result.movies.map(mapMovie)

                if (!cancelled) setMovies(mapped)
            } catch (err) {
                if (!cancelled) {
                    setError(err.message ?? "Something went wrong")
                }
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