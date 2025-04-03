import '@fortawesome/fontawesome-free/css/all.min.css';
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import HomePage from "./pages/HomePage";
import ViewsPage from "./pages/HotelViewsPage";
import LoginPage from "./pages/LoginPage";
import RoomSearch from "./pages/RoomSearch";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* 🔐 Protected Routes */}
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <RoomSearch />
              </PrivateRoute>
            }
          />
          <Route
            path="/views"
            element={
              <PrivateRoute>
                <ViewsPage />
              </PrivateRoute>
            }
          />

          {/* 🧭 Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;