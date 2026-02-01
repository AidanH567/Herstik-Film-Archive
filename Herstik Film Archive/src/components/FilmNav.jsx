import { useNavigate } from "react-router-dom"
import { getMovieGenres } from "../services/tmdb"
import { useEffect, useState } from "react"

export default function FilmNav() {
  const navigate = useNavigate()
  const [genres, setGenres] = useState([])

  useEffect(() => {
    getMovieGenres().then(setGenres).catch(console.error)
  }, [])

  function goToBrowse(key, value) {
    if (!value) return
    navigate(`/films/browse?${key}=${encodeURIComponent(value)}`)
  }

  function goToSearch(q) {
    const trimmed = q.trim()
    if (!trimmed) return
    navigate(`/films/browse?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <section className="film-nav">
      <div className="film-search">
        <label htmlFor="film-search" className="sr-only">Search films</label>
        <input
          id="film-search"
          type="search"
          placeholder="Search films..."
          onKeyDown={(e) => {
            if (e.key === "Enter") goToSearch(e.currentTarget.value)
          }}
        />
      </div>

      <div className="film-filters">
        <label className="filter">
          <span>Year</span>
          <select
            defaultValue=""
            onChange={(e) => goToBrowse("year", e.target.value)}
          >
            <option value="">Choose…</option>
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
            <option value="">Choose…</option>
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
            <option value="">Choose…</option>
            <option value="9">9+</option>
            <option value="8">8+</option>
            <option value="7">7+</option>
          </select>
        </label>

        <label className="filter">
          <span>Popular</span>
          <select defaultValue="" onChange={(e) => goToBrowse("sort", e.target.value)}>
            <option value="">Choose…</option>
            <option value="popular">Popular</option>
            <option value="top_rated">Top Rated</option>
            <option value="newest">Newest</option>
          </select>
        </label>

        <label className="filter">
          <span>Other</span>
          <select defaultValue="" onChange={(e) => goToBrowse("other", e.target.value)}>
            <option value="">Choose…</option>
            <option value="with_poster">Has Poster</option>
            <option value="short">Under 90 mins</option>
          </select>
        </label>
      </div>
    </section>
  )
}
