import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getMovieCredits } from "../services/tmdb";
import { useEffect, useState } from "react";
import ReviewForm from "../components/ReviewForm";
import ReviewsList from "../components/ReviewsList";

export default function FilmDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [credits, setCredits] = useState(null)
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviews, setReviews] = useState([]);

    console.log(movie)

    // useEffect(() => {
    //     async function loadReviews() {
    //         try {
    //             const data = await getReviewsForMovie(movie.id);
    //             setReviews(data);
    //         } catch (err) {
    //             console.error("Failed to load reviews:", err.message);
    //         }
    //     }

    //     loadReviews();
    // }, [movie.id]);


    const directors = credits?.crew.filter(
        person => person.job === "Director"
    )

    const POSTER_BASE = "https://image.tmdb.org/t/p/w500"
    const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280"

    useEffect(() => {
        async function load() {
            try {
                setLoading(true)

                const [movieData, creditsData] = await Promise.all([
                    getMovieDetails(id),
                    getMovieCredits(id),
                ])

                console.log("Credits:", creditsData)
                console.log("Movie Data:", movieData)

                setMovie(movieData)
                setCredits(creditsData)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [id])

    if (loading) return <p>Loading…</p>
    if (error) return <p>Error: {error}</p>
    if (!movie) return <p>Not found</p>

    const posterUrl = movie.poster_path ? POSTER_BASE + movie.poster_path : null
    const backdropUrl = movie.backdrop_path ? BACKDROP_BASE + movie.backdrop_path : null

    const year = movie.release_date ? movie.release_date.slice(0, 4) : ""
    const genres = movie.genres?.map(g => g.name).join(" • ") || ""
    return (
        <div className="film-detail">
            <img src={backdropUrl} alt="" className="backdrop" />
            <section className="detail-section">
                <img src={posterUrl} alt="" />
                <div className="text-section">
                    <h1 className="detail-title">{movie.title}</h1>
                    <p>{year} Directed By {directors.map(d => d.name).join(", ")} </p>
                    <p>{movie.tagline}</p>
                    <p>{movie.overview}</p>
                </div>
            </section>

            <section className="reviews-section">

                <h3>Reviews</h3>

                <button onClick={() => setShowReviewForm(true)}>
                    Write Review
                </button>

                {showReviewForm && (
                    <ReviewForm
                        movieId={movie.id}
                        onReviewCreated={(review) =>
                            setReviews(prev => [review, ...prev])
                        }
                    />
                )}

                <ReviewsList reviews={reviews} />

            </section>
        </div>
    );
}