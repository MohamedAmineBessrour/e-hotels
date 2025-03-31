import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage"; 
import RoomSearch from "./pages/RoomSearch";

import Header from "./pages/Header";
import Footer from "./pages/Footer";

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
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
