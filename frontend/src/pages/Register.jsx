import styles from "./Register.module.scss";
import RegisterForm from "../components/RegisterForm";

function Register({ setIsLoggedIn, isLoggedIn }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🧾 Register to FilmDojo</h2>
      <RegisterForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default Register;
