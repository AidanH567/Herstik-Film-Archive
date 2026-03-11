import { useEffect, useState } from "react";

import ReviewCard from "../components/RecentReviews"; 
import { getLikedReviews } from "../services/reviewLikeService"; 
import LoadingCard from "../components/LoadingCard"; 

export default function LikedReviews() {

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadReviews() {
      try {
        const data = await getLikedReviews();
        setReviews(data);
      } catch (err) {
        console.error("Failed to load liked reviews:", err.message);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();

  }, []);

  return (
    <div className="liked-reviews-page">

      

      <div className="reviews-grid">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <LoadingCard key={i} />
            ))
          : reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
              />
            ))
        }
      </div>

    </div>
  );
}