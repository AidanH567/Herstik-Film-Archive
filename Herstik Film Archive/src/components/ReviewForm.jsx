import { useState } from "react";
import { createReview } from "../services/reviewService";


export default function ReviewForm({ movieId, onReviewCreated, onClose }) {

    const [rating, setRating] = useState(0.5)
    const [text, setText] = useState("")
    const [saving, setSaving] = useState(false)
    console.log("rating:", rating)


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

    return (
        <form onSubmit={handleSubmit} className="review-form">

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
            <textarea value={text} onChange={(e) => setText(e.target.value)}
                rows="4"></textarea>

            <button disabled={saving}>
                {saving ? "Saving..." : "Post Review"}
            </button>

        </form>
    )



}