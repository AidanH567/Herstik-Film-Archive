export default function ReviewsList({ reviews, onDelete }) {

  if (reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  return (
    <div className="reviews-list">

      {reviews.map(review => (
        <ReviewCard
          key={review.id}
          review={review}
          movie={movie}
        />
      ))}

    </div>
  );
}