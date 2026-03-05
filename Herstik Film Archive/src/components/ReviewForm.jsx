import { useState } from "react";
import { createReview } from "../services/reviewService";


export default function ReviewForm({ movieId, onReviewCreated, onClose, movie, credits }) {

    const [rating, setRating] = useState(0.5)
    const [text, setText] = useState("")
    const [saving, setSaving] = useState(false)


    async function handleSubmit(e) {

        e.preventDefault();

        try {
            setSaving(true)

            const review = await createReview({
                movieId,
                rating,
                text
            })

            onReviewCreated(review)

            setRating(0.5)
            setText("")

            onClose?.()

        } catch (err) {
            console.error("Review Failed", err.message)
        } finally {
            setSaving(false)
        }
    }

    const POSTER_BASE = "https://image.tmdb.org/t/p/w500"

    const posterUrl =
        movie.poster_path ? POSTER_BASE + movie.poster_path : null;

    const year =
        movie.release_date ? movie.release_date.slice(0, 4) : "";

    const directors =
        credits?.crew?.filter(person => person.job === "Director") || [];

    return (
        <form onSubmit={handleSubmit} className="review-form">

            <div className="review-img-container">

                <img
                    className="review-poster"
                    src={posterUrl}
                    alt={movie.title}
                />
            </div>


            <div className="review-inputs">
                <div className="review-movie-year">
                    <h2>{movie.title}</h2><span>{year}</span>
                </div>

                <h3 className="review-directors">
                    Directors: {directors.map(d => d.name).join(", ")}
                </h3>

                <label >Rating</label>
                <select value={rating || rating === 0 ? rating : 0.5} onChange={(e) => setRating(Number(e.target.value))}>
                    <option value={0.5}>⯨</option>
                    <option value={1}>★</option>
                    <option value={1.5}>★⯨</option>
                    <option value={2}>★★</option>
                    <option value={2.5}>★★⯨</option>
                    <option value={3}>★★★</option>
                    <option value={3.5}>★★★⯨</option>
                    <option value={4}>★★★★</option>
                    <option value={4.5}>★★★★⯨</option>
                    <option value={5}>★★★★★</option>
                </select>

                <label>Review</label>
                <textarea className="review-textarea" value={text} onChange={(e) => setText(e.target.value)}
                    rows="4"></textarea>

                <button className="review-button" disabled={saving}>
                    {saving ? "Saving..." : "Post Review"}
                </button>
            </div>

        </form>
    )



}