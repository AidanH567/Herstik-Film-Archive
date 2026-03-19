import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import ProfileHeader from "../components/ProfileHeader";
import ProfileNavBar from "../components/ProfileNavBar";
import useTrendingMovies from "../hooks/useTrendingMovies";
import { getRecentReviews } from "../services/reviewService";
import ReviewCard from "../components/RecentReviews";



export default function ProfilePage() {

    const { movies, loading, error } = useTrendingMovies()

    const [reviews, setReviews] = useState([])
    const [loadingReviews, setLoadingReviews] = useState(true)

    useEffect(() => {
        async function loadReviews() {
            try {
                const data = await getRecentReviews(8)
                setReviews(data)
            } catch (err) {
                console.error("Failed to load recent reviews:", err.message)
            } finally {
                setLoadingReviews(false)
            }
        }

        loadReviews()
    }, [])

    return (
        <div className="profile-page">

            <div className="profile-fav-films">

                <h2>Favourite Films</h2>
                <hr />

                <div className="poster-row">
                    {movies.slice(0, 4).map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>

            <div className="profile-fav-films">

                <h2>Favourite Films</h2>
                <hr />

                <div className="poster-row">
                    {movies.slice(0, 4).map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>

            <div className="profile-reviews">

                <h2>Reviews</h2>
                <hr />

                <div className="reviews-grid">
                    {reviews.slice(0, 4).map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            onDelete={(id) =>
                                setReviews(prev => prev.filter(r => r.id !== id))
                            } />
                    ))}
                </div>
            </div>

            <div className="profile-lists">

                <h2>Lists</h2>
                <hr />

                <div className="poster-row">
                    {movies.slice(0, 4).map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>




        </div>
    )
}