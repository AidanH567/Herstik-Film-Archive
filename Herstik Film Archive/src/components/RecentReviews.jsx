import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { deleteReview } from "../services/reviewService";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"
import { useReviewLikes } from "../hooks/useReviewLikes";


export default function ReviewCard({ review, movie: movieProp, onDelete }) {
  console.log("movieProp:", movieProp)

  const { session } = useAuth()
  const currentUserId = session?.user?.id

  const {
  liked,
  likeCount,
  toggleLike
} = useReviewLikes(review.id);

  async function handleDelete() {
    console.log("DELETE CLICKED", review.id)
    console.log("review.user_id:", review.user_id)
    console.log("currentUserId:", currentUserId)
    try {
      await deleteReview(review.id)
      onDelete?.(review.id) // tell parent to remove it from state
    } catch (err) {
      console.error("Delete failed:", err.message)
    }
  }

  function renderStars(rating = 0) {
  const stars = []

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} />)
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} />)
    } else {
      stars.push(<FaRegStar key={i} />)
    }
  }

  return stars
}

 

  const POSTER_BASE = "https://image.tmdb.org/t/p/w500"
  const CHARACTER_LIMIT = 120

  const movie = movieProp || review.movie

  const [expanded, setExpanded] = useState(false)

  const isLong = review.text.length > CHARACTER_LIMIT

  const posterUrl = movie.poster_path
    ? POSTER_BASE + movie.poster_path
    : null

  const displayText = expanded || !isLong
    ? review.text
    : review.text.slice(0, CHARACTER_LIMIT) + "..."

  return (
    <article className="review-card">

      {posterUrl && (
        <Link to={`/films/${movie.tmdb_id}`}>
          <img
            className="review-poster"
            src={posterUrl}
            alt={movie.title}
          />
        </Link>
      )}

      <div className="review-content">

        <div className="review-header">

          <span className="review-film">
            {movie.title} {movie.release_date?.slice(0, 4)}
          </span>

          <span className="review-user">
            {review.user?.name}
          </span>

        </div>

        <div className="review-rating">
          <span className="stars">
            {renderStars(review.rating)}
          </span>
        </div>

        <p className="review-text">
          {displayText}
        </p>

        {isLong && (
          <button
            onClick={() => setExpanded(prev => !prev)}
            style={{
              background: "none",
              border: "none",
              color: "#888",
              cursor: "pointer",
              padding: 0
            }}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}

        {currentUserId === review.user_id && (
          <button onClick={handleDelete}
            className="review-delete-button">
            Delete
          </button>
        )}

         <button className="popular-list-like-btn" onClick={toggleLike}>
          {liked ? "♥" : "♡"} {likeCount}
        </button>

      </div>
    </article>
  )
}