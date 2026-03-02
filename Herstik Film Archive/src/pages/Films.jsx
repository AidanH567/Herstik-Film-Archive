import FilmNav from "../components/FilmNav"
import MovieCard from "../components/MovieCard"
import ReviewCard from "../components/RecentReviews"
import useTrendingMovies from "../hooks/useTrendingMovies"
import { reviews } from "../data/reviews.js"
import useUpcomingMovies from "../hooks/useUpcomingMovies.jsx"
import useTopRatedMovies from "../hooks/useTopRatedMovies.jsx"
import useCarousel from "../hooks/useCarousel.jsx"
import { useState } from "react"


export default function Films() {
  const { movies, loading, error } = useTrendingMovies()
  const { movies: upcomingMovies, loading: upcomingLoading, error: upcomingError } = useUpcomingMovies()
  const { movies: topRatedMovies, loading: topRatedLoading, error: topRatedError } = useTopRatedMovies()

  const [isTransitioning, setIsTransitioning] = useState(false)
  const popularCarousel = useCarousel(movies)
  const upcomingCarousel = useCarousel(upcomingMovies)
  const topRatedCarousel = useCarousel(topRatedMovies)


  return (
    <div className="film-page">

      <h2 style={{ marginTop: 0 }}> Popular this week</h2>
      <section className="home-popular">

        {loading && <p>Loading…</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <div className={`poster-row ${popularCarousel.isTransitioning ? "fade-out" : "fade-in"}`}>
            {popularCarousel.currentItems.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
        <button className="carousel-button" onClick={popularCarousel.next}>{">"}</button>
      </section>

      <h2 style={{ marginTop: "20px" }}> Top Rated Movies</h2>
      <section className="home-popular">

        {loading && <p>Loading…</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <div className={`poster-row ${topRatedCarousel.isTransitioning ? "fade-out" : "fade-in"}`}>
            {topRatedCarousel.currentItems.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
        <button className="carousel-button" onClick={topRatedCarousel.next}>{">"}</button>
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
