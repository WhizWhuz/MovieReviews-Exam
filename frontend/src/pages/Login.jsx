import styles from "./Login.module.scss";
import LoginForm from "../components/LoginForm.jsx";

function Login() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🔐 Login to FilmDojo</h2>
      <LoginForm />
    </div>
  );
}

export default Login;
