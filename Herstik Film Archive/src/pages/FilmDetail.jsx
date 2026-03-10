import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getMovieCredits } from "../services/tmdb";
import { useEffect, useState } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewsList from "../components/ReviewsList";
import { getReviewsForMovie } from "../services/reviewService";
import { getOrCreateMovie } from "../services/reviewService";
import { supabase } from "../supabase-client";
import ReviewCard from "../components/RecentReviews";
import { useMovieLikes } from "../hooks/useMovieLikes";

export default function FilmDetail() {

    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    console.log("Movie in FilmDetail:", movie)
    // console.log("Movie in FilmDetail:", movie)
    const [credits, setCredits] = useState(null);
    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [dbMovieId, setDbMovieId] = useState(null)

    const [showReviewForm, setShowReviewForm] = useState(false);

    const { liked, likeCount, toggleLike, loading: movieloading } = useMovieLikes(movie);

    const POSTER_BASE = "https://image.tmdb.org/t/p/w500";
    const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";

    /* =========================
       LOAD MOVIE + CREDITS
    ========================= */

    useEffect(() => {

        async function loadMovie() {
            try {

                setLoading(true);

                const [movieData, creditsData] = await Promise.all([
                    getMovieDetails(id),
                    getMovieCredits(id),
                ]);

                setMovie(movieData);
                setCredits(creditsData);

            } catch (err) {

                setError(err.message);

            } finally {

                setLoading(false);

            }
        }

        loadMovie();

    }, [id]);

    /* =========================
       LOAD REVIEWS (FIXED ⭐⭐⭐⭐⭐)
    ========================= */

    useEffect(() => {
        if (!movie?.id) return;

        async function loadReviews() {
            try {

                // 🔎 Check if movie exists locally (DO NOT create it)
                const { data: existing } = await supabase
                    .from("movies")
                    .select("id")
                    .eq("tmdb_id", movie.id)
                    .single()

                if (!existing) {
                    setReviews([])
                    setDbMovieId(null)
                    return
                }

                setDbMovieId(existing.id)

                const data = await getReviewsForMovie(existing.id)
                setReviews(data)

            } catch (err) {
                console.error("Failed to load reviews:", err.message)
            }
        }

        loadReviews()

    }, [movie?.id])  // ⭐⭐⭐⭐⭐ DEPENDENCY FIX

    /* =========================
       SAFE DIRECTORS LOGIC ⭐⭐⭐⭐⭐
    ========================= */

    const directors =
        credits?.crew?.filter(person => person.job === "Director") || [];

    if (loading) return <p>Loading…</p>;
    if (error) return <p>Error: {error}</p>;
    if (!movie) return <p>Not found</p>;

    const posterUrl =
        movie.poster_path ? POSTER_BASE + movie.poster_path : null;

    const backdropUrl =
        movie.backdrop_path ? BACKDROP_BASE + movie.backdrop_path : null;

    const year =
        movie.release_date ? movie.release_date.slice(0, 4) : "";

    return (
        <div className="film-detail">

            <div className="film-detail-backdrop">
                {backdropUrl && (
                    <img src={backdropUrl} alt="" className="backdrop" />
                )}
            </div>

            <section className="detail-section">

                {posterUrl && <img src={posterUrl} alt="" />}

                <div className="text-section">

                    <h1 className="detail-title">{movie.title}</h1>

                    <p>
                        {year} • Directed by{" "}
                        {directors.map(d => d.name).join(", ")} • Rating: {" "}
                        {Math.floor(movie.vote_average) / 2} ⭐
                    </p>

                    {movie.tagline && <p>{movie.tagline}</p>}

                    <p>{movie.overview}</p>


                </div>

            </section>

            {/* =========================
               REVIEWS SECTION
            ========================= */}

            <section className="reviews-section">
                <div className="review-button-container">
                    <h3>Reviews</h3>

                    <button className="review-button"
                        onClick={async () => {

                            if (!dbMovieId) {
                                const dbMovie = await getOrCreateMovie(movie)
                                setDbMovieId(dbMovie.id)
                            }

                            setShowReviewForm(prev => !prev)
                        }}
                    >
                        {showReviewForm ? "Cancel Review" : "Write Review"}
                    </button>

                    {movieloading ? (
                        <p>Loading likes...</p>
                    ) : (
                        <button className="popular-list-like-btn btn-film-detail" onClick={toggleLike}>
                            {liked ? "💖" : "🤍"} {likeCount}
                        </button>
                    )}

                </div>

                {showReviewForm && (
                    <div
                        className="review-modal-overlay"
                        onClick={() => setShowReviewForm(false)} // click on overlay closes modal
                    >
                        <div
                            className="review-modal"
                            onClick={(e) => e.stopPropagation()} // prevent clicks inside modal from closing
                        >
                            <ReviewForm
                                movieId={dbMovieId}
                                onReviewCreated={(review) => {
                                    setReviews(prev => [review, ...prev]);
                                    setShowReviewForm(false);
                                }}
                                movie={movie}
                                credits={credits}
                            />
                        </div>
                    </div>
                )}

                <div className="reviews-grid">
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            movie={movie}
                            onDelete={(id) =>
                                setReviews(prev => prev.filter(r => r.id !== id))
                            }
                        />
                    ))}
                </div>

            </section>
        </div>
    );
}