import styles from "./Login.module.scss";
import LoginForm from "../components/LoginForm.jsx";

function Login({ isLoggedIn, setIsLoggedIn }) {
  return (
    <>
      {!isLoggedIn && (
        <div className={styles.container}>
          <h2 className={styles.title}>🔐 Login to FilmDojo</h2>
          <LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      )}
    </>
  );
}

export default Login;
