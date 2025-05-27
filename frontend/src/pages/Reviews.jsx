import { useEffect, useState } from 'react';
import styles from './Reviews.module.scss';
import ReviewCard from '../components/ReviewCard';

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/reviews')
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews || data); // handle both shapes
      })
      .catch((err) => console.error('Failed to fetch reviews:', err));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📝 Latest Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to speak.</p>
      ) : (
        <div className={styles.list}>
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Reviews;
