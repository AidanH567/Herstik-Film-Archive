import { Link } from "react-router-dom"
import Poster from "/poster.webp"
import MovieCard from "../components/MovieCard.jsx"
import ReviewCard from "../components/RecentReviews.jsx"
import "../App.css"
import useTrendingMovies from "../hooks/useTrendingMovies"
import { removeMovieFromList } from "../services/listService.js"
import useUpcomingMovies from "../hooks/useUpcomingMovies.jsx"
import useTopRatedMovies from "../hooks/useTopRatedMovies.jsx"
import { useEffect, useState } from "react"
import useCarousel from "../hooks/useCarousel.jsx"
import { getRecentReviews } from "../services/reviewService.js"
import Spinner from "../components/Spinner.jsx"



export default function Home() {
  const { movies, loading, error } = useTrendingMovies()
  const [reviews, setReviews] = useState([])
  const [loadingReviews, setLoadingReviews] = useState(true)
  const {
    movies: upcomingMovies,
    loading: upcomingLoading,
    error: upcomingError
  } = useUpcomingMovies()

  const {
    movies: topRatedMovies,
    loading: topRatedLoading,
    error: topRatedError
  } = useTopRatedMovies()


  const [isTransitioning, setIsTransitioning] = useState(false)
  const popularCarousel = useCarousel(movies)
  const upcomingCarousel = useCarousel(upcomingMovies)
  const topRatedCarousel = useCarousel(topRatedMovies)
  const [heroImageLoaded, setHeroImageLoaded] = useState(false)

  const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";
  const heroMovie = movies[0]
  
   useEffect(() => {
    setHeroImageLoaded(false)
  }, [heroMovie])

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
    <div className="home">



      <section className="home-hero">

        <div className="film-detail-backdrop">

          {heroMovie?.backdrop_path && (
            <img
              className={`backdrop ${heroImageLoaded ? "loaded" : ""}`}
              src={BACKDROP_BASE + heroMovie.backdrop_path}
              alt={heroMovie.title}
              onLoad={() => setHeroImageLoaded(true)}
            />
          )}
        </div>

        <div className="home-hero-content">
          <h1>Welcome to the Herstik Film Archive</h1>
          <p>Discover, review, and celebrate your favorite films.</p>
          <Link to="/films" className="btn">
            Browse Films
          </Link>
        </div>
      </section>


      <h2 style={{
        marginTop: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}> Popular this week</h2>

      <section className="home-popular">

        {loading && <Spinner />}
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

      <h2 style={{
        marginTop: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>Upcoming Films</h2>

      <section className="home-popular">

        {loading && <p>Loading…</p>}
        {error && <p>Error: {error}</p>}

        <button className="carousel-button" onClick={upcomingCarousel.back}>{"<"}</button>

        {!loading && !error && (
          <div className={`poster-row ${upcomingCarousel.isTransitioning ? "fade-out" : "fade-in"}`}>
            {upcomingCarousel.currentItems.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
        <button className="carousel-button" onClick={upcomingCarousel.next}>{">"}</button>
      </section>

      <h2 style={{
        marginTop: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>Top Rated Films</h2>
      <section className="home-popular">


        {loading && <p>Loading…</p>}
        {error && <p>Error: {error}</p>}
        <button className="carousel-button" onClick={topRatedCarousel.back}>{"<"}</button>

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
            <ReviewCard
              key={review.id}
              review={review}
              onDelete={(id) =>
                setReviews(prev => prev.filter(r => r.id !== id))
              } />
          ))}
        </div>
      </section>
    </div>
  )
}
