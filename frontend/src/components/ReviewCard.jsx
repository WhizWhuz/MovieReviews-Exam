import styles from './ReviewCard.module.scss';

function ReviewCard({ review }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <strong>{review.userId?.username || 'Anonymous Ninja'}</strong> rated
        <em> {review.movieId?.title || 'Unknown Film'}</em>
      </div>
      <p className={styles.comment}>💬 {review.comment}</p>
      <span className={styles.rating}>⭐ {review.rating}/5</span>
    </div>
  );
}

export default ReviewCard;
