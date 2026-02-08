import { useEffect, useState } from "react"
import { searchMovies } from "../services/tmdb"

export default function AddFilmBar({ onAddFilm }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }

    const timeout = setTimeout(async () => {
      try {
        console.log("Searching for:", query)

        setLoading(true)
        const movies = await searchMovies(query)

        console.log("TMDB results:", movies)

        setResults(movies.movies.slice(0, 20))
      } catch (err) {
        console.error("Search error:", err)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

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
          {results.map((movie) => (
            <li
              key={movie.id}
              className="add-film-dropdown-item"
              onClick={() => {
                onAddFilm(movie)
                setQuery("")
                setResults([])
              }}
            >
              <strong>{movie.title}</strong>
              <span className="year">
                {movie.release_date?.slice(0, 4)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
