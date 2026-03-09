import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  toggleMovieLike,
  getMovieLikeCount,
  hasUserLikedMovie
} from "../services/movieLikeService"; // adjust path if needed

export function useMovieLikes(movie) {
  const { session } = useAuth();

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movie?.id) return;

    async function loadLikes() {
      try {
        // Get total likes
        const count = await getMovieLikeCount(movie.id);
        setLikeCount(count);

        // Check if current user has liked
        if (session?.user) {
          const likedStatus = await hasUserLikedMovie(
            movie.id,
            session.user.id
          );
          setLiked(likedStatus);
        }
      } catch (err) {
        console.error("Failed to load movie likes:", err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLikes();
  }, [movie?.id, session?.user]);

  async function handleToggleLike() {
    if (!session?.user || !movie) return;

    try {
      const newLikedState = await toggleMovieLike(movie, session.user.id);
      setLiked(newLikedState);

      setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
    } catch (err) {
      console.error("Failed to toggle movie like:", err.message);
    }
  }

  return {
    liked,
    likeCount,
    toggleLike: handleToggleLike,
    loading
  };
}