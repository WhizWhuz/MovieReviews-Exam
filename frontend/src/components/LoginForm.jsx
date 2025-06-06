import { useState } from "react";
import styles from "./LoginForm.module.scss";
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton"; // adjust path if needed

function LoginForm({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoginClick = async () => {
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // ⚠️ Let animation run FIRST
        setTimeout(() => {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          navigate("/reviews");
        }, 3500); // start delay *after paint*, minimum async wait

        // This delay is to keep user on the same page for 3.5s
        await new Promise((resolve) => setTimeout(resolve, 3500));
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <form className={styles.form}>
      <input
        name="username"
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className={styles.input}
      />
      <LoginButton onClick={handleLoginClick} />
    </form>
  );
}

export default LoginForm;
