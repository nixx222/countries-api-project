import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CountryDetails from "./pages/CountryDetails.jsx";
import SavedCountries from "./pages/SavedCountries/SavedCountries.jsx";
import Header from "./components/Header.jsx"; // Importing the Header component
import { useState, useEffect } from "react";

const App = () => {
  const [countryCall, setCountryCall] = useState([]);

  const getCountryData = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCountryCall(data);
      })
      .catch((error) => console.log("Error: " + error.message));
  };

  useEffect(() => {
    getCountryData();
  }, []);

  return (
    <div>
      <Header /> {/* Render Header */}
      <Routes>
        <Route path="/" element={<Home countryCall={countryCall} />} />
        <Route
          path="/saved-countries"
          element={<SavedCountries countryCall={countryCall} />}
        />
        <Route
          path="/country/:alpha3Code"
          element={<CountryDetails countryCall={countryCall} />}
        />
      </Routes>
    </div>
  );
};

export default App;
