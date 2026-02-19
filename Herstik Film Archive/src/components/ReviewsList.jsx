export default function ReviewsList({ reviews, onDelete }) {

  if (reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  return (
    <div className="reviews-list">

      {reviews.map(review => (
        <div key={review.id} className="review-card">

          <strong>{review.user?.name}</strong>
          <span>{review.rating}/5</span>

          {review.text && <p>{review.text}</p>}

        </div>
      ))}

    </div>
  );
}