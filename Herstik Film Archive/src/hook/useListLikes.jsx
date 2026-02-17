import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getLikeCount,
  hasUserLiked,
  toggleLike
} from "../services/likeService";

export function useListLikes(listId) {

  const { session } = useAuth();

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!listId) return;

    async function loadLikes() {
      try {

        const count = await getLikeCount(listId);
        setLikeCount(count);

        if (session?.user) {
          const likedStatus = await hasUserLiked(
            listId,
            session.user.id
          );
          setLiked(likedStatus);
        }

      } catch (err) {
        console.error("Likes load failed:", err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLikes();

  }, [listId, session?.user]);

  async function handleToggleLike() {

    if (!session?.user) return;

    try {

      const newLikedState = await toggleLike(
        listId,
        session.user.id
      );

      setLiked(newLikedState);

      setLikeCount(prev =>
        newLikedState ? prev + 1 : prev - 1
      );

    } catch (err) {
      console.error("Like toggle failed:", err.message);
    }
  }

  return {
    liked,
    likeCount,
    toggleLike: handleToggleLike,
    loading
  };
}
