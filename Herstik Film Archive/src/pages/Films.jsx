import FilmNav from "../components/FilmNav"
import MovieCard from "../components/MovieCard"
import ReviewCard from "../components/RecentReviews"
import useTrendingMovies from "../hooks/useTrendingMovies"
import {reviews} from "../data/reviews.js"


export default function Films() {
  const { movies, loading, error } = useTrendingMovies()
  return (
    <div className="film-page">
      <FilmNav />
      {/* This can show your default films landing page */}
      {/* e.g. popular films grid */}

      <section className="home-popular">
        <h2>Popular this week</h2>

        {loading && <p>Loading…</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <div className="poster-row">
            {movies.slice(0, 6).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      <section className="home-popular">
        <h2>Popular this week</h2>

        {loading && <p>Loading…</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <div className="poster-row">
            {movies.slice(0, 6).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      <section className="reviews">
        <h2>Recent reviews</h2>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </div>
  )
}
