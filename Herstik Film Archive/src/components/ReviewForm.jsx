import { useState } from "react";
import { createReview } from "../services/reviewService";


export default function ReviewForm({ movieId, onReviewCreated }) {

    const [rating, setRating] = useState(0)
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

            setRating(0)
            setText("")

        } catch (err) {
            console.error("Review Failed", err.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="review-form">

            <label >Rating</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>

            <label>Review</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)}
                rows="4"></textarea>

            <button disabled={saving}>
                {saving ? "Saving..." : "Post Review"}
            </button>

        </form>
    )



}