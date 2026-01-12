import FilterSelect from "./FilterSelect"

export default function FilmFilters({
  query,
  onQueryChange,
  year,
  onYearChange,
  rating,
  onRatingChange,
  popular,
  onPopularChange,
  genre,
  onGenreChange,
  other,
  onOtherChange,
  onClear,
}) {
  const yearOptions = [
    { value: "", label: "All" },
    { value: "2026", label: "2026" },
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
  ]

  const ratingOptions = [
    { value: "", label: "All" },
    { value: "9", label: "9+" },
    { value: "8", label: "8+" },
    { value: "7", label: "7+" },
    { value: "6", label: "6+" },
  ]

  const popularOptions = [
    { value: "popular", label: "Popular" },
    { value: "top_rated", label: "Top Rated" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ]

  const genreOptions = [
    { value: "", label: "All" },
    { value: "action", label: "Action" },
    { value: "comedy", label: "Comedy" },
    { value: "drama", label: "Drama" },
    { value: "thriller", label: "Thriller" },
    { value: "horror", label: "Horror" },
  ]

  const otherOptions = [
    { value: "", label: "Any" },
    { value: "with_poster", label: "Has Poster" },
    { value: "short", label: "Under 90 mins" },
    { value: "long", label: "Over 150 mins" },
  ]

  return (
    <section className="film-nav">
      <div className="film-search">
        <label htmlFor="film-search" className="sr-only">
          Search films
        </label>
        <input
          id="film-search"
          type="search"
          placeholder="Search films..."
          value={query}
          onChange={onQueryChange}
        />
      </div>

      <div className="film-filters">
        <FilterSelect
          id="filter-year"
          label="Year"
          value={year}
          onChange={onYearChange}
          options={yearOptions}
        />

        <FilterSelect
          id="filter-rating"
          label="Rating"
          value={rating}
          onChange={onRatingChange}
          options={ratingOptions}
        />

        <FilterSelect
          id="filter-popular"
          label="Popular"
          value={popular}
          onChange={onPopularChange}
          options={popularOptions}
        />

        <FilterSelect
          id="filter-genre"
          label="Genre"
          value={genre}
          onChange={onGenreChange}
          options={genreOptions}
        />

        <FilterSelect
          id="filter-other"
          label="Other"
          value={other}
          onChange={onOtherChange}
          options={otherOptions}
        />

        <button type="button" className="clear-filters" onClick={onClear}>
          Clear
        </button>
      </div>
    </section>
  )
}
