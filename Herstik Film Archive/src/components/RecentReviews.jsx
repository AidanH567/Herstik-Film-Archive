import "../App.css"

export default function ReviewCard({ review }) {
  const {
    user,
    movie,
    rating,
    ratingCount,
    reviewText,
    likes,
  } = review

  return (
    <article className="review-card">
      {/* Poster */}
      <img
        className="review-poster"
        src={movie.poster}
        alt={`${movie.title} (${movie.year})`}
      />

      {/* Content */}
      <div className="review-content">
        {/* Header */}
        <div className="review-header">
          <span className="review-user">{user.displayName}</span>
          <span className="review-film">
            {movie.title} {movie.year}
          </span>
        </div>

        {/* Rating */}
        <div className="review-rating">
          <span className="stars">★★★★½</span>
          <span className="rating-count">{ratingCount}</span>
        </div>

        {/* Review text */}
        <p className="review-text">
          {reviewText}
        </p>

        {/* Footer */}
        <div className="review-footer">
          <span className="review-likes">
            Like review · {likes.toLocaleString()} likes
          </span>
        </div>
      </div>
    </article>
  )
}