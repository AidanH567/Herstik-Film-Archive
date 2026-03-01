import { useNavigate, useSearchParams } from "react-router-dom"
import { getMovieGenres, getMovieCredits } from "../services/tmdb"
import { useEffect, useState } from "react"
import { searchMovies } from "../services/tmdb"

export default function FilmNav() {

  const navigate = useNavigate()
  const [genres, setGenres] = useState([])
  const [searchParams] = useSearchParams()

  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)


  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }

    const timeout = setTimeout(async () => {
      try {
        setSearchLoading(true)

        const data = await searchMovies(query, 0)
        const basicMovies = data.movies.slice(0, 5)

        const moviesWithDirectors = await Promise.all(
          basicMovies.map(async (movie) => {
            try {
              const credits = await getMovieCredits(movie.id)
              console.log("Credits for:", movie.title, credits)

              const director = credits.crew?.find(
                (person) => person.job === "Director"
              )

              return {
                ...movie,
                director: director?.name || "—",
              }
            } catch {
              return {
                ...movie,
                director: "—",
              }
            }
          })
        )

        setResults(moviesWithDirectors)

      } catch (err) {
        console.error("Search error:", err)
      } finally {
        setSearchLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeout)

  }, [query])


  useEffect(() => {
    getMovieGenres().then(setGenres).catch(console.error)
  }, [])

  function goToBrowse(key, value) {
    const params = new URLSearchParams(searchParams)

    if (!value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    navigate(`/films/browse?${params.toString()}`)
  }

  function goToSearch(q) {
    const trimmed = q.trim()
    if (!trimmed) return
    navigate(`/films/browse?q=${encodeURIComponent(trimmed)}`)
  }


  return (
    <section className="film-nav">

      <div className="film-filers-text">Browse</div>

      <div className="film-filters">


        <label className="filter">
          <span>Year</span>
          <select
            defaultValue=""
            onChange={(e) => goToBrowse("year", e.target.value)}
          >
            <option value="">Select</option>
            {Array.from({ length: 2026 - 1995 + 1 }, (_, i) => {
              const year = 2026 - i // count down from 2026
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            })}
          </select>
        </label>

        <label className="filter">
          <span>Genre</span>
          <select defaultValue="" onChange={(e) => goToBrowse("genre", e.target.value)}>
            <option value="">Select</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>

        <label className="filter">
          <span>Rating</span>
          <select defaultValue="" onChange={(e) => goToBrowse("rating", e.target.value)}>
            <option value="">Select</option>
            <option value="5">5 ⭐ & up</option>
            <option value="4.5">4.5 ⭐ & up</option>
            <option value="4">4 ⭐ & up</option>
            <option value="3.5">3.5 ⭐ & up</option>
            <option value="3">3 ⭐ & up</option>
            <option value="2.5">2.5 ⭐ & up</option>
            <option value="2">2 ⭐ & up</option>
            <option value="1.5">1.5 ⭐ & up</option>
            <option value="1">1 ⭐ & up</option>
          </select>
        </label>

        <label className="filter">
          <span>Popular</span>
          <select
            defaultValue=""
            onChange={(e) => goToBrowse("trending", e.target.value)}
          >
            <option value="">Select</option>
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
        </label>

        <div className="film-search" style={{ position: "relative" }}>
          <input
            type="search"
            placeholder="Search films..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {searchLoading && <p>Searching…</p>}

          {isFocused && results.length > 0 && (
            <ul className="film-search-dropdown">
              {results.map((movie) => (
                <li
                  key={movie.id}
                  className="film-search-item"
                  onClick={() => {
                    navigate(`/films/${movie.id}`)
                    setQuery("")
                    setResults([])
                  }}
                >
                  <div className="dropdown-meta">
                    <strong>{movie.title}:</strong>
                    <span>({movie.release_date?.slice(0, 4)})</span>
                    <span className="dropdown-director">
                      {movie.director}
                    </span>
                  </div>

                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
