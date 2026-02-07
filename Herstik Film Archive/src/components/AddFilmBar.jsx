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

        setResults(movies.movies.slice(0, 5))
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
        <ul
          style={{
            background: "#111",
            color: "#fff",
            listStyle: "none",
            padding: "8px",
            marginTop: "4px",
            borderRadius: "6px",
          }}
        >
          {results.map((movie) => (
            <li
              key={movie.id}
              style={{ cursor: "pointer", padding: "4px 0" }}
              onClick={() => {
                console.log("Clicked movie:", movie)
                onAddFilm(movie)
                setQuery("")
                setResults([])
              }}
            >
              {movie.title} ({movie.release_date?.slice(0, 4)})
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
