export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div
        className="movie-poster"
        aria-label={movie.title}
      />
      <img src={movie.poster} alt={movie.title} />
    </div>
  )
}