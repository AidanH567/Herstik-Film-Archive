import { useEffect, useState } from "react";
import { getUserReviews } from "../services/reviewService";
import LoadingCard from "../components/LoadingCard";
import ReviewCard from "../components/RecentReviews";
import { useAuth } from "../context/AuthContext";

export default function ProfileReviews() {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const { session } = useAuth()
    const userName = session?.user?.user_metadata?.name;
    

    useEffect(() => {
        async function loadReviews() {
            try {
                const data = await getUserReviews()
                setReviews(data)
            } catch (err) {
                console.log("Failed to load user reviews:", err.message)
            } finally {
                setLoading(false)
            }
        }
        loadReviews()
    }, [])

    return (
        <div className="reviews-page">
            <h1>{userName ? `${userName}'s` : "User"} Reviews</h1>
            <hr />

            <section className="review-grid">
                {loading
                    ? Array.from({ length: 3 }).map((_, i) => <LoadingCard key={i} />)
                    : reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} variant="profile" />
                    ))}

            </section>

        </div>
    );
}