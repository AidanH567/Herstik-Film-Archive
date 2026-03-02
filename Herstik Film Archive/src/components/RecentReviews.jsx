export default function ReviewCard({ review, movie }) {

  const POSTER_BASE = "https://image.tmdb.org/t/p/w500"

  const posterUrl = movie.poster_path
    ? POSTER_BASE + movie.poster_path
    : null
console.log(review.user?.name)
  return (
    <article className="review-card">

      {posterUrl && (
        <img
          className="review-poster"
          src={posterUrl}
          alt={movie.title}
        />
      )}

      <div className="review-content">

        <div className="review-header">
          <span className="review-user">
            {review.user?.name}
          </span>

          <span className="review-film">
            {movie.title} ({movie.release_date?.slice(0,4)})
          </span>
        </div>

        <div className="review-rating">
          <span className="stars">
            {"★".repeat(review.rating || 0)}
          </span>
        </div>

        <p className="review-text">
          {review.text}
        </p>

      </div>
    </article>
  )
}