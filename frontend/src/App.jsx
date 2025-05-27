import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reviews from "./pages/Reviews";
import AddMovie from "./pages/AddMovie";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/protectedRoute";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
    </>
  );
}

export default App;
