import { Link } from "react-router-dom";
import Poster from "/poster.webp";
// import movies from "../data/movies.js";
import MovieCard from "../components/MovieCard.jsx";
import ReviewCard from "../components/RecentReviews.jsx";
// import review from "../data/review.js"
import "../App.css";
import { getTrendingMovies } from "../services/tmdb.js";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500"

  useEffect(() => {
    async function loadMovies() {
      try {
        const results = await getTrendingMovies()

        const mapped = results.map(movie => ({
          id: movie.id,
          title: movie.title,
          poster: movie.poster_path
            ? IMAGE_BASE + movie.poster_path
            : null,
        }))

        setMovies(mapped)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

  if (loading) return <p>Loading…</p>
  if (error) return <p>Error: {error}</p>

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
      poster: "https://image.tmdb.org/t/p/w500/8UdZ5KX6Q2G0G7YV1c6ZsZqY1tA.jpg",
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
      poster: "https://image.tmdb.org/t/p/w500/5GA3vV1aWWHTSDO5eno8V5zDo8r.jpg",
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

        <div className="hero-text">
          <div
            className="hero-bg"
            style={{ backgroundImage: `url(${Poster})` }}
          />
          <h1>Herstik Film Archive</h1>
          <p>Log films, build lists, and track your ratings over time.</p>
          <div className="hero-actions">
            <Link className="btn" to="/films">Browse films</Link>
            <Link className="btn btn-secondary" to="/signup">Create account</Link>
          </div>
        </div>
      </section>


      <section className="home-popular">
        <h2>Popular this week</h2>

        <div className="poster-row">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="home-popular">
        <h2>New Films</h2>

        <div className="poster-row">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="reviews">
      <h2>Recent reviews</h2>

        <div className="reviews-grid">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

    </div>
  );
}