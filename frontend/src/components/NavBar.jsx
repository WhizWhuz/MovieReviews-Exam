import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.scss";
import { useState } from "react";
import { motion } from "framer-motion";

function NavBar({ setIsLoggedIn, isLoggedIn }) {
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.links}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/movie-list">Movie List</Link>
        </li>
        <li>
          <Link to="/reviews">Reviews</Link>
        </li>
      </ul>

      {/* 🟡 Hover Trigger Zone */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "20px",
          zIndex: 200,
        }}
        onMouseEnter={() => setShowDrawer(true)}
      ></div>

      {/* 🟢 Sliding Login/Register Drawer */}
      <motion.div
        initial={{ x: -240 }}
        animate={{ x: showDrawer ? 0 : -240 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseLeave={() => setShowDrawer(false)}
        style={{
          position: "fixed",
          top: 0,
          padding: "2em 0em",
          left: 0,
          width: "240px",
          height: "fit-content",
          backgroundColor: "#8b8b8b",
          display: "flex",
          gap: "1em",
          borderRadius: "0.5em",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 150,
        }}
      >
        {isLoggedIn && (
          <div>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/login">
              <button className={styles.loginButton}>Login</button>
            </Link>
            <Link to="/register">
              <button className={styles.loginButton}>Register</button>
            </Link>
          </>
        )}
      </motion.div>
    </nav>
  );
}

export default NavBar;
