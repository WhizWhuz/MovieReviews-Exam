import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss";

function NavBar() {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.logo}>🎥 FilmDojo</h1>
      <ul className={styles.links}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/reviews">Reviews</Link>
        </li>
        <li>
          <Link to="/add-movie">Add Movie</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
