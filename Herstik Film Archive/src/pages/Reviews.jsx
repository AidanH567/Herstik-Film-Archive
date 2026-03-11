import { useState, useEffect } from "react";
import LoadingCard from "../components/LoadingCard";
import ReviewCard from "../components/RecentReviews";
import { getUserReviews} from "../services/reviewService"

export default function Reviews() {

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await getUserReviews()
        setReviews(data)
      } catch (err){
        console.log("Failed to load user reviews:", err.message)
      } finally {
        setLoading(false)
      }
    }
    loadReviews()
  },[])

  return (
    <div className="reviews-page">
      <div>Review Page</div>

      <section className="review-grid">
        {loading 
        ? Array.from({length:3 }).map((_,i) => <LoadingCard key={i}/>)
        : reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}

      </section>

    </div>
  );
}