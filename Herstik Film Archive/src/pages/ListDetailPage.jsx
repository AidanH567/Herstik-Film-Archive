import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { getListById, getMoviesForList } from "../services/listService";
import ListMovieCard from "../components/ListMovieCard";
import { addComment, deleteComment, getCommentsForList } from "../services/commentService";
import { useAuth } from "../context/AuthContext";
import { getReviewsForMovie } from "../services/reviewService";

export default function ListDetailPage() {
  const { listId } = useParams();

  const [list, setList] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");



  const { session } = useAuth()

  useEffect(() => {

    if (!listId) return;

    async function loadComments() {
      try {
        const data = await getCommentsForList(listId);
        setComments(data);
      } catch (err) {
        console.error("Failed to load comments:", err.message);
      }
    }

    loadComments();

  }, [listId]);



  async function handleAddComment() {

    if (!session?.user) return;
    if (!newComment.trim()) return;

    try {

      await addComment(
        listId,
        session.user.id,
        newComment
      );

      setNewComment("");

      // Reload comments ⭐⭐⭐⭐⭐
      const updated = await getCommentsForList(listId);
      setComments(updated);

    } catch (err) {
      console.error("Comment failed:", err.message);
    }
  }

  async function handleDeleteComment(commentId) {

    const confirmed = confirm("Delete comment?");
    if (!confirmed) return;

    try {

      await deleteComment(commentId);

      // ✅ Instantly update UI (important)
      setComments(prev =>
        prev.filter(comment => comment.id !== commentId)
      );

    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  }


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
          <span>
            List by <strong>{list.user?.name}</strong>
          </span>
          <span className="list-detail-created">Created {new Date(list.created_at).toLocaleDateString()}</span>

        </section>
        <hr />


        <section className="list-detail-info">
          <h1>{list.name}</h1>

          {list.description && (
            <p className="list-description">
              {list.description}
            </p>
          )}
          <hr />
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

        <section className="comments-section">

          <h3>Comments</h3>

          <div className="add-comment">

            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
            />

            <button onClick={handleAddComment}>
              Post Comment
            </button>

          </div>

          <div className="comments-list">

            {comments.map(comment => {

              const isOwner = session?.user?.id === comment.user_id;

              return (
                <div key={comment.id} className="comment">

                  <strong>{comment.user?.name}</strong>

                  <p>{comment.comment}</p>

                  {isOwner && (
                    <button
                      className="delete-comment-btn"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      🗑
                    </button>
                  )}

                </div>
              )
            })}

          </div>

        </section>

      </div>

      <div className="my-lists-sidebar">
        <Link to="/lists/new">Create a New List....</Link>
      </div>

    </div>
  )
};

