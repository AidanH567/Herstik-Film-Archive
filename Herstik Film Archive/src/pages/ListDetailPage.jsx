import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { getListById, getMoviesForList } from "../services/listService";
import ListMovieCard from "../components/ListMovieCard";

export default function ListDetailPage() {
  const { listId } = useParams();

  const [list, setList] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadList() {
      try {
        const listData = await getListById(listId);
        const movieData = await getMoviesForList(listId);

        setList(listData);
        setMovies(movieData);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadList();
  }, [listId]);

  if (loading) return <p>Loading list...</p>;
  if (!list) return <p>List not found.</p>;

  return (
    <div className="list-detail-page">
      <div className="list-detail-box">

        <section className="featured-list-profile">
          <img
            src="/profile-photo.jpg"
            alt="Profile"
            className="profile-photo"
          />
          <span>List by <strong>You</strong></span>
          <hr />
        </section>

        <section className="list-detail-time-posted">
          <p>Created {new Date(list.created_at).toLocaleDateString()}</p>
          <hr />
        </section>

        <section className="list-detail-info">
          <h2>{list.name}</h2>
          {list.description && (
            <p className="list-description">
              {list.description}
            </p>
          )}
        </section>

        <section className="list-detail-movies">
          {movies.length === 0 && <p>This list has no movies yet.</p>}

          <div className="list-detail-movies-grid">
            {movies.map((movie, index) => (
              <div key={movie.id} className="list-detail-movie">
                <ListMovieCard movie={movie} />
                <span>{index + 1}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
