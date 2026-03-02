import { Link } from "react-router-dom"
import Poster from "/poster.webp"
import MovieCard from "../components/MovieCard.jsx"
import ReviewCard from "../components/RecentReviews.jsx"
import "../App.css"
import useTrendingMovies from "../hooks/useTrendingMovies"
import { removeMovieFromList } from "../services/listService.js"
import useUpcomingMovies from "../hooks/useUpcomingMovies.jsx"
import useTopRatedMovies from "../hooks/useTopRatedMovies.jsx"
import { useState } from "react"
import useCarousel from "../hooks/useCarousel.jsx"



export default function Home() {
  const { movies, loading, error } = useTrendingMovies()
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




  const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";
  const heroMovie = movies[0]
  console.log("Hero movie:", heroMovie)

  const handleNext = () => {
    if (!movies.length) return

    setIsTransitioning(true)

    setTimeout(() => {
      const nextIndex = popularIndex + 6

      // If next slice would go past the end → reset to 0
      if (nextIndex >= movies.length) {
        setPopularIndex(0)
      } else {
        setPopularIndex(nextIndex)
      }

      setIsTransitioning(false)
    }, 150)
  }


  //TEST CODE - REMOVE LATER
  const reviews = [
    {
      id: 1,
      user: {
        username: "jonathanfujii",
        displayName: "jonathan fujii",
        avatar: "https://i.pravatar.cc/100?img=12",
      },
      movie: {
        id: 101,
        title: "Marty Supreme",
        year: 2025,
        poster:
          "https://image.tmdb.org/t/p/w500/8UdZ5KX6Q2G0G7YV1c6ZsZqY1tA.jpg",
      },
      rating: 4.5,
      ratingCount: 150,
      reviewText: "M(arty) M(auser)\n\nW(illy) W(onka)",
      likes: 34991,
      likedByUser: false,
      createdAt: "2025-01-14",
    },
    {
      id: 2,
      user: {
        username: "cinemalily",
        displayName: "Cinema Lily",
        avatar: "https://i.pravatar.cc/100?img=32",
      },
      movie: {
        id: 102,
        title: "Neon Harbor",
        year: 2024,
        poster:
          "https://image.tmdb.org/t/p/w500/5GA3vV1aWWHTSDO5eno8V5zDo8r.jpg",
      },
      rating: 3.5,
      ratingCount: 87,
      reviewText:
        "Visually stunning, emotionally distant.\n\nFeels like a dream you forget too quickly.",
      likes: 1284,
      likedByUser: true,
      createdAt: "2025-01-10",
    },
    {
      id: 3,
      user: {
        username: "framebyframe",
        displayName: "Frame by Frame",
        avatar: "https://i.pravatar.cc/100?img=45",
      },
      movie: {
        id: 103,
        title: "The Last Projectionist",
        year: 2023,
        poster: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
      },
      rating: 5,
      ratingCount: 412,
      reviewText:
        "A love letter to cinema itself.\n\nWatched this and immediately wanted to rewatch every film I love.",
      likes: 9821,
      likedByUser: false,
      createdAt: "2025-01-02",
    },
  ]

  return (
    <div className="home">



      <section className="home-hero">

        <div className="film-detail-backdrop">
          {heroMovie?.backdrop_path && (
            <img
              className="backdrop"
              src={BACKDROP_BASE + heroMovie.backdrop_path}
              alt={heroMovie.title}
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



      <section className="home-popular">
        <h2 style={{ marginTop: 0 }}> Popular this week</h2>
        {loading && <p>Loading…</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <div className={`poster-row ${popularCarousel.isTransitioning ? "fade-out" : "fade-in"}`}>
            {popularCarousel.currentItems.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
        <button onClick={popularCarousel.next}>Next</button>
      </section>

      <section className="home-popular">
        <h2>Upcoming Films</h2>

        {loading && <p>Loading…</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <div className={`poster-row ${upcomingCarousel.isTransitioning ? "fade-out" : "fade-in"}`}>
            {upcomingCarousel.currentItems.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
        <button onClick={upcomingCarousel.next}>Next</button>
      </section>

      <section className="home-popular">
        <h2>Top Rated Films</h2>

        {loading && <p>Loading…</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <div className={`poster-row ${topRatedCarousel.isTransitioning ? "fade-out" : "fade-in"}`}>
            {topRatedCarousel.currentItems.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
        <button onClick={topRatedCarousel.next}>Next</button>
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
