import '@fortawesome/fontawesome-free/css/all.min.css';
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ViewsPage from "./pages/HotelViewsPage";
import LoginPage from "./pages/LoginPage";
import RoomSearch from "./pages/RoomSearch";

import Footer from "./pages/Footer";
import Header from "./pages/Header";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/about" element={<AboutPage />} />
        <Route path="/search" element={<RoomSearch />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/views" element={<ViewsPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
