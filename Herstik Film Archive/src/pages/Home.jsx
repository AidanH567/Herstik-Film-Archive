import { Link } from "react-router-dom";
import Poster from "/poster.webp";
// import movies from "../data/movies.js";
import MovieCard from "../components/MovieCard.jsx";

export default function Home() {
const movies = [
  {
    id: 550,
    title: "Fight Club",
    poster: "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
  },
  {
    id: 238,
    title: "The Godfather",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  },
  {
    id: 680,
    title: "Pulp Fiction",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  },
  {
    id: 13,
    title: "Forrest Gump",
    poster: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
  },
  {
    id: 122,
    title: "The Lord of the Rings: The Return of the King",
    poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
  },
  {
    id: 155,
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
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


      <section className="home-section">
        <h2>Popular this week</h2>

        <div className="poster-row">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

    </div>
  );
}