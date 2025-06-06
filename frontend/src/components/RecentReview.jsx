// components/RecentReview.jsx
import styles from "./RecentReview.module.scss";

const RecentReview = ({ review }) => {
  return (
    <div className={styles.card}>
      <p className={styles.rating}>⭐ {review.rating}/5</p>
      <p className={styles.comment}>"{review.comment}"</p>
      <p className={styles.userId}>
        User: {review.userId?.username || "Anonymous"}
      </p>
    </div>
  );
};

export default RecentReview;
