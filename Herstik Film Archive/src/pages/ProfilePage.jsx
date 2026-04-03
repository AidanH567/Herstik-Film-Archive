import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import ReviewCard from "../components/RecentReviews";
import { getFavoriteMovies } from "../services/profileService";
import { getLikedMoviesByUserId } from "../services/likeService";
import { getUserReviews } from "../services/reviewService";
import { getListsByUserId } from "../services/listService";

export default function ProfilePage() {
  const { profile } = useOutletContext();

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [lists, setLists] = useState([]);

  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [loadingLikes, setLoadingLikes] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingLists, setLoadingLists] = useState(true);

  useEffect(() => {
    async function loadProfileContent() {
      try {
        const [favoritesData, likedMoviesData, reviewsData, listsData] =
          await Promise.all([
            getFavoriteMovies(profile.id),
            getLikedMoviesByUserId(profile.id),
            getUserReviews(profile.id),
            getListsByUserId(profile.id),
          ]);

        setFavoriteMovies(favoritesData || []);
        setLikedMovies(likedMoviesData || []);
        setReviews(reviewsData || []);
        setLists(listsData || []);
      } catch (err) {
        console.error("Failed to load profile content:", err.message);
      } finally {
        setLoadingFavorites(false);
        setLoadingLikes(false);
        setLoadingReviews(false);
        setLoadingLists(false);
      }
    }

    if (profile?.id) {
      loadProfileContent();
    }
  }, [profile?.id]);

  return (
    <div className="profile-page">

      <div className="profile-fav-films">
        <h2>Favourite Films</h2>
        <hr />

        <div className="poster-row">
          {loadingFavorites ? (
            <p>Loading favourite films...</p>
          ) : favoriteMovies.length > 0 ? (
            favoriteMovies.slice(0, 4).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No favourite films yet.</p>
          )}
        </div>
      </div>

      <div className="profile-fav-films">
        <h2>Recent Likes</h2>
        <hr />

        <div className="poster-row">
          {loadingLikes ? (
            <p>Loading recent likes...</p>
          ) : likedMovies.length > 0 ? (
            likedMovies.slice(0, 4).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>No liked movies yet.</p>
          )}
        </div>
      </div>

      <div className="profile-reviews">
        <h2>Reviews</h2>
        <hr />

        <div className="reviews-grid">
          {loadingReviews ? (
            <p>Loading reviews...</p>
          ) : reviews.length > 0 ? (
            reviews.slice(0, 4).map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onDelete={(id) =>
                  setReviews((prev) => prev.filter((r) => r.id !== id))
                }
              />
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>

      <div className="profile-lists">
        <h2>Lists</h2>
        <hr />

        <div className="profile-lists-preview">
          {loadingLists ? (
            <p>Loading lists...</p>
          ) : lists.length > 0 ? (
            lists.slice(0, 4).map((list) => (
              <div key={list.id} className="profile-list-preview-card">
                <h3>{list.name}</h3>
                {list.description && <p>{list.description}</p>}
              </div>
            ))
          ) : (
            <p>No lists yet.</p>
          )}
        </div>
      </div>

    </div>
  );
}