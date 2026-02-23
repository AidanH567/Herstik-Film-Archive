import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getMovieCredits } from "../services/tmdb";
import { useEffect, useState } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewsList from "../components/ReviewsList";
import { getReviewsForMovie } from "../services/reviewService";

export default function FilmDetail() {

    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showReviewForm, setShowReviewForm] = useState(false);

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

        if (!movie?.id) return;   // ⭐⭐⭐⭐⭐ CRITICAL GUARD

        async function loadReviews() {
            try {

                const data = await getReviewsForMovie(movie.id);
                setReviews(data);

            } catch (err) {

                console.error("Failed to load reviews:", err.message);

            }
        }

        loadReviews();

    }, [movie?.id]);   // ⭐⭐⭐⭐⭐ DEPENDENCY FIX

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

            {backdropUrl && (
                <img src={backdropUrl} alt="" className="backdrop" />
            )}

            <section className="detail-section">

                {posterUrl && <img src={posterUrl} alt="" />}

                <div className="text-section">

                    <h1 className="detail-title">{movie.title}</h1>

                    <p>
                        {year} • Directed by{" "}
                        {directors.map(d => d.name).join(", ")}
                    </p>

                    {movie.tagline && <p>{movie.tagline}</p>}

                    <p>{movie.overview}</p>

                </div>
            </section>

            {/* =========================
               REVIEWS SECTION
            ========================= */}

            <section className="reviews-section">

                <h3>Reviews</h3>

                <button
                    onClick={() =>
                        setShowReviewForm(prev => !prev)
                    }
                >
                    {showReviewForm ? "Cancel Review" : "Write Review"}
                </button>

                {showReviewForm && (
                    <ReviewForm
                        movieId={movie.id}
                        onReviewCreated={(review) => {

                            setReviews(prev => [review, ...prev]);
                            setShowReviewForm(false);  // ⭐ NICE UX

                        }}
                    />
                )}

                <ReviewsList reviews={reviews} />

            </section>
        </div>
    );
}