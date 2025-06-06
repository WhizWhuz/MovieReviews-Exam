import React, { useRef } from "react";
import styles from "./LoginButton.module.scss";

const LoginButton = ({ onClick }) => {
  const buttonRef = useRef(null);
  const colorRefs = useRef([]);

  const handleClick = (e) => {
    if (onClick) onClick(e);

    const btn = buttonRef.current;
    if (!btn) return;

    btn.classList.add(styles.clicked);

    colorRefs.current.forEach((el) => {
      if (el) el.classList.add(styles.expanded);
    });

    setTimeout(() => {
      if (btn) btn.classList.remove(styles.clicked);
    }, 3500);

    setTimeout(() => {
      colorRefs.current.forEach((el) => {
        if (el) el.classList.remove(styles.expanded);
      });
    }, 1700);
  };

  return (
    <button
      type="button"
      ref={buttonRef}
      className={styles.btn}
      onClick={handleClick}
    >
      Login
      <span
        className={`${styles.color} ${styles.blue}`}
        ref={(el) => (colorRefs.current[0] = el)}
        data-value="1"
      />
      <span
        className={`${styles.color} ${styles.orange}`}
        ref={(el) => (colorRefs.current[1] = el)}
        data-value="1"
      />
      <span
        className={`${styles.color} ${styles.green}`}
        ref={(el) => (colorRefs.current[2] = el)}
        data-value="1"
      />
      <span
        className={`${styles.color} ${styles.white}`}
        ref={(el) => (colorRefs.current[3] = el)}
        data-value="1"
      />
    </button>
  );
};

export default LoginButton;
