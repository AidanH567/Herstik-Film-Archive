import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toggleMovieLike, getMovieLikeCount, hasUserLikedMovie } from "../services/movieLikeService";

export function useLikedMovie(movie) {
  const { session } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movie?.tmdb_id) return;

    async function loadLikes() {
      try {
        // 1️⃣ Ensure the movie exists in Supabase
        // toggleMovieLike will upsert if missing, so for just loading likes we need DB id
        let dbMovieId = movie.id;

        if (!dbMovieId) {
          // Try to find it
          const { data: dbMovie, error } = await supabase
            .from("movies")
            .select("id")
            .eq("tmdb_id", movie.tmdb_id)
            .maybeSingle();

          if (error) throw error;
          dbMovieId = dbMovie?.id;
        }

        if (!dbMovieId) {
          setLikeCount(0);
          setLiked(false);
          setLoading(false);
          return;
        }

        const count = await getMovieLikeCount(dbMovieId);
        setLikeCount(count);

        if (session?.user) {
          const userLiked = await hasUserLikedMovie(dbMovieId, session.user.id);
          setLiked(userLiked);
        }
      } catch (err) {
        console.error("Failed to load movie likes:", err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLikes();
  }, [movie?.tmdb_id, session?.user]);

  async function handleToggleLike() {
    if (!session?.user || !movie) return;

    try {
      const newLiked = await toggleMovieLike(movie, session.user.id);
      setLiked(newLiked);
      setLikeCount(prev => (newLiked ? prev + 1 : prev - 1));
    } catch (err) {
      console.error("Failed to toggle movie like:", err.message);
    }
  }

  return { liked, likeCount, toggleLike: handleToggleLike, loading };
}