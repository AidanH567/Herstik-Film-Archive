import * as React from "react"
import { useSearchParams } from "react-router-dom"

export default function FilmsBrowse() {
  const [searchParams] = useSearchParams()

  const year = searchParams.get("year")
  const genre = searchParams.get("genre")
  const rating = searchParams.get("rating")
  const sort = searchParams.get("sort")
  const other = searchParams.get("other")
  const q = searchParams.get("q")

  const [movies, setMovies] = React.useState([])

  React.useEffect(() => {
    // Build one "active" filter (because you don't want stackings)
    const active =
      (q && { key: "q", value: q }) ||
      (year && { key: "year", value: year }) ||
      (genre && { key: "genre", value: genre }) ||
      (rating && { key: "rating", value: rating }) ||
      (sort && { key: "sort", value: sort }) ||
      (other && { key: "other", value: other }) ||
      null

    if (!active) return

    // TODO: fetch based on active.key/active.value
    // fetchMovies(active).then(setMovies)
  }, [searchParams])

  return (
    <div className="films-browse">
      <h1>Browse Films</h1>
      <p>
        Active filter:{" "}
        {q ? `Search "${q}"` :
         year ? `Year ${year}` :
         genre ? `Genre ${genre}` :
         rating ? `Rating ${rating}+` :
         sort ? `Sort ${sort}` :
         other ? `Other ${other}` :
         "None"}
      </p>

      {/* Render your list/grid */}
      {/* movies.map(...) */}
    </div>
  )
}
