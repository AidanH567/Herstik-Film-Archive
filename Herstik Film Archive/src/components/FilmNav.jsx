import { useNavigate } from "react-router-dom"
import { getMoviesByGenre, getMovieGenres } from "../services/tmdb"

export default function FilmNav() {
  const navigate = useNavigate()

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
          <select defaultValue="" onChange={(e) => goToBrowse("year", e.target.value)}>
            <option value="">Choose…</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </label>

        <label className="filter">
          <span>Genre</span>
          <select defaultValue="" onChange={(e) => goToBrowse("genre", e.target.value)}>
            <option value="">Choose…</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
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
