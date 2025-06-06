import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reviews from "./pages/Reviews";
import AddMovie from "./pages/AddMovie";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/protectedRoute";
import Register from "./pages/Register";
import { useState } from "react";
import MovieListPage from "./pages/MovieListPage";
import Footer from "./components/Footer";
import styles from "./App.module.scss"; // 👈 Make sure this file exists

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <div className={styles.page}>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/register"
            element={
              <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route path="/movie-list" element={<MovieListPage />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route
            path="/add-movie"
            element={
              <ProtectedRoute role="admin">
                <AddMovie />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
