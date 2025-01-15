import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";
import SavedCountries from "./pages/SavedCountries/SavedCountries.jsx";
import Header from "./components/Header"; // Importing the Header component

const App = () => {
  return (
    <div>
      <Header /> {/* Render Header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved-countries" element={<SavedCountries />} />
        <Route path="/country-details" element={<CountryDetails />} />
      </Routes>
    </div>
  );
};

export default App;
