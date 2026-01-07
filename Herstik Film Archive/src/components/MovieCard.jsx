export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        className="movie-poster"
        src={movie.poster}
        alt={movie.title}
      />
    </div>
  )
}