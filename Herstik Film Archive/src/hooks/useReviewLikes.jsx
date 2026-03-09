import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getReviewLikeCount,
  hasUserLikedReview,
  toggleReviewLike
} from "../services/reviewLikeService";

export function useReviewLikes(reviewId) {

  const { session } = useAuth();

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!reviewId) return;

    async function loadLikes() {
      try {

        const count = await getReviewLikeCount(reviewId);
        setLikeCount(count);

        if (session?.user) {
          const likedStatus = await hasUserLikedReview(
            reviewId,
            session.user.id
          );
          setLiked(likedStatus);
        }

      } catch (err) {
        console.error("Review likes load failed:", err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLikes();

  }, [reviewId, session?.user]);

  async function handleToggleLike() {

    if (!session?.user) return;

    try {

      const newLikedState = await toggleReviewLike(
        reviewId,
        session.user.id
      );

      setLiked(newLikedState);

      setLikeCount(prev =>
        newLikedState ? prev + 1 : prev - 1
      );

    } catch (err) {
      console.error("Review like toggle failed:", err.message);
    }
  }

  return {
    liked,
    likeCount,
    toggleLike: handleToggleLike,
    loading
  };
}