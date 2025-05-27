import styles from "./Register.module.scss";
import RegisterForm from "../components/RegisterForm";

function Register() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>🧾 Register to FilmDojo</h2>
      <RegisterForm />
    </div>
  );
}

export default Register;
