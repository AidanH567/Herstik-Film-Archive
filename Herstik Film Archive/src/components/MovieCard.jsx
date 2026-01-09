import { Link } from 'react-router-dom'

export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/films/${movie.id}`}>
        <img
          className="movie-poster"
          src={movie.poster}
          alt={movie.title}
        />
      </Link>

    </div>
  )
}