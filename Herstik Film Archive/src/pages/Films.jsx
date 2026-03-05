import FilmNav from "../components/FilmNav"
import MovieCard from "../components/MovieCard"
import ReviewCard from "../components/RecentReviews"
import useTrendingMovies from "../hooks/useTrendingMovies"
import { reviews } from "../data/reviews.js"
import useUpcomingMovies from "../hooks/useUpcomingMovies.jsx"
import useTopRatedMovies from "../hooks/useTopRatedMovies.jsx"
import useCarousel from "../hooks/useCarousel.jsx"
import { useEffect, useState } from "react"
import { getRecentReviews } from "../services/reviewService.js"


export default function Films() {
  const { movies, loading, error } = useTrendingMovies()
  const { movies: upcomingMovies, loading: upcomingLoading, error: upcomingError } = useUpcomingMovies()
  const { movies: topRatedMovies, loading: topRatedLoading, error: topRatedError } = useTopRatedMovies()

  const [isTransitioning, setIsTransitioning] = useState(false)
  const popularCarousel = useCarousel(movies)
  const upcomingCarousel = useCarousel(upcomingMovies)
  const topRatedCarousel = useCarousel(topRatedMovies)

  const [reviews, setReviews] = useState([])
  const [loadingReviews, setLoadingReviews] = useState(true)

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await getRecentReviews(8)
        setReviews(data)
      } catch (err) {
        console.error("Failed to load recent reviews:", err.message)
      } finally {
        setLoadingReviews(false)
      }
    }

    loadReviews()
  }, [])


  return (
    <div className="film-page">

      <h2 style={{ marginTop: 0 }}> Popular this week</h2>
      <section className="home-popular">

        {loading && <p>Loading…</p>}
        {error && <p>Error: {error}</p>}

        <button className="carousel-button" onClick={popularCarousel.back}>{"<"}</button>

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

        <button className="carousel-button" onClick={popularCarousel.back}>{"<"}</button>

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
